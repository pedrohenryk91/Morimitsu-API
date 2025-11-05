import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { DeleteStudentService } from "../../../services/student/deleteStudentService";

export async function deleteStudentController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {id} = z.object({
            id: z.string(),
        }).parse(request.params);

        const studentRepo = new PrismaStudentRepository();
        const service = new DeleteStudentService(studentRepo);

        await service.execute(id);

        reply.status(200).send({
            description: "deleted",
        });
    }
    catch (err) {
        throw err;        
    }
}