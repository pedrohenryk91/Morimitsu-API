import { FastifyReply, FastifyRequest } from "fastify";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { PrismaUserRepository } from "../../../repositories/prisma/PrismaUserRepository";
import { GetUserInfoService } from "../../../services/user/getUserInfoService";

export async function getUserInfoController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const id = String(request.user)

        const repo = new PrismaUserRepository();
        const service = new GetUserInfoService(repo);

        const userData = await service.execute(id);

        reply.status(200).send({
            description:"success",
            userData,
        })
    }
    catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            })
        }
        throw err;
    }
}