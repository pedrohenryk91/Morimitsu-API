import { FastifyRequest } from "fastify";
import z from "zod";

export async function verifyAuthToken(request: FastifyRequest) {
    await request.jwtVerify()

    const result = z.object({
        sub:z.object({
            id:z.string(),
        })
    }).safeParse(request.user)

    if(!result.success){
        throw new Error("The token is not valid for this route");
    }

    request.user = result.data.sub.id;
}