import { FastifyReply, FastifyRequest } from "fastify";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import z from "zod";
import { ZodColors } from "../../../lib/types/colors";
import { PrismaBeltRepository } from "../../../repositories/prisma/PrismaBeltRepository";
import { EditBeltService } from "../../../services/belt/editBeltService";

export async function EditBeltController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {color,rq_frequency} = z.object({
            color: ZodColors,
            rq_frequency: z.number(),
        }).parse(request.body);

        const beltRepo = new PrismaBeltRepository();
        const service = new EditBeltService(beltRepo);

        service.execute(color,{
            rq_frequency,
        })

        reply.status(201).send({
            description:"success"
        })
        
    } catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            });
        }
        throw err;
    }
}