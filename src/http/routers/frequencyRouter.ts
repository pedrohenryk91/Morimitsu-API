import { FastifyInstance } from "fastify";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { addFrequenciesController } from "../controllers/frequency/addFrequenciesController";

export async function frequencyRouter(app: FastifyInstance) {
    app.route({
        url:"/add",
        method:["PUT"],
        preHandler:verifyAuthToken,
        handler:addFrequenciesController,
    })
}