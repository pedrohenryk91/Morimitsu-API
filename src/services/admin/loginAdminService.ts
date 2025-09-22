import { compare } from "bcryptjs";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { AdminRepository } from "../../repositories/AdminRepository";
import { IncorrectPasswordError } from "../../errors/passwordIncorrectError";
import { genToken } from "../../utils/jwtToken";

interface LoginServiceParams {
    email: string,
    password: string,
}

export class LoginAdminService {
    constructor(private adminRepo: AdminRepository){}
    async execute({
        email,
        password,
    }: LoginServiceParams){
        const searchForAdmin = await this.adminRepo.findByEmail(email)
        if(!searchForAdmin){
            throw new EntityNotFoundError("User");
        }

        const isPasswordCorrect = await compare(password, searchForAdmin.password);

        if(!isPasswordCorrect){
            throw new IncorrectPasswordError();
        }

        return genToken({ id: searchForAdmin.id })
    }
}