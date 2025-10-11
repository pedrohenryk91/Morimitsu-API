import { meeting } from "@prisma/client";
import { MeetingRepository } from "../MeetingRepository";
import { prisma } from "../../lib/prisma";

export class PrismaMeetingRepository implements MeetingRepository {
    async create(data: meeting): Promise<meeting> {
        return prisma.meeting.create({
            data,
        })
    }

    async findById(id: string): Promise<meeting | null> {
        return prisma.meeting.findUnique({
            where:{
                id,
            }
        })
    }

    async update(id: string, data: Partial<meeting>): Promise<meeting | null> {
        return prisma.meeting.update({
            where:{
                id,
            },
            data,
        })
    }

    async searchByName(name: string): Promise<meeting[]> {
        return prisma.meeting.findMany({
            where:{
                name:{
                    contains:name,
                    mode:"insensitive",
                }
            }
        })
    }

    async delete(id: string): Promise<void> {
        prisma.meeting.delete({
            where:{
                id,
            }
        })
    }
}