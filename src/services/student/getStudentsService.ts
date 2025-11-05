import { studentNotFoundError } from "../../errors/studentNotFoundError";
import { StudentRepository } from "../../repositories/StudentRepository";

interface getStudentParams {
    studentName: string
}

export class GetStudentsService {
    constructor(private studentRepo: StudentRepository){}
    async execute({
        studentName
    }: getStudentParams){
        {
        const students = await this.studentRepo.findByName(studentName);
        if(!students){
            throw new studentNotFoundError();
        }
        return students;
    }
    }

}