import { student } from "@prisma/client";
import { Student } from "../../lib/types/student";
import { StudentRepository } from "../StudentRepository";
import { prisma } from "../../lib/prisma";

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

    async delete(id: string): Promise<void> {
        prisma.student.delete({
            where:{
                id,
            }
        })
    }

    async findByCpf(cpf: string): Promise<student | null> {
        prisma.student.findUnique({where: {cpf}})
    }
}