import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserAlreadyExistsError } from "../../../errors/userAlreadyExistsError";
import { EmailAlreadyInUseError } from "../../../errors/emailAlreadyInUseError";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { CreateUserService } from "../../../services/user/createUserService";
import { isCpfValid } from "../../../utils/isCpfValid";

export async function CreateUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {cpf,email,name,password,belt_id,phoneNumber} = z.object({
            cpf: z.string().refine(data => isCpfValid(data), {
                error: "InvalidCpf"
            }),
            name: z.string(),
            email: z.email(),
            belt_id: z.string(),
            password: z.string().min(6),
            phoneNumber: z.string().optional(),
        }).parse(request.body);

        const userRepo = new PrismaUserRepository();
        const service = new CreateUserService(userRepo);

        await service.execute({
            cpf,
            email,
            name,
            password,
            belt_id,
            phoneNumber:(phoneNumber?phoneNumber:null),
        });

        reply.status(201).send({
            description:"User created",
        });
    }
    catch(err){
        if(err instanceof UserAlreadyExistsError){
            reply.status(409).send({
                message:err.message,
            });
        }
        if(err instanceof EmailAlreadyInUseError){
            reply.status(409).send({
                message:err.message,
            });
        }
        throw err;
    }
}