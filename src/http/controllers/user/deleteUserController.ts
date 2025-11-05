import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import z from "zod";
import { DeleteUserService } from "../../../services/user/deleteUserService";

export async function deleteUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {id} = z.object({
            id: z.string(),
        }).parse(request.params);

        const userRepo = new PrismaUserRepository();
        const service = new DeleteUserService(userRepo);

        await service.execute(id);

        reply.status(200).send({
            description: "deleted",
        });
    }
    catch (err) {
        throw err;        
    }
}