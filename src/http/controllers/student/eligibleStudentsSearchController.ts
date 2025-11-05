import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { SearchGraduationStudentsService } from "../../../services/student/searchGraduationStudentsService";

export async function eligibleStudentsSearchController(request: FastifyRequest, reply: FastifyReply) {
    const studentRepo = new PrismaStudentRepository()
    const service = new SearchGraduationStudentsService(studentRepo);

    const gradableStudents = await service.execute();

    reply.status(200).send({
        description:"ok",
        result:[...gradableStudents]
    })
}