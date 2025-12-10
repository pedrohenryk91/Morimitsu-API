import { student } from "@prisma/client";
import { Student, StudentBasicInfo } from "../../lib/types/student";
import { StudentRepository } from "../StudentRepository";
import { prisma } from "../../lib/prisma";
import { searchStudentParams } from "../../lib/interfaces/searchStudentsParams";
import { EligibleStudent } from "../../lib/types/eligibleStudent";

export class PrismaStudentRepository implements StudentRepository {
    async create(data: Student): Promise<student> {
        return prisma.student.create({
            data,
        });
    }

    async findById(id: string): Promise<student | null> {
        return prisma.student.findUnique({
            where:{
                id,
            }
        })
    }

    async findByBeltId(id: string): Promise<student[]> {
        return prisma.student.findMany({
            where:{
                belt_id:id,
            }
        })
    }

    async findManyById(ids: string[]): Promise<student[]> {
        return prisma.student.findMany({
            where:{
                id:{ in: ids },
            }
        })
    }

    async findByClassId(classId: string): Promise<student[]> {
        return prisma.student.findMany({
            where:{
                class:{
                    some:{
                        id:classId,
                    }
                }
            }
        })
    }

    async findByName(studentName: string): Promise<student[]> {
        return prisma.student.findMany({
            where: {
                full_name: {
                    contains: studentName,
                    mode: "insensitive"
                }
            }
        })
    }

    async connectManyToClass(ids: string[], classId: string): Promise<void> {
        await prisma.$transaction(async (p) => {
            const operations = ids.map((id) =>
                p.student.update({
                    where: {
                        id,
                    },
                    data: {
                        class: {
                            connect: {
                                id: classId
                            },
                        },
                    },
                })
            )
            await Promise.all(operations);
        });
    }

    async search(data: searchStudentParams, limit?: number): Promise<student[]> {
        
        const {fullName,maxAge,minAge,nickname} = data
        return prisma.student.findMany({
            where:{
                full_name:(fullName?{
                    contains:fullName
                }:undefined),
                nickname:(nickname?{
                    contains:nickname
                }:undefined),
                age:(minAge||maxAge?{
                    gte:minAge,
                    lte:maxAge,
                }:undefined),
            },
            take:limit,
        })
    }

    async searchByBirthday(nDaysBefore: number): Promise<StudentBasicInfo[]> {
        const students = await prisma.$queryRaw<StudentBasicInfo[]>`
        WITH ref AS (
            SELECT
                EXTRACT(YEAR FROM CURRENT_DATE)::int AS year_ref,
                (EXTRACT(YEAR FROM CURRENT_DATE)::int % 4 = 0 AND EXTRACT(YEAR FROM CURRENT_DATE)::int % 100 <> 0)
                OR (EXTRACT(YEAR FROM CURRENT_DATE)::int % 400 = 0) AS is_leap,
                (CURRENT_DATE - (${nDaysBefore} * INTERVAL '1 day'))::date AS start_date,
                CURRENT_DATE::date AS end_date
            )
            SELECT s.full_name, s.cpf, s.birthday
            FROM student s, ref r
            WHERE (
            -- dia e mês originais
            (EXTRACT(MONTH FROM s.birthday))::int IS NOT NULL
            AND (EXTRACT(DAY FROM s.birthday))::int IS NOT NULL
            -- ajusta 29/02 para 28 quando o ano atual NÃO for bissexto
            AND (
                -- aniversário no ANO ATUAL (ex.: convertendo 25/12 -> 25/12/2025 se year_ref = 2025)
                make_date(
                r.year_ref,
                EXTRACT(MONTH FROM s.birthday)::int,
                CASE
                    WHEN EXTRACT(MONTH FROM s.birthday)::int = 2
                    AND EXTRACT(DAY FROM s.birthday)::int = 29
                    AND NOT r.is_leap
                    THEN 28
                    ELSE EXTRACT(DAY FROM s.birthday)::int
                END
                ) BETWEEN r.start_date AND r.end_date
                -- OU aniversário no ANO ANTERIOR (necessário quando a janela cruza o ano)
                OR make_date(
                r.year_ref - 1,
                EXTRACT(MONTH FROM s.birthday)::int,
                CASE
                    WHEN EXTRACT(MONTH FROM s.birthday)::int = 2
                    AND EXTRACT(DAY FROM s.birthday)::int = 29
                    AND NOT r.is_leap
                    THEN 28
                    ELSE EXTRACT(DAY FROM s.birthday)::int
                END
                ) BETWEEN r.start_date AND r.end_date
            )
            )`;

        return students;
    }

