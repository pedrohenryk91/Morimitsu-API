import { hash } from "bcryptjs";
import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserAlreadyExistsError } from "../../errors/userAlreadyExistsError";
import { UserRepository } from "../../repositories/UserRepository";

interface UpdateUserParam {
    cpf?: string,
    name?: string,
    password?: string,
    email?: string,
    phoneNumber?:string,
}

export class UpdateUserService {
    constructor(private userRepo: UserRepository){}
    async execute(id: string,{
        cpf,
        email,
        name,
        password,
        phoneNumber,
    }: UpdateUserParam){
        const doesUserExists = await this.userRepo.findById(id);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }

        if(cpf){
            const doesCpfInUse = await this.userRepo.findByCpf(cpf);
            if(doesCpfInUse){
                throw new UserAlreadyExistsError("CPF");
            }
        }

        if(email){
            const doesEmailAlreadyInUse = await this.userRepo.findByEmail(email);
            if(doesEmailAlreadyInUse){
                throw new UserAlreadyExistsError("email");
            }
        }

        let hash_password
        if(password){
            hash_password = await hash(password, 12);
        }

        await this.userRepo.update(id, {
            cpf,
            email,
            name,
            password:hash_password,
            phone_number:phoneNumber,
        })

    }
}