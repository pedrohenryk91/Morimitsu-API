import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserRepository } from "../../repositories/UserRepository";

export class DeleteUserService {
    constructor(private userRepo: UserRepository){}
    async execute(id: string){
        const student = this.userRepo.delete(id);
        if(!student){
            throw new EntityNotFoundError("User");
        }
    }
}