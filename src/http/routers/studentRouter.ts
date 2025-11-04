import { FastifyInstance } from "fastify";
import { registerStudentController } from "../controllers/student/registerStudentController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { searchStudentsController } from "../controllers/student/searchStudentController";
import { deleteStudentController } from "../controllers/student/deleteStudentController";

export async function studentRouter(app: FastifyInstance) {
    app.route({
        url:"/create",
        method:["POST"],
        preHandler:verifyAuthToken,
        handler:registerStudentController,
    })
    app.route({
        url:"/search",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:searchStudentsController,
    })
    app.route({
        url:"/delete/:id",
        method:["DELETE"],
        preHandler:verifyAuthToken,
        handler:deleteStudentController,
    })
}