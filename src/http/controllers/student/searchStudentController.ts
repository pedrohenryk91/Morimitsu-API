import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { SearchStudentsService } from "../../../services/student/searchStudentsService";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { isCpfValid } from "../../../utils/isCpfValid";

export async function searchStudentsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {fullName,maxAge,minAge,nickname,beltId,gender,guardianName,phoneNumber,cpf} = z.object({
            fullName: z.string().optional(),
            nickname: z.string().optional(),
            minAge: z.coerce.number().optional(),
            maxAge: z.coerce.number().optional(),
            beltId: z.string().optional(),
            gender: z.enum(["man","woman"]).optional(),
            guardianName: z.string().optional(),
            phoneNumber: z.string().optional(),
            cpf: z.string().refine(data => isCpfValid(data), {
                error: "InvalidCpf"
            }).optional(),
        }).parse(request.query);

        const studentRepo = new PrismaStudentRepository();
        const service = new SearchStudentsService(studentRepo);

        const students = await service.execute({
            fullName,
            maxAge,
            minAge,
            nickname,
            beltId,
            cpf,
            gender,
            guardianName,
            phoneNumber,
        });

        reply.status(200).send({
            description:"success",
            students,
        })
    }
    catch (err) {
        throw err;
    }
}