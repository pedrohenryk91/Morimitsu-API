import { studentNotFoundError } from "../../../errors/studentNotFoundError";
import z from "zod";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import {FastifyRequest, FastifyReply} from "fastify";
import { GetStudentsService } from "../../../services/student/getStudentsService";

export async function getStudentData(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {studentName} = z.object({
            studentName: z.string()
        }).parse(request.body)

        const prismaStudentRepo = new PrismaStudentRepository()
        const prismaStudent = new GetStudentsService(prismaStudentRepo)

    const response = await prismaStudent.execute({
        studentName
    });

    reply.status(200).send({
        response
    })

    } catch (err) {
        if(err instanceof studentNotFoundError){
            reply.status(409).send({
                message: err.message
            });
        }
        throw err;
    }
}