import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaAdminRepository } from "../../../repositories/prisma/PrismaAdminRepository";
import { LoginAdminService } from "../../../services/admin/loginAdminService";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { IncorrectPasswordError } from "../../../errors/passwordIncorrectError";

export async function adminLoginController(request: FastifyRequest, reply: FastifyReply){
    try {
        const {email,password} = z.object({
            email: z.email(),
            password: z.string()
        }).parse(request.body);

        const adminRepo = new PrismaAdminRepository();
        const service = new LoginAdminService(adminRepo);

        const result = await service.execute({
            email,
            password,
        });

        reply.status(201).send({
            description:"Logged Succesfully.",
            username:result.username,
            token:result.token,
        });
    }
    catch(err) {
        if(err instanceof IncorrectPasswordError){
            reply.status(400).send({
                message:err.message,
            });
        }
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            });
        }
        throw err;//unknown errors will be treated by superior layers of code
    }
}