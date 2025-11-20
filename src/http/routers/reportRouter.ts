import { FastifyInstance } from "fastify";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { searchReportsController } from "../controllers/report/searchReportsController";
import { getBirthdayReportController } from "../controllers/report/getBirthdayReportController";

export async function reportRouter(app: FastifyInstance) {
    app.route({
        url:"/search",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:searchReportsController,
    })
    app.route({
        url:"/birthday",
        method:["GET"],
        preHandler:verifyAuthToken,
        handler:getBirthdayReportController,
    })
}