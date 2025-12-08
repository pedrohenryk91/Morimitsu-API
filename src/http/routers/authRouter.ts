import { FastifyInstance } from "fastify";
import { LoginController } from "../controllers/auth/loginController";
import { requestRecoveryController } from "../controllers/auth/requestRecoveryController";
import { recoverPasswordController } from "../controllers/auth/recoverPasswordController";
import { verifyRecoveryToken } from "../middlewares/verifyRecoveryToken";

export async function authRouter(app: FastifyInstance) {
    app.route({
        url:"/login",
        method:["POST"],
        handler:LoginController,
    })
    app.route({
        url:"/requestRecovery",
        method:["POST"],
        handler:requestRecoveryController,
    })
    app.route({
        url:"/recoverPassword",
        method:["PUT"],
        preHandler:[verifyRecoveryToken],
        handler:recoverPasswordController,
    })
}