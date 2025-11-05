import { FastifyInstance } from "fastify";
import { registerStudentController } from "../controllers/student/registerStudentController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { getStudentData } from "../controllers/student/getStudentData";
import { searchStudentsController } from "../controllers/student/searchStudentController";
import { deleteStudentController } from "../controllers/student/deleteStudentController";
import { eligibleStudentsSearchController } from "../controllers/student/eligibleStudentsSearchController";

export async function studentRouter(app: FastifyInstance) {
    app.route({
        url:"/create",
        method:["POST"],
        preHandler:verifyAuthToken,
        handler:registerStudentController,
    });
    app.route({
        url:"/get/:studentName",
        method: ["GET"],
        preHandler:verifyAuthToken,
        handler:getStudentData,
    });
    app.route({
        url:"/search",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:searchStudentsController,
    })
    app.route({
        url:"/search/gradable",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:eligibleStudentsSearchController,
    })
    app.route({
        url:"/delete/:id",
        method:["DELETE"],
        preHandler:verifyAuthToken,
        handler:deleteStudentController,
    })
}