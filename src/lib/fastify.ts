import fastify from "fastify";
import { JWT_SECRET, REDIS_PASSWORD } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { SwaggerDocumentationOptions } from "../docs/swagger";
import fastifyCors from "@fastify/cors";
import fastifyRedis from "@fastify/redis";
import { authRouter } from "../http/routers/authRouter";
import { userRouter } from "../http/routers/userRouter";
import { beltRouter } from "../http/routers/beltRouter";
import { classRouter } from "../http/routers/classRouter";

export const app = fastify();

app.register(fastifyJwt, {
    secret:JWT_SECRET
});

// app.register(fastifyRedis, {
//     host:"127.0.0.1",
//     password:REDIS_PASSWORD,
//     port:6379,
// })

app.register(fastifyCors, {
    origin: true,
    methods: ["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true,
});

app.register(fastifySwagger, SwaggerDocumentationOptions);

app.register(fastifySwaggerUi, {
    routePrefix:"/docs"
});

app.register(authRouter, {
    prefix:"/auth"
})

app.register(userRouter, {
    prefix:"/user",
})

app.register(beltRouter, {
    prefix:"/belt",
})

app.register(classRouter, {
    prefix:"/class",
});

app.setErrorHandler((error, request, reply) => {
    reply.status(error.statusCode || 500).send({
        error: error.message
    })
});