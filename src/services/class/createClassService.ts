import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { ClassTypes } from "../../lib/types/classtype";
import { ClassRepository } from "../../repositories/ClassRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface createClassParams {
    name: string,
    instructor_id: string,
    type: ClassTypes,
    rq_fq?: number,
}

export class CreateClassService {
    constructor(private classRepo: ClassRepository, private userRepo: UserRepository){}
    async execute({
        instructor_id,
        name,
        type,
        rq_fq,
    }: createClassParams){
        const doesUserExists = await this.userRepo.findById(instructor_id);
        if(!doesUserExists){
            throw new EntityNotFoundError("Instructor");
        }

        this.classRepo.create({
            name,
            instructor_id,
            type,
            rq_fq
        })
    }
}