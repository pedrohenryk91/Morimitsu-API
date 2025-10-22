import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { PrismaClassRepository } from "../../../repositories/prisma/PrismaClassRepository";
import { GetClassStudentsService } from "../../../services/class/getClassStudentsService";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";

export async function getClassStudentsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {classId} = z.object({
            classId: z.string()
        }).parse(request.params);

        const studentRepo = new PrismaStudentRepository();
        const classRepo = new PrismaClassRepository();
        const service = new GetClassStudentsService(classRepo,studentRepo);

        const result = await service.execute(classId);

        reply.status(200).send({
            description:"success",
            result,
        });
    }
    catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            })
        }
        throw err;
    }
}