import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaClassRepository } from "../../../repositories/prisma/PrismaClassRepository";
import { SearchClassesService } from "../../../services/class/searchClassesService";

export async function searchClassesController(request: FastifyRequest, reply: FastifyReply) {
    const {name,type} = z.object({
        name: z.string().optional(),
        type: z.enum(["kids","normal","mista"]).optional()
    }).parse(request.query);

    const classRepo = new PrismaClassRepository();
    const service = new SearchClassesService(classRepo);

    const result = await service.execute({
        name,
        type,
    });

    reply.status(200).send({
        description:"success",
        result,
    });
}