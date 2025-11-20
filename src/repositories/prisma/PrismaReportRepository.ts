import { report } from "@prisma/client";
import { ReportRepository } from "../ReportRepository";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { SearchReportParams } from "../../lib/interfaces/searchReportParams";

export class PrismaReportRepository implements ReportRepository {
    async create(data: report) {
        return await prisma.report.create({
            data,
        })
    }

    async findById(id: string): Promise<report | null> {
        return await prisma.report.findUnique({
            where:{
                id,
            }
        })
    }

    async search(data: SearchReportParams): Promise<report[]> {
        const {id,maxDate,minDate,text,title,to} = data;
        return prisma.report.findMany({
            where:{
                id:{
                    contains:id,
                },
                to:(to==="instructor"?to:undefined),
                date:{
                    gte:minDate,
                    lte:maxDate,
                },
                text:{
                    contains:text,
                },
                title:{
                    contains:title,
                }
            }
        })
    }

    async update(id: string, data: Partial<report>): Promise<report | null> {
        return await prisma.report.update({
            where:{
                id,
            },
            data,
        })
    }

    async delete(id: string): Promise<report | null> {
        return await prisma.report.delete({
            where:{
                id,
            }
        })
    }
}