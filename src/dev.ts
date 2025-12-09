import { HOST, NODE_ENV, PORT } from "./lib/env";
import { app } from "./lib/fastify";

const port = Number(PORT);

app.listen({
    host:HOST,
    port,
}, (err, path) => {
    console.log(err || path);
    console.log("Environment:" + NODE_ENV);
})