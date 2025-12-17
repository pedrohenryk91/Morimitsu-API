import { $Enums, belt } from "@prisma/client";
import { BeltRepository } from "../BeltRepository";
import { prisma } from "../../lib/prisma";
import { Colors } from "../../lib/types/colors";
import { BeltPercentage } from "../../lib/types/beltPercentage";

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

    async getPercentages(): Promise<BeltPercentage[]> {
    const result = await prisma.$queryRaw<BeltPercentage[]>`
        WITH total_students AS (
        SELECT COUNT(*)::numeric AS total
        FROM "student"
        )
        SELECT
        b.color,
        COUNT(s.id)::int AS students_count,
        COALESCE(
            ROUND((COUNT(s.id)::numeric / t.total) * 100, 2),
            0
        ) AS percentage
        FROM "belt" b
        LEFT JOIN "student" s ON s.belt_id = b.id
        CROSS JOIN total_students t
        GROUP BY b.color, t.total
        ORDER BY percentage DESC;
    `;

    return result;
    }

    async delete(id: string): Promise<belt | null> {
        return prisma.belt.delete({
            where:{
                id,
            }
        })
    }
}