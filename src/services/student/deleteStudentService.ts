import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { StudentRepository } from "../../repositories/StudentRepository";

export class DeleteStudentService {
    constructor(private studentRepo: StudentRepository){}
    async execute(id: string){
        const student = this.studentRepo.delete(id);
        if(!student){
            throw new EntityNotFoundError("Student");
        }
    }
}