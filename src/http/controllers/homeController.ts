import { FastifyReply, FastifyRequest } from "fastify";

export async function homeController(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.status(200).type("text/html")
        .send(`
            <html>
                <head>
                    <title>Home</title>
                </head>
                <body>
                    <h1>Running!</h1>
                </body>
            </html>
        `)
    } catch (err) {
        throw err;
    }
}