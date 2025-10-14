import { FastifyReply, FastifyRequest } from "fastify";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { UserAlreadyExistsError } from "../../../errors/userAlreadyExistsError";
import z from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { UpdateUserService } from "../../../services/user/updateUserService";

export async function UpdateUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const id = String(request.user);
    
        const {cpf,email,name,password} = z.object({
            cpf: z.string().optional(),
            email: z.email().optional(),
            name: z.string().optional(),
            password: z.string().min(6).optional()
        }).parse(request.body);

        const userRepo = new PrismaUserRepository();
        const service = new UpdateUserService(userRepo);

        await service.execute(id, {
            cpf,
            email,
            name,
            password
        })

        reply.status(201).send({
            description:"User updated",
            name,
        })
        
    } catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            })
        }
        if(err instanceof UserAlreadyExistsError){
            reply.status(409).send({
                message:err.message,
            })
        }
        throw err;
    }
}