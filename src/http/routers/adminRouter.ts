import { FastifyInstance } from "fastify";
import { adminLoginController } from "../controllers/admin/adminLoginController";
import { createAdminController } from "../controllers/admin/createAdminController";

export async function adminRouter(app: FastifyInstance) {
    app.route({
        url:"/create",
        method:"POST",
        handler:createAdminController,
    })
    app.route({
        url:"/login",
        method:"POST",
        handler:adminLoginController,
    })
}