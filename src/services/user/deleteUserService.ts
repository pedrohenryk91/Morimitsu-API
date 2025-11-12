import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserRepository } from "../../repositories/UserRepository";

export class DeleteUserService {
    constructor(private userRepo: UserRepository){}
    async execute(id: string){
        const user = this.userRepo.delete(id);
        if(!user){
            throw new EntityNotFoundError("User");
        }
    }
}