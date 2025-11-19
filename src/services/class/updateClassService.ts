import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { ClassRepository } from "../../repositories/ClassRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface UpdateClassParams {
    instructorId?: string,
    requiredFq?: number,
    name?: string,
}

export class UpdateClassService {
    constructor(private classRepo: ClassRepository, private userRepo: UserRepository){}
    async execute(classId: string,{
        instructorId,
        name,
        requiredFq,
    }: UpdateClassParams){
        const doesClassExists = await this.classRepo.findById(classId);
        if(!doesClassExists){
            throw new EntityNotFoundError("Class");
        }

        if(instructorId){
            const doesInstructorExists = await this.userRepo.findById(instructorId);
            if(!doesInstructorExists){
                throw new EntityNotFoundError("Instructor");
            }
        }

        await this.classRepo.update(classId,{
            instructor_id:instructorId,
            name,
            rq_fq:requiredFq,
        });
    }
}