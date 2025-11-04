import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/user/createUserController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { getUserInfoController } from "../controllers/user/getUserInfoController";
import { UpdateUserController } from "../controllers/user/updateUserController";
import { verifyAdminAuthToken } from "../middlewares/verifyAdminAuthToken";
import { createUserFromStudentController } from "../controllers/user/createUserFromStudentController";
import { deleteUserController } from "../controllers/user/deleteUserController";

export async function userRouter(app: FastifyInstance){
    app.route({
        url:"/create",
        method:["POST"],
        preHandler:verifyAdminAuthToken,
        handler:CreateUserController,
    });
    app.route({
        url:"/create/from/student",
        method:["POST"],
        preHandler:verifyAdminAuthToken,
        handler:createUserFromStudentController,
    })
    app.route({
        url:"/get",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:getUserInfoController,
    })
    app.route({
        url:"/update",
        method:["PUT"],
        preHandler:verifyAuthToken,
        handler:UpdateUserController,
    })
    app.route({
        url:"/delete/:id",
        method:["DELETE"],
        preHandler:verifyAdminAuthToken,
        handler:deleteUserController,
    })
}