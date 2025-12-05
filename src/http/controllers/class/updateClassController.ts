import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClassRepository } from "../../../repositories/prisma/PrismaClassRepository";
import z from "zod";
import { UpdateClassService } from "../../../services/class/updateClassService";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";

export async function updateClassController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {classId,name,instructorId,requiredFq} = z.object({
            classId: z.string(),
            name: z.string().optional(),
            instructorId: z.string().optional(),
            requiredFq: z.number().optional(),
        }).parse(request.body);

        const classRepo = new PrismaClassRepository();
        const userRepo = new PrismaUserRepository();
        const service = new UpdateClassService(classRepo,userRepo);

        await service.execute(classId,{
            name,
            instructorId,
            requiredFq,
        });

        reply.status(201).send({
            description:"success",
        });
    } catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            })
        }
        throw err;
    }
    
}