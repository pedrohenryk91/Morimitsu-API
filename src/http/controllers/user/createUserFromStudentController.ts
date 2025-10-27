import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { CreateUserFromStudentService } from "../../../services/user/createUserFromStudentService";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { EmailAlreadyInUseError } from "../../../errors/emailAlreadyInUseError";
import { UserAlreadyExistsError } from "../../../errors/userAlreadyExistsError";

export async function createUserFromStudentController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {studentId, password, email} = z.object({
            studentId: z.string(),
            password: z.string().min(6),
            email: z.email(),
        }).parse(request.body);

        const studentRepo = new PrismaStudentRepository();
        const userRepo = new PrismaUserRepository();
        const service = new CreateUserFromStudentService(userRepo, studentRepo);

        await service.execute({
            studentId,
            password,
            email,
        });

        reply.status(201).send({
            description: "created",
        });
    }
    catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message: err.message,
            })
        }
        if(err instanceof EmailAlreadyInUseError){
            reply.status(409).send({
                message: err.message,
            })
        }
        if(err instanceof UserAlreadyExistsError){
            reply.status(409).send({
                message: err.message,
            })
        }
        throw err;
    }
}