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
            throw new EntityNotFoundError("All students")
        }
        if(doesStudentsExists.length){
            doesStudentsExists.map((student)=>{
                if(!(student.id in studentsIds)){
                    throw new EntityNotFoundError(`Student ${student.full_name}`)
                }
            })
        }

        await this.studentRepo.connectManyToClass(studentsIds, classId);
    }
}