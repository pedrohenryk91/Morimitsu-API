import { roles, user } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { UserAlreadyExistsError } from "../../errors/userAlreadyExistsError";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { CpfAlreadyRegistered } from "../../errors/cpfAlreadyRegistered";
import { sendEmail } from "../../utils/mailer";

interface CreateUserParam {
    cpf: string,
    name: string,
    email: string,
    belt_id: string,
    password: string,
    phoneNumber: string | null,
}

export class CreateUserService {
    constructor(private userRepo: UserRepository){}
    async execute({
        cpf,
        name,
        email,
        password,
        phoneNumber,
        belt_id,
    }: CreateUserParam){
        const doesCpfInUse = await this.userRepo.findByCpf(cpf);
        if(doesCpfInUse){
            throw new CpfAlreadyRegistered();
        }

        const doesEmailInUse = await this.userRepo.findByEmail(email);
        if(doesEmailInUse){
            throw new EmailAlreadyInUseError();
        }

        const hash_password = await hash(password, 11);

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

        const user = await this.userRepo.create({
            cpf,
            name,
            role:"instructor",
            email,
            password:hash_password,
            phone_number:phoneNumber,
            belt_id,
        });

        return {
            name:user.name
        }
    }
}