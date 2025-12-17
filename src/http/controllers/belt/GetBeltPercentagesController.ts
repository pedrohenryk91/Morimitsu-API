import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaBeltRepository } from "../../../repositories/prisma/PrismaBeltRepository";
import { GetBeltPercentagesService } from "../../../services/belt/getBeltPercentagesService";

export async function getBeltPercentagesController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const beltRepo = new PrismaBeltRepository();
        const service = new GetBeltPercentagesService(beltRepo);

        const result = await service.execute();

        reply.status(200).send({
            description:"success",
            result,
        })
    } catch (err) {
        throw err;
    }
}