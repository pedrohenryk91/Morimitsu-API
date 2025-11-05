import { FastifyInstance } from "fastify";
import { registerStudentController } from "../controllers/student/registerStudentController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { getStudentData } from "../controllers/student/getStudentData";

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
}