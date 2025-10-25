import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { EntityNotFoundError } from "../../../errors/entityNotFoundError";
import { PrismaFrequencyRepository } from "../../../repositories/prisma/PrismaFrequencyRepository";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { PrismaClassRepository } from "../../../repositories/prisma/PrismaClassRepository";
import { AddFrequencyService } from "../../../services/frequency/addFrequenciesService";

export async function addFrequenciesController(request: FastifyRequest, reply: FastifyReply){
    try {
        const {classId,date,studentsIds} = z.object({
            studentsIds: z.array(z.string()),
            classId: z.string(),
            date: z.coerce.date(),
        }).parse(request.body);

        const frequencyRepo = new PrismaFrequencyRepository();
        const studentRepo = new PrismaStudentRepository();
        const classRepo = new PrismaClassRepository();
        const service = new AddFrequencyService(frequencyRepo, studentRepo, classRepo);

        await service.execute({
            students_ids:studentsIds,
            class_id:classId,
            date,
        })

        reply.status(201).send({
            description:"frequencies were added",
        });
    }
    catch (err) {
        if(err instanceof EntityNotFoundError){
            reply.status(404).send({
                message:err.message,
            })
        }
        throw err;
    }
}