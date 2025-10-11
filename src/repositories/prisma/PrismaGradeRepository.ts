import { grade } from "@prisma/client";
import { GradeRepository } from "../GradeRepository";
import { prisma } from "../../lib/prisma";

export class PrismaGradeRepository implements GradeRepository {
    async create(data: grade): Promise<grade> {
        return prisma.grade.create({
            data,
        })
    }

    async findById(id: string): Promise<grade | null> {
        return prisma.grade.findUnique({
            where:{
                id,
            }
        })
    }

    async update(id: string, data: Partial<grade>): Promise<grade | null> {
        return prisma.grade.update({
            where:{
                id,
            },
            data,
        })
    }

    async delete(id: string): Promise<void> {
        prisma.grade.delete({
            where:{
                id,
            }
        })
    }
}