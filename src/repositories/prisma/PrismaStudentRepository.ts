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
        const {fullName,maxAge,minAge,nickname,beltId,cpf,gender,guardianName,phoneNumber,isMonitor} = data
        if(Object.values(data).every(v => v === undefined) && !limit){
            limit = 20;
        }
        const where: any = {};
        if (guardianName) {
            where.guardian_name = { contains: guardianName, mode: "insensitive" };
        }

        if (phoneNumber) {
            where.phone_number = { contains: phoneNumber };
        }

        if (fullName) {
            where.full_name = { contains: fullName, mode: "insensitive" };
        }

        if (nickname) {
            where.nickname = { contains: nickname, mode: "insensitive" };
        }

        if (minAge || maxAge) {
            where.age = { gte: minAge, lte: maxAge };
        }
    
        if(isMonitor){
            where.is_monitor = true;
        }

        if (beltId) where.belt_id = beltId;
        if (gender) where.gender = gender; // enum opcional
        if (cpf) where.cpf = cpf;

        return prisma.student.findMany({
            where,
            take:limit,
        })
    }

    async searchByBirthday(nDaysAfter: number): Promise<StudentBasicInfo[]> {
        const students = await prisma.$queryRaw<StudentBasicInfo[]>`
            WITH ref AS (
            SELECT
                EXTRACT(YEAR FROM CURRENT_DATE)::int AS year_ref,
                (
                (EXTRACT(YEAR FROM CURRENT_DATE)::int % 4 = 0
                AND EXTRACT(YEAR FROM CURRENT_DATE)::int % 100 <> 0)
                OR (EXTRACT(YEAR FROM CURRENT_DATE)::int % 400 = 0)
                ) AS is_leap,
                CURRENT_DATE::date AS start_date,
                (CURRENT_DATE + (${nDaysAfter} * INTERVAL '1 day'))::date AS end_date
            )
            SELECT
            s.full_name,
            s.cpf,
            s.birthday
            FROM "student" s
            CROSS JOIN ref r
            WHERE
            EXTRACT(MONTH FROM s.birthday) IS NOT NULL
            AND EXTRACT(DAY FROM s.birthday) IS NOT NULL
            AND (
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

                -- aniversário no PRÓXIMO ANO (quando a janela cruza o ano)
                make_date(
                r.year_ref + 1,
                EXTRACT(MONTH FROM s.birthday)::int,
                CASE
                    WHEN EXTRACT(MONTH FROM s.birthday)::int = 2
                        AND EXTRACT(DAY FROM s.birthday)::int = 29
                        AND NOT r.is_leap
                    THEN 28
                    ELSE EXTRACT(DAY FROM s.birthday)::int
                END
                ) BETWEEN r.start_date AND r.end_date
            );
        `;

        return students;
    }

    async checkBirthday(nDaysAfter: number): Promise<boolean> {
    const exists = await prisma.$queryRaw<{ exists: boolean }[]>`
    WITH ref AS (
      SELECT
        EXTRACT(YEAR FROM CURRENT_DATE)::int AS year_ref,
        (
          (EXTRACT(YEAR FROM CURRENT_DATE)::int % 4 = 0
           AND EXTRACT(YEAR FROM CURRENT_DATE)::int % 100 <> 0)
          OR (EXTRACT(YEAR FROM CURRENT_DATE)::int % 400 = 0)
        ) AS is_leap,
        CURRENT_DATE::date AS start_date,
        (CURRENT_DATE + (${nDaysAfter} * INTERVAL '1 day'))::date AS end_date
    )
    SELECT EXISTS (
      SELECT 1
      FROM "student" s
      CROSS JOIN ref r
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

        -- aniversário no PRÓXIMO ANO (quando a janela cruza o ano)
        make_date(
          r.year_ref + 1,
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
        const {guardian_name,guardian_number,current_fq,is_monitor,phone_number,full_name,nickname,birthday,belt_id,cpf} = data;
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
                is_monitor,
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