import { prisma } from "../../lib/prisma";
import { FrequencyRepository } from "../FrequencyRepository";
import { CompositeId } from "../FrequencyRepository";
import { frequency } from "@prisma/client";

export class PrismaFrequencyRepository implements FrequencyRepository {
    async create(data: frequency): Promise<frequency> {
        return prisma.frequency.create({
            data,
        })
    }

    async findById(id: CompositeId): Promise<frequency | null> {
        return prisma.frequency.findUnique({
            where:{
                student_id_meeting_id:id,
            }
        })
    }

    async findByMeetingId(id: string): Promise<frequency[]> {
        return prisma.frequency.findMany({
            where:{
                meeting_id:id,
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

    async update(id: CompositeId, data: Partial<frequency>): Promise<frequency | null> {
        return prisma.frequency.update({
            where:{
                student_id_meeting_id:id,
            },
            data,
        })
    }

    async delete(id: CompositeId): Promise<void> {
        prisma.frequency.delete({
            where:{
                student_id_meeting_id:id,
            }
        })
    }
}