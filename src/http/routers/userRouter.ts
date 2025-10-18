import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/user/createUserController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { getUserInfoController } from "../controllers/user/getUserInfoController";
import { UpdateUserController } from "../controllers/user/updateUserController";
import { verifyAdminAuthToken } from "../middlewares/verifyAdminAuthToken";

export async function userRouter(app: FastifyInstance){
    app.route({
        url:"/create",
        method:["POST"],
        preHandler:verifyAdminAuthToken,
        handler:CreateUserController,
    });
    app.route({
        url:"/get",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:getUserInfoController,
    })
    app.route({
        url:"/update",
        method:["POST"],
        preHandler:verifyAuthToken,
        handler:UpdateUserController,
    })
}