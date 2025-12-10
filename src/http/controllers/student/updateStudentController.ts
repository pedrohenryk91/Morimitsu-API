import { student } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ZodColors } from "../../../lib/types/colors";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { UpdateStudentService } from "../../../services/student/updateStudentService";

export async function updateStudentController(request: FastifyRequest, reply: FastifyReply) {
    const {studentId} = z.object({
        studentId: z.string(),
    }).parse(request.params);

    const {gender,beltId,birthday,cpf,currentFq,fullName,guardianName,guardianNumber,nickname,phoneNumber} = z.object({
        cpf: z.string().optional(),
        gender: z.enum(["man","woman"]).optional(),
        nickname: z.string().optional(),
        fullName: z.string().optional(),
        guardianName: z.string().optional(),
        phoneNumber: z.string().optional(),
        guardianNumber: z.string().optional(),
        birthday: z.date().optional(),
        currentFq: z.number().optional(),
        beltId: ZodColors.optional(),
    }).parse(request.body);

    const studentRepo = new PrismaStudentRepository();
    const service = new UpdateStudentService(studentRepo);

    const result = await service.execute(studentId, {
        belt_id:beltId,
        birthday,
        cpf,
        current_fq:currentFq,
        full_name:fullName,
        gender,
        guardian_name:guardianName,
        guardian_number:guardianNumber,
        nickname,
        phone_number:phoneNumber,
    });

    reply.status(201).send({
        description:"Student updated.",
        result,
    });
}