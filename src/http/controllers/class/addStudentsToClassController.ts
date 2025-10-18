import { FastifyReply, FastifyRequest } from "fastify";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import z from "zod";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { AddStudentsToClassService } from "../../../services/class/addStudentsToClassService";
import { PrismaClassRepository } from "../../../repositories/prisma/PrismaClassRepository";

export async function AddStudentsToClassController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {studentsIds,classId} = z.object({
            studentsIds: z.array(z.string()),
            classId: z.string(),
        }).parse(request.body);

        const studentRepo = new PrismaStudentRepository();
        const classRepo = new PrismaClassRepository()
        const service = new AddStudentsToClassService(studentRepo, classRepo);

        await service.execute({
            studentsIds,
            classId,
        });

        reply.status(201).send({
            description:"students added."
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