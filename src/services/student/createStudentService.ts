import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { StudentRepository } from "../../repositories/StudentRepository";
import { date } from "zod";
import {CpfAlreadyRegistered } from "../../errors/cpfAlreadyRegistered";

interface CreateStudentParams {
    cpf: string,
    gender: string,
    nickname: string,
    fullName: string,
    guardianName: string,
    phoneNumber?: string,
    guardianNumber?: string,
    birthday: Date
}


export class CreateStudentService {
    constructor(private studentRepo: StudentRepository){}
    async execute({
        cpf,
        gender,
        nickname,
        fullName,
        guardianName,
        phoneNumber,
        guardianNumber,
        birthday: Date
    }: CreateStudentParams){
        const doesEmailInUse = await this.studentRepo.findByCpf(cpf);
        if(doesEmailInUse){
            throw new CpfAlreadyRegistered();
        }

        return {
            cpf
        }
    }
}