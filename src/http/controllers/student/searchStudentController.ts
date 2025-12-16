import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { SearchStudentsService } from "../../../services/student/searchStudentsService";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { isCpfValid } from "../../../utils/isCpfValid";

export async function searchStudentsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const qsString = () =>
            z.union([z.string(), z.array(z.string())])
            .transform((v) => {
            const value = Array.isArray(v) ? v[0] : v; 
            return value === "" ? undefined : value;
            })
            .optional();


        const qsNumber = () =>
            z.union([z.string(), z.array(z.string())])
            .transform((v) => {
            const value = Array.isArray(v) ? v[0] : v;

            if (value === "") return undefined;

            const num = Number(value);
            return Number.isNaN(num) ? undefined : num;
            })
            .optional();

        const schema = z.object({
            fullName: qsString(),
            nickname: qsString(),
            minAge: qsNumber(),
            maxAge: qsNumber(),
            beltId: qsString(),
            gender: z.preprocess(
                (v) => (v === "" ? undefined : v),
                z.enum(["man", "woman"]).optional()
            ),
            guardianName: qsString(),
            isMonitor: z.coerce.boolean().optional(),
            phoneNumber: qsString(),
            cpf: qsString().refine(
                (data) => (data ? isCpfValid(data) : true),
                "InvalidCpf"
            ),
        });


        const {beltId,cpf,fullName,gender,isMonitor,guardianName,maxAge,minAge,nickname,phoneNumber} = schema.parse(request.query);

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
            isMonitor,
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