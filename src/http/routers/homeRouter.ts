import { FastifyInstance } from "fastify";
import { homeController } from "../controllers/homeController";

export async function homeRouter(app: FastifyInstance) {
    app.route({
        url:"/",
        method:["GET"],
        handler:homeController,
    })
    app.route({
        url:"/home",
        method:["GET"],
        handler:homeController,
    })
}