import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedUserError } from "../../../errors/unauthorizedUserError";
import z from "zod";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { DeleteClassService } from "../../../services/class/deleteClassService";
import { PrismaClassRepository } from "../../../repositories/prisma/PrismaClassRepository";

export async function deleteClassController(request: FastifyRequest, reply: FastifyReply) {   
    try {
        const userId = String(request.user);

        const {id} = z.object({
            id: z.string(),
        }).parse(request.params);

        const classRepo = new PrismaClassRepository();
        const userRepo = new PrismaUserRepository();
        const service = new DeleteClassService(classRepo,userRepo);

        await service.execute(userId, id);

        reply.status(200).send({
            message:"Deleted."
        })
    } catch (err) {
        if(err instanceof UnauthorizedUserError){
            reply.status(409).send({
                message: err.message,
            })
        }
    }
}