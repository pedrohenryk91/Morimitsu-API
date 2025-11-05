import { CpfAlreadyRegistered } from "../../errors/cpfAlreadyRegistered";
import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserAlreadyExistsError } from "../../errors/userAlreadyExistsError";
import { StudentRepository } from "../../repositories/StudentRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { sendEmail } from "../../utils/mailer";

interface Params {
    studentId: string,
    password: string,
    email: string,
}

export class CreateUserFromStudentService {
    constructor(private userRepo: UserRepository, private studentRepo: StudentRepository){}
    async execute({
        studentId,
        password,
        email,
    }: Params){
        const doesStudentExists = await this.studentRepo.findById(studentId);
        if(!doesStudentExists){
            throw new EntityNotFoundError("Student");
        }

        const doesCpfAlreadyInUse = await this.userRepo.findByCpf(doesStudentExists.cpf);
        if(doesCpfAlreadyInUse){
            throw new UserAlreadyExistsError();
        }

        const doesEmailInUse = await this.userRepo.findByEmail(email);
        if(doesEmailInUse){
            throw new EmailAlreadyInUseError();
        }

        await sendEmail({
            subject:"Bem vindo ao Sistema Morimitsu",
            to:email,
            html:`<!DOCTYPE html>
                    <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Bem vindo</title>
                    </head>
                    <body>
                        <h1>Bem vindo ao sistema da Morimitsu!</h1>
                        <h2>Sua conta acaba de ser criada, por favor fazer o login o mais cedo possível</h2>
                    </body>
                    </html>`,
            text:`Sua conta foi criada no sistema da Morimitsu!
            Por favor, realize o login logo.`,
        })


        const {belt_id,cpf,nickname,phone_number} = doesStudentExists
        await this.userRepo.create({
            belt_id,
            cpf,
            email,
            password,
            phone_number,
            name:nickname,
            role:"instructor"
        });
    }
}