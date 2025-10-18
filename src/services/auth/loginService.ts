import { compare } from "bcryptjs";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserRepository } from "../../repositories/UserRepository";
import { IncorrectPasswordError } from "../../errors/passwordIncorrectError";
import { genToken } from "../../utils/jwtToken";
import { ADMID, USRID } from "../../lib/env";

interface Params {
    email: string,
    password: string,
}

export class LoginService {
    constructor(private userRepo: UserRepository){}
    async execute({
        email,
        password
    }: Params){
        const doesUserExists = await this.userRepo.findByEmail(email);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }

        const result = await compare(password,doesUserExists.password);
        if(!result){
            throw new IncorrectPasswordError();
        }

        const token = genToken({
            id:doesUserExists.id,
            role:(doesUserExists.role==="admin"?ADMID:USRID),
        });

        return {
            token
        }
    }
}