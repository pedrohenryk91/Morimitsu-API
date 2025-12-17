import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UnauthorizedUserError } from "../../errors/unauthorizedUserError";
import { ClassRepository } from "../../repositories/ClassRepository";
import { UserRepository } from "../../repositories/UserRepository";

export class DeleteClassService {
    constructor(private classRepo: ClassRepository, private userRepo: UserRepository){}
    async execute(userId: string, classId: string){
        const doesUserExists = await this.userRepo.findById(userId);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }

        if(doesUserExists.role !== "admin"){
            throw new UnauthorizedUserError();
        }

        const doesClassExists = await this.classRepo.findById(classId);
        if(!doesClassExists){
            throw new EntityNotFoundError("Class");
        }

        await this.classRepo.delete(classId);
    }
}