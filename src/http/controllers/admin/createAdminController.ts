import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaAdminRepository } from "../../../repositories/prisma/PrismaAdminRepository";
import { CreateAdminService } from "../../../services/admin/createAdminService";
import { EmailAlreadyInUseError } from "../../../errors/emailAlreadyInUseError";

export async function createAdminController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {email, password} = z.object({
            email: z.email(),
            password: z.string().min(6),
        }).parse(request.body);

        const adminRepo = new PrismaAdminRepository();
        const service = new CreateAdminService(adminRepo);

        await service.execute({
            email,
            password,
        });

        reply.status(201).send({
            Description:"Admin created",
        });
    }
    catch (err) {
        if(err instanceof EmailAlreadyInUseError){
            reply.status(409).send({
                message: err.message
            });
        }
        throw err;
    }
}