import { hash } from "bcryptjs";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserRepository } from "../../repositories/UserRepository";
import { genToken } from "../../utils/jwtToken";
import { ADMID, USRID } from "../../lib/env";

interface RecoverUserParams {
    email: string,
    newPassword: string,
}

/**
 * @description Change user password and sign in
 */
export class RecoverUserService {
    constructor(private userRepo: UserRepository){}
    async execute({
        email,
        newPassword,
    }: RecoverUserParams){
        const doesUserExists = await this.userRepo.findByEmail(email);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }
    
        const hashPassword = await hash(newPassword, 11);
        await this.userRepo.update(doesUserExists.id, {
            password:hashPassword,
        });

        const token = genToken({
            id:doesUserExists.id,
            role:(doesUserExists.role==="admin"?ADMID:USRID),
        });

        return {
            token,
            role:doesUserExists.role,
        }
    }
}