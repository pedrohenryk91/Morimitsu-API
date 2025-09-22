import dotenv from "dotenv"
import z from "zod"

dotenv.config({override:true})

export const {NODE_ENV,HOST,PORT,JWT_SECRET,ADMIN_EMAIL,ADMIN_PASSWORD,REDIS_PASSWORD} = z.object({
    NODE_ENV:z.enum(["dev","deploy","test"]),
    PORT:z.string(),
    HOST:z.string(),
    JWT_SECRET:z.string(),
    ADMIN_PASSWORD:z.string(),
    ADMIN_EMAIL:z.string(),
    REDIS_PASSWORD:z.string(),
}).parse(process.env)