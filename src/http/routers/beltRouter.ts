import { FastifyInstance } from "fastify";
import { EditBeltController } from "../controllers/belt/EditBeltController";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { verifyAdminAuthToken } from "../middlewares/verifyAdminAuthToken";
import { getBeltPercentagesController } from "../controllers/belt/GetBeltPercentagesController";

export async function beltRouter(app: FastifyInstance){
    app.route({
        url:"/update",
        method:["PATCH"],
        preHandler:verifyAdminAuthToken,
        handler:EditBeltController,
    });
    app.route({
        url:"/percentage",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:getBeltPercentagesController,
    })
}