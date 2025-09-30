import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { IncorrectPasswordError } from "../../../errors/passwordIncorrectError";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaTeacherRepository";
import { LoginService } from "../../../services/auth/loginService";

export async function LoginController(request: FastifyRequest, reply: FastifyReply){
    try {
        const {email, password} = z.object({
            email: z.email(),
            password: z.string(),
        }).parse(request.body);

        const repo = new PrismaUserRepository();
        const service = new LoginService(repo);

        const result = await service.execute({
            email,
            password,
        })

        reply.status(201).send({
            description:"User logged successfully.",
            token:result.token,
        });
    }
    catch (err) {
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
        throw err;
    }
}