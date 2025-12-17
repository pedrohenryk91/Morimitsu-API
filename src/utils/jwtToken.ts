import { app } from "../lib/fastify";

/**
 * Function that generates an JWT token
 * @param sub Data to be signed in the token payload
 * @returns The JWT Token -String- (expires in 1 hour)
 */
export function genToken(sub: any){
    return app.jwt.sign({sub},{
        expiresIn:"24h",
    });
}