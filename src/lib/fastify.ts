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
import { studentRouter } from "../http/routers/studentRouter";
import { frequencyRouter } from "../http/routers/frequencyRouter";
import { reportRouter } from "../http/routers/reportRouter";
import z, { ZodError } from "zod";
import { EntityNotFoundError } from "../errors/entityNotFoundError";
import { IncorrectPasswordError } from "../errors/passwordIncorrectError";
import { homeRouter } from "../http/routers/homeRouter";
import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";
import { EmailAlreadyInUseError } from "../errors/emailAlreadyInUseError";
import { CpfAlreadyRegistered } from "../errors/cpfAlreadyRegistered";

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
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true,
});

app.register(fastifySwagger, SwaggerDocumentationOptions);

app.register(fastifySwaggerUi, {
    routePrefix:"/docs",
});

app.register(homeRouter)

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

app.register(reportRouter, {
    prefix:"/report"
})

app.register(studentRouter, {
    prefix:"/student",
})

app.register(frequencyRouter, {
    prefix:"/frequency"
})

app.setErrorHandler((error, request, reply) => {
    if(error instanceof IncorrectPasswordError){
        reply.status(400).send({
            error: error.message,
        });
    }
    if(error instanceof EntityNotFoundError){
        reply.status(404).send({
            error: error.message,
        })
    }
    if(error instanceof UserAlreadyExistsError ||
       error instanceof EmailAlreadyInUseError ||
       error instanceof CpfAlreadyRegistered){
        reply.status(409).send({
            error:error.message,
        })
    }
    if(error instanceof ZodError){
        reply.status(422).send({
            error: z.treeifyError(error),
        })
    }
    reply.status(error.statusCode || 500).send({
        error: error.message
    })
});