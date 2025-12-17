import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { StudentRepository } from "../../repositories/StudentRepository";
import { date } from "zod";
import {CpfAlreadyRegistered } from "../../errors/cpfAlreadyRegistered";
import { gender } from "@prisma/client";
import { ageCalculation } from "../../utils/ageCalc";

interface CreateStudentParams {
    cpf: string,
    email: string,
    gender: gender,
    currentFq: number,
    nickname: string,
    fullName: string,
    guardianName: string,
    phoneNumber?: string,
    guardianNumber?: string,
    birthday: Date,
    beltId: string,
}


export class CreateStudentService {
    constructor(private studentRepo: StudentRepository){}
    async execute({
        cpf,
        email,
        gender,
        nickname,
        fullName,
        currentFq,
        guardianName,
        phoneNumber,
        guardianNumber,
        birthday,
        beltId,
    }: CreateStudentParams){
        const doesEmailInUse = await this.studentRepo.findByCpf(cpf);
        if(doesEmailInUse){
            throw new CpfAlreadyRegistered();
        }

        await this.studentRepo.create({
            cpf,
            age:ageCalculation(birthday),
            email,
            gender,
            nickname,
            full_name:fullName,
            birthday,
            current_fq: currentFq,
            belt_id: beltId,
            guardian_name:guardianName,
            guardian_number:guardianNumber,
            phone_number:phoneNumber,
        })

        return {
            cpf
        }
    }
}