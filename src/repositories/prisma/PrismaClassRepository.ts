import { classes } from "@prisma/client";
import { ClassRepository } from "../ClassRepository";
import { prisma } from "../../lib/prisma";

export class PrismaClassRepository implements ClassRepository {
    async create(data: classes): Promise<classes> {
        return prisma.classes.create({
            data,
        })
    }

    async findById(id: string): Promise<classes | null> {
        return prisma.classes.findUnique({
            where:{
                id,
            }
        })
    }

    async update(id: string, data: Partial<classes>): Promise<classes | null> {
        return prisma.classes.update({
            where:{
                id,
            },
            data,
        })
    }

    async delete(id: string): Promise<void> {
        prisma.classes.delete({
            where:{
                id,
            }
        })
    }
}