    async checkBirthday(nDaysBefore: number): Promise<boolean> {
    const exists = await prisma.$queryRaw<{ exists: boolean }[]>`
        WITH ref AS (
        SELECT
            EXTRACT(YEAR FROM CURRENT_DATE)::int AS year_ref,
            (
            (EXTRACT(YEAR FROM CURRENT_DATE)::int % 4 = 0 AND EXTRACT(YEAR FROM CURRENT_DATE)::int % 100 <> 0)
            OR (EXTRACT(YEAR FROM CURRENT_DATE)::int % 400 = 0)
            ) AS is_leap,
            (CURRENT_DATE - (${nDaysBefore} * INTERVAL '1 day'))::date AS start_date,
            CURRENT_DATE::date AS end_date
        )
        SELECT EXISTS (
        SELECT 1
        FROM student s, ref r
        WHERE (
            -- aniversário no ANO ATUAL
            make_date(
            r.year_ref,
            EXTRACT(MONTH FROM s.birthday)::int,
            CASE
                WHEN EXTRACT(MONTH FROM s.birthday)::int = 2
                AND EXTRACT(DAY FROM s.birthday)::int = 29
                AND NOT r.is_leap
                THEN 28
                ELSE EXTRACT(DAY FROM s.birthday)::int
            END
            ) BETWEEN r.start_date AND r.end_date

            OR

            -- aniversário NO ANO ANTERIOR (para cruzar o ano novo)
            make_date(
            r.year_ref - 1,
            EXTRACT(MONTH FROM s.birthday)::int,
            CASE
                WHEN EXTRACT(MONTH FROM s.birthday)::int = 2
                AND EXTRACT(DAY FROM s.birthday)::int = 29
                AND NOT r.is_leap
                THEN 28
                ELSE EXTRACT(DAY FROM s.birthday)::int
            END
            ) BETWEEN r.start_date AND r.end_date
        )
        ) AS exists;
    `;
        return exists[0].exists;
    }

    async countByFrequency(): Promise<EligibleStudent[]> {
        return prisma.$queryRaw<EligibleStudent[]>`
            SELECT
                s."id",
                s."full_name",
                s."current_fq",
                b."color" AS belt_color,
                b."rq_frequency" AS belt_rq_fq
            FROM "student" s
            JOIN "belt" b ON s."belt_id" = b."id"
            WHERE EXISTS (
                SELECT 1
                FROM "_classesTostudent" cs
                JOIN "classes" c ON cs."A" = c."id"
                WHERE cs."B" = s."id"
                AND (
                    (c."type" = 'kids' AND (c."rq_fq" IS NOT NULL AND s."current_fq" >= c."rq_fq"))
                    OR
                    (c."type" IN ('normal','mista') AND s."current_fq" >= b."rq_frequency")
                )
            );
        `;
    }

    async update(id: string, data: Partial<Student>): Promise<student | null> {
        const {guardian_name,guardian_number,current_fq,phone_number,full_name,nickname,birthday,belt_id,cpf} = data;
        return prisma.student.update({
            where:{
                id,
            },
            data:{
                guardian_name,
                guardian_number,
                current_fq,
                phone_number,
                full_name,
                birthday,
                nickname,
                belt_id,
                cpf,
            },
        })
    }

    async delete(id: string): Promise<student | null> {
        return await prisma.student.delete({
            where:{
                id,
            }
        })
    }

    async findByCpf(cpf: string): Promise<student | null> {
        return prisma.student.findUnique({
            where: {
                cpf
            }
        })
    }
}