import { user } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { UserAlreadyExistsError } from "../../errors/userAlreadyExistsError";
import { hash } from "bcryptjs";

interface CreateUserParam {
    cpf: string,
    name: string,
    email: string,
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
    }: CreateUserParam){
        const doesCpfInUse = await this.userRepo.findByCpf(cpf);
        if(doesCpfInUse){
            throw new UserAlreadyExistsError("CPF");
        }

        const doesEmailInUse = await this.userRepo.findByEmail(email);
        if(doesEmailInUse){
            throw new EmailAlreadyInUseError();
        }

        const hash_password = await hash(password, 11);

        const user = await this.userRepo.create({
            cpf,
            name,
            email,
            password:hash_password,
            phone_number:phoneNumber,
        });

        return {
            name:user.name
        }
    }
}