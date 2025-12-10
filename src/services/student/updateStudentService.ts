import { gender, student } from "@prisma/client";
import { StudentRepository } from "../../repositories/StudentRepository";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { CpfAlreadyRegistered } from "../../errors/cpfAlreadyRegistered";

interface UpdateStudentParams {
    cpf?: string;
    age?: number;
    gender?: gender;
    nickname?: string;
    full_name?: string;
    guardian_name?: string;
    phone_number?: string;
    guardian_number?: string;
    birthday?: Date;
    current_fq?: number;
    belt_id?: string;
}

export class UpdateStudentService {
    constructor(private studentRepo: StudentRepository){}
    async execute(id: string, {
        age,
        belt_id,
        birthday,
        cpf,
        current_fq,
        full_name,
        gender,
        guardian_name,
        guardian_number,
        nickname,
        phone_number,
    }: UpdateStudentParams){
        if(cpf){
            const doesCpfInUse = await this.studentRepo.findByCpf(cpf);
            if(doesCpfInUse){
                throw new CpfAlreadyRegistered();
            }
        }
        const doesStudentExists = await this.studentRepo.update(id, {
            age,
            belt_id,
            birthday,
            cpf,
            current_fq,
            full_name,
            gender,
            guardian_name,
            guardian_number,
            nickname,
            phone_number,
        });
        if(!doesStudentExists){
            throw new EntityNotFoundError("Student");
        }
        return doesStudentExists;
    }
}