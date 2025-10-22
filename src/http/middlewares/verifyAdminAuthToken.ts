import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ADMID } from "../../lib/env";

export async function verifyAdminAuthToken(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const result = z.object({
        sub:z.object({
            id:z.string(),
            role:z.string(),
        })
    }).safeParse(request.user)

    if(!result.success){
        throw new Error("The token is not valid for this route");
    }

    if(result.data.sub.role!==ADMID){
        reply.status(403).send({
            message:"User does not have permission to this route"
        })
    }

    request.user = result.data.sub.id;
}