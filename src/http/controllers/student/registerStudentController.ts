import {FastifyRequest, FastifyReply} from "fastify";
import z, { email } from "zod";
import { CreateStudentService } from "../../../services/student/createStudentService";
import { PrismaStudentRepository } from "../../../repositories/prisma/PrismaStudentRepository";
import { CpfAlreadyRegistered } from "../../../errors/cpfAlreadyRegistered";
import { isCpfValid } from "../../../utils/isCpfValid";

export async function registerStudentController(request: FastifyRequest, reply: FastifyReply) {
try {
    const {cpf, gender, email, nickname, currentFq, fullName, guardianName, phoneNumber, guardianNumber, birthday, beltId} = z.object({
        cpf: z.string().refine(data => isCpfValid(data), {
            error: "InvalidCpf"
        }),
        email: z.email(),
        gender: z.enum(["man","woman"]),
        nickname: z.string(),
        currentFq: z.coerce.number(),
        fullName: z.string(),
        guardianName: z.string(),
        phoneNumber: z.string().optional(),
        guardianNumber: z.string().optional(),
        birthday: z.coerce.date(),
        beltId: z.string()
    }).parse(request.body);
    
    const prismaStudentRepo = new PrismaStudentRepository()
    const prismaStudent = new CreateStudentService(prismaStudentRepo)
    
    await prismaStudent.execute({
        cpf,
        email,
        gender, 
        nickname,
        currentFq,
        fullName, 
        guardianName, 
        phoneNumber, 
        guardianNumber, 
        birthday,
        beltId
    });

    reply.status(201).send({
        Description:"Student created",
    });
    
    }
    catch (err) {
        if(err instanceof CpfAlreadyRegistered){
            reply.status(409).send({
                message: err.message
            });
        }
        throw err;
    }
}