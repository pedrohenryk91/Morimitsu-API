import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { UpdateUserService } from "../../../services/user/updateUserService";
import { RecoverUserService } from "../../../services/user/recoverUserService";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";

export async function recoverPasswordController(request: FastifyRequest, reply: FastifyReply){
    try {
        const {newPassword,email} = z.object({
            email: z.email(),
            newPassword: z.string().min(6),
        }).parse(request.body);

        const userRepo = new PrismaUserRepository();
        const service = new RecoverUserService(userRepo);

        const {role,token} = await service.execute({
            email,
            newPassword,
        })

        reply.status(201).send({
            description:"Password changed.",
            token,
            role,
        })
    } catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            })
        }
        throw err;
    }
}