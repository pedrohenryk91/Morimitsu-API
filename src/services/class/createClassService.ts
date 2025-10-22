import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { ClassRepository } from "../../repositories/ClassRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface createClassParams {
    name: string,
    instructor_id: string,
}

export class CreateClassService {
    constructor(private classRepo: ClassRepository, private userRepo: UserRepository){}
    async execute({
        instructor_id,
        name,
    }: createClassParams){
        const doesUserExists = await this.userRepo.findById(instructor_id);
        if(!doesUserExists){
            throw new EntityNotFoundError("Instructor");
        }

        this.classRepo.create({
            name,
            instructor_id,
        })
    }
}