import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { GetAllUsersService } from "../../../services/user/getAllUsersService";
import z from "zod";

export async function getInstructorsDataController(request: FastifyRequest, reply: FastifyReply) {
    const userId = String(request.user);

    const {take} = z.object({
        take: z.coerce.number().optional(),
    }).parse(request.query)

    const userRepo = new PrismaUserRepository();
    const service = new GetAllUsersService(userRepo);

    const data = await service.execute(userId, take);

    reply.status(200).send({
        description:"success",
        data,
    })
}