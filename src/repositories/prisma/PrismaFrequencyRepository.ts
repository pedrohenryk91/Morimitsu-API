import { CreateManyFrequenciesParams } from "../../lib/interfaces/createManyFrequenciesParams";
import { prisma } from "../../lib/prisma";
import { FrequencyRepository } from "../FrequencyRepository";
import { frequency } from "@prisma/client";

export class PrismaFrequencyRepository implements FrequencyRepository {
    async create(data: frequency): Promise<frequency> {
        return prisma.frequency.create({
            data,
        })
    }

    async createMany(data: CreateManyFrequenciesParams): Promise<void> {
        const ids = data.students_ids
        const formattedData = ids.map((id) =>{
            return {
                student_id:id,
                class_id:data.class_id,
                date:data.date,
            }
        })

        await prisma.frequency.createMany({
            data:formattedData,
        })
    }

    async findById(id: string): Promise<frequency | null> {
        return prisma.frequency.findUnique({
            where:{
                id,
            }
        })
    }

    async findByClassId(id: string): Promise<frequency[]> {
        return prisma.frequency.findMany({
            where:{
                class_id:id,
            }
        })
    }

    async findByStudentId(id: string): Promise<frequency[]> {
        return prisma.frequency.findMany({
            where:{
                student_id:id,
            }
        })
    }

    async update(id: string, data: Partial<frequency>): Promise<frequency | null> {
        return prisma.frequency.update({
            where:{
               id,
            },
            data,
        })
    }

    async delete(id: string): Promise<void> {
        prisma.frequency.delete({
            where:{
                id,
            }
        })
    }
}