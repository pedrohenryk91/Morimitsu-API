import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { PrismaClassRepository } from "../../../repositories/prisma/PrismaClassRepository";
import { CreateClassService } from "../../../services/class/createClassService";

export async function CreateClassController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {name, instructorId} = z.object({
            name: z.string(),
            instructorId: z.string(),
        }).parse(request.body);

        const userRepo = new PrismaUserRepository();
        const classRepo = new PrismaClassRepository();
        const service = new CreateClassService(classRepo,userRepo);

        await service.execute({
            name,
            instructor_id:instructorId,
        });

        reply.status(201).send({
            description:"created successfully",
        });
    }
    catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            });
        }
        throw err;
    }
}