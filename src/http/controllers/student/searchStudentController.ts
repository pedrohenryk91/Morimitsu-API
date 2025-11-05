import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { SearchStudentsService } from "../../../services/student/searchStudentsService";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";

export async function searchStudentsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {fullName,maxAge,minAge,nickname} = z.object({
            fullName: z.string().optional(),
            nickname: z.string().optional(),
            minAge: z.coerce.number().optional(),
            maxAge: z.coerce.number().optional()
        }).parse(request.query);

        const studentRepo = new PrismaStudentRepository();
        const service = new SearchStudentsService(studentRepo);

        const students = await service.execute({
            fullName,
            maxAge,
            minAge,
            nickname,
        });

        reply.status(200).send({
            description:"success",
            students,
        })
    }
    catch (err) {
        throw err;
    }
}