import { FastifyRequest } from "fastify";
import z from "zod";

export async function verifyRecoveryToken(request: FastifyRequest) {
    await request.jwtVerify();

    const result = z.object({
        sub: z.object({
            def: z.literal("RecovPass;)")
        }),
    }).safeParse(request.user);

    if(!result.success){
        throw new Error("The token is not valid for this route");
    }
}