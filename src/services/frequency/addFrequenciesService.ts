import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { ClassRepository } from "../../repositories/ClassRepository";
import { FrequencyRepository } from "../../repositories/FrequencyRepository";
import { StudentRepository } from "../../repositories/StudentRepository";

interface AddFrequencyParams {
    students_ids: string[],
    class_id: string,
    date: Date,
}

export class AddFrequencyService {
    constructor(private frequencyRepo: FrequencyRepository,
                private studentRepo: StudentRepository,
                private classRepo: ClassRepository
    ){}
    async execute({
        class_id,
        date,
        students_ids,
    }: AddFrequencyParams){
        const doesClassExists = await this.classRepo.findById(class_id);
        if(!doesClassExists){
            throw new EntityNotFoundError("Class");
        }

        for (const id of students_ids){

            const doesStudentExists = await this.studentRepo.findById(id);
            if(!doesStudentExists){
                throw new EntityNotFoundError(`Student id ${id}`);
            }

            await this.studentRepo.update(id, {
                current_fq:doesStudentExists.current_fq+1,
            })
        }

        await this.frequencyRepo.createMany({
            students_ids,
            class_id,
            date
        })
    }
}