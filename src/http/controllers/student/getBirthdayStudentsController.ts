import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { GetBirthdayStudentsService } from "../../../services/student/getBirthdayStudentsService";

export async function getBirthdayStudentsController(request: FastifyRequest, reply: FastifyReply) {
    const studentRepo = new PrismaStudentRepository();
    const service = new GetBirthdayStudentsService(studentRepo);

    const result = await service.execute(30);

    reply.status(200).send({
        description:"success",
        result,
    })
}