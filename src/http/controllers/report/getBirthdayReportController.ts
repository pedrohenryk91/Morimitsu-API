import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaReportRepository } from "../../../repositories/prisma/PrismaReportRepository";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { GetBirthdayReportService } from "../../../services/report/getBirthdayReportService";

export async function getBirthdayReportController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const studentRepo = new PrismaStudentRepository();
        const reportRepo = new PrismaReportRepository();
        const service = new GetBirthdayReportService(reportRepo,studentRepo);

        const result = await service.execute();

        reply.status(200).send({
            description:"success",
            result,
        })
    } catch (err) {
        throw err;
    }
}