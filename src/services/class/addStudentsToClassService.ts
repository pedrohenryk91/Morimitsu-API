import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { ClassRepository } from "../../repositories/ClassRepository";
import { StudentRepository } from "../../repositories/StudentRepository";

interface addStudentsParams {
    studentsIds: string[],
    classId: string,
}

export class AddStudentsToClassService {
    constructor(private studentRepo: StudentRepository, private classRepo: ClassRepository){}
    async execute({
        studentsIds,
        classId
    }: addStudentsParams){
        const doesClassExists = await this.classRepo.findById(classId);
        if(!doesClassExists){
            throw new EntityNotFoundError("Class");
        }

        const doesStudentsExists = await this.studentRepo.findManyById(studentsIds);
        if(!doesStudentsExists.length){
            throw new EntityNotFoundError("Student")
        }

        await this.studentRepo.connectManyToClass(studentsIds, classId);
    }
}