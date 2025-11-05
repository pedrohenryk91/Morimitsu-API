import { FastifyRequest } from "fastify";
import z from "zod";
import { verifyUserExistence } from "../../utils/verifyUserExistence";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { NODE_ENV } from "../../lib/env";

export async function verifyAuthToken(request: FastifyRequest) {
    await request.jwtVerify();

    const result = z.object({
        sub:z.object({
            id:z.string(),
        })
    }).safeParse(request.user);

    if(!result.success){
        throw new Error("The token is not valid for this route");
    }

    if(NODE_ENV==="deploy"){
        await verifyUserExistence(new PrismaUserRepository(), result.data.sub.id);
    }

    request.user = result.data.sub.id;
}