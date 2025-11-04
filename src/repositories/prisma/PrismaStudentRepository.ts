import { student } from "@prisma/client";
import { Student } from "../../lib/types/student";
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

    async search(data: searchStudentParams): Promise<student[]> {
        const {fullName,maxAge,minAge,nickname} = data
        return prisma.student.findMany({
            where:{
                full_name:{
                    contains:fullName
                },
                nickname:{
                    contains:nickname
                },
                age:{
                    gte:minAge,
                    lte:maxAge,
                }
            }
        })
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
        return prisma.student.findUnique({where: {cpf}})
    }
}