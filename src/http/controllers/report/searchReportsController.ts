import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { PrismaReportRepository } from "../../../repositories/prisma/PrismaReportRepository";
import { SearchReportService } from "../../../services/report/searchReportService";
import z from "zod";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";

export async function searchReportsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = String(request.user);

        const {id,maxDate,minDate,text,title} = z.object({
            id: z.string().optional(),
            text: z.string().optional(),
            title: z.string().optional(),
            maxDate: z.coerce.date().optional(),
            minDate: z.coerce.date().optional(),
        }).parse(request.query);
        
        const userRepo = new PrismaUserRepository()
        const reportRepo = new PrismaReportRepository()
        const service = new SearchReportService(reportRepo,userRepo);

        const result = await service.execute(userId, {
            id,
            text,
            title,
            maxDate,
            minDate,
        });

        reply.status(200).send({
            description:"success",
            result,
        })
    } catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            })
        }
        throw err;
    }
}