import { student } from "@prisma/client";
import { Student } from "../../lib/types/student";
import { StudentRepository } from "../StudentRepository";
import { prisma } from "../../lib/prisma";

export class PrismaStudentRepository implements StudentRepository {
    async create(data: Student): Promise<student> {
        return prisma.student.create({
            data,
        })
    }

    async findById(id: string): Promise<student | null> {
        return prisma.student.findUnique({
            where:{
                id,
            }
        })
    }

    async update(id: string, data: Partial<Student>): Promise<student | null> {
        const {ifce_registration,guardian_number,goal_frequency,phone_number,full_name,nickname,birthday,belt_id,cpf} = data;
        return prisma.student.update({
            where:{
                id,
            },
            data:{
                ifce_registration,
                guardian_number,
                goal_frequency,
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
}