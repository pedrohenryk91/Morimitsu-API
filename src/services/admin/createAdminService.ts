import { genSalt, hash } from "bcryptjs";
import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { AdminRepository } from "../../repositories/AdminRepository";

interface CreateAdminParams {
    email: string,
    username: string,
    password: string,
}

export class CreateAdminService {
    constructor(private adminRepo: AdminRepository){}
    async execute({
        email,
        username,
        password,
    }: CreateAdminParams){
        const doesEmailInUse = await this.adminRepo.findByEmail(email);
        if(doesEmailInUse){
            throw new EmailAlreadyInUseError();
        }

        const hash_password = await hash(password, 11)

        await this.adminRepo.create({
            email,
            username,
            password:hash_password,
        })

        return {
            email
        }
    }
}