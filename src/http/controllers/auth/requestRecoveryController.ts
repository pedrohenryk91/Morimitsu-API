import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { RequestRecoveryService } from "../../../services/auth/requestRecoveryService";

export async function requestRecoveryController(request: FastifyRequest, reply: FastifyReply) {
    const {email} = z.object({
        email:z.string(),
    }).parse(request.body);

    const userRepo = new PrismaUserRepository();
    const service = new RequestRecoveryService(userRepo);

    await service.execute(email);

    reply.status(201).send({
        description:"Email sent."
    })
}