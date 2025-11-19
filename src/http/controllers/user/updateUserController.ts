import { FastifyReply, FastifyRequest } from "fastify";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { UserAlreadyExistsError } from "../../../errors/userAlreadyExistsError";
import z from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { UpdateUserService } from "../../../services/user/updateUserService";
import { CpfAlreadyRegistered } from "../../../errors/cpfAlreadyRegistered";
import { EmailAlreadyInUseError } from "../../../errors/emailAlreadyInUseError";

export async function UpdateUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const id = String(request.user);
    
        const {cpf,email,name,password,phoneNumber} = z.object({
            cpf: z.string().optional(),
            email: z.email().optional(),
            name: z.string().optional(),
            password: z.string().min(6).optional(),
            phoneNumber: z.string().optional(),
        }).parse(request.body);

        const userRepo = new PrismaUserRepository();
        const service = new UpdateUserService(userRepo);

        await service.execute(id, {
            cpf,
            email,
            name,
            password,
            phoneNumber,
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
        if(err instanceof UserAlreadyExistsError ||
           err instanceof EmailAlreadyInUseError ||
           err instanceof CpfAlreadyRegistered
        ){
            reply.status(409).send({
                message:err.message,
            })
        }
        throw err;
    }
}