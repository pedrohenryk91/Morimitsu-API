import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UnauthorizedUserError } from "../../errors/unauthorizedUserError";
import { UserRepository } from "../../repositories/UserRepository";

export class GetAllUsersService {
    constructor(private userRepo: UserRepository){}
    async execute(userId: string, take?: number){
        const doesUserExists = await this.userRepo.findById(userId);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }
        if(doesUserExists.role !== "admin"){
            throw new UnauthorizedUserError();
        }
        const data = await this.userRepo.getInstructorsShownData(take);
        return data;
    }
}