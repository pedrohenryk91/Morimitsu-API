import { FastifyInstance } from "fastify";
import { registerStudentController } from "../controllers/student/registerStudentController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";

export async function studentRouter(app: FastifyInstance) {
    app.route({
        url:"/create",
        method:["POST"],
        preHandler:verifyAuthToken,
        handler:registerStudentController,
    })
}