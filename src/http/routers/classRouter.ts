import { FastifyInstance } from "fastify";
import { verifyAdminAuthToken } from "../middlewares/verifyAdminAuthToken";
import { CreateClassController } from "../controllers/class/CreateClassController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { AddStudentsToClassController } from "../controllers/class/addStudentsToClassController";

export async function classRouter(app: FastifyInstance) {
    app.route({
        url:"/create",
        method:["POST"],
        preHandler:verifyAdminAuthToken,
        handler:CreateClassController,
    });
    app.route({
        url:"/add/students",
        method:["PUT"],
        preHandler:verifyAuthToken,
        handler:AddStudentsToClassController,
    })
}