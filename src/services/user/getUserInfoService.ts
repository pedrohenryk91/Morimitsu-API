import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserRepository } from "../../repositories/UserRepository";

export class GetUserInfoService {
    constructor(private userRepo: UserRepository){}
    async execute(id: string){
        const doesUserExsists = await this.userRepo.findById(id);
        if(!doesUserExsists){
            throw new EntityNotFoundError("User");
        }

        const user = {
            id:doesUserExsists.id,
            cpf:doesUserExsists.cpf,
            name:doesUserExsists.name,
            beltId:doesUserExsists.belt_id,
            phoneNumber:doesUserExsists.phone_number,
        }

        return user;
    }
}