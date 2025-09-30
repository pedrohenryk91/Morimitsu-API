import { FastifyInstance } from "fastify";
import { LoginController } from "../controllers/auth/loginController";

export async function authRouter(app: FastifyInstance) {
    app.route({
        url:"/login",
        method:["POST"],
        handler:LoginController
    })
}