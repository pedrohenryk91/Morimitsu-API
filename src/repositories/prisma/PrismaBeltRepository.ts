import { $Enums, belt } from "@prisma/client";
import { BeltRepository } from "../BeltRepository";
import { prisma } from "../../lib/prisma";

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

    async findById(id: string): Promise<belt | null> {
        return prisma.belt.findUnique({
            where:{
                id,
            }
        })
    }

    async findByStudentId(id: string): Promise<belt | null> {
        return prisma.belt.findFirst({
            where:{
                students:{
                    some:{
                        id,
                    }
                }
            }
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