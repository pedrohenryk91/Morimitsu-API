import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { ClassRepository } from "../../repositories/ClassRepository";
import { StudentRepository } from "../../repositories/StudentRepository";

export class GetClassStudentsService {
    constructor(private classRepo: ClassRepository, private studentRepo: StudentRepository){}
    async execute(classId: string){
        const doesClassExists = await this.classRepo.findById(classId);
        if(!doesClassExists){
            throw new EntityNotFoundError("Class");
        }

        const students = await this.studentRepo.findByClassId(classId);
        if(!students.length)
            return "No students"
        return students;
    }
}