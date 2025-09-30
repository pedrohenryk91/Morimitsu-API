import { user } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";

interface CreateUserParam {
    cpf: string,
    name: string,
    email: string,
    password: string,
}

export class CreateUserService {
    constructor(private userRepo: UserRepository){}
    async execute({
        cpf,
        name,
        email,
        password,
    }: CreateUserParam){
        const doesUserExists = await this.userRepo.findByEmail(email);
        if(doesUserExists){
            throw new EmailAlreadyInUseError();
        }

        
    }
}