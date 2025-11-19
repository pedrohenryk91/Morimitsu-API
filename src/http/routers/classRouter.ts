import { FastifyInstance } from "fastify";
import { verifyAdminAuthToken } from "../middlewares/verifyAdminAuthToken";
import { CreateClassController } from "../controllers/class/createClassController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { AddStudentsToClassController } from "../controllers/class/addStudentsToClassController";
import { getClassStudentsController } from "../controllers/class/getClassStudentsController";
import { searchClassesController } from "../controllers/class/searchClassesController";
import { updateClassController } from "../controllers/class/updateClassController";

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
    app.route({
        url:"/get/students/:classId",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:getClassStudentsController,
    })
    app.route({
        url:"/update",
        method:["PUT"],
        preHandler:verifyAdminAuthToken,
        handler:updateClassController,
    })
    app.route({
        url:"/search",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:searchClassesController,
    })
}