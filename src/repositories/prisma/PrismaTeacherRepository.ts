import { Prisma, teachers } from "@prisma/client";
import { TeacherRepository } from "../TeacherRepository";
import { prisma } from "../../lib/prisma";

export class PrismaTeacherRepository implements TeacherRepository {
    async create(data: Prisma.teachersCreateInput): Promise<teachers> {
        const teacher = await prisma.teachers.create({
            data,
        })
        return teacher
    }

    async findById(id: string): Promise<teachers | null> {
        const teacher = await prisma.teachers.findUnique({
            where:{
                id,
            }
        })
        return teacher
    }

    async update(id: string, data: Partial<teachers>): Promise<teachers | null> {
        const teacher = await prisma.teachers.update({
            where:{
                id,
            },
            data,
        })
        return teacher
    }

    async delete(id: string): Promise<void> {
        await prisma.teachers.delete({
            where:{
                id,
            }
        })
    }
}