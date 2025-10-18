import { $Enums, belt } from "@prisma/client";
import { BeltRepository } from "../BeltRepository";
import { prisma } from "../../lib/prisma";
import { Colors } from "../../lib/types/colors";

export class PrismaBeltRepository implements BeltRepository {
    async create(data: belt): Promise<belt> {
        return prisma.belt.create({
            data,
        })
    }

    async update(id: string, data: Partial<belt>): Promise<belt | null> {
        return prisma.belt.update({
            where:{
                id,
            },
            data,
        })
    }

    async updateMany(color: Colors, data: Partial<belt>): Promise<boolean> {
        const result = await prisma.belt.updateMany({
            data,
            where:{
                color,
            }
        })

        return (result.count ? true : false)
    }

    async findById(id: string): Promise<belt | null> {
        return prisma.belt.findUnique({
            where:{
                id,
            }
        })
    }

    async searchByColor(color: Colors): Promise<belt[]> {
        return prisma.belt.findMany({
            where:{
                color,
            },
        })
    }

    async delete(id: string): Promise<void> {
        prisma.belt.delete({
            where:{
                id,
            }
        })
    }
}