import { searchStudentParams } from "../../lib/interfaces/searchStudentsParams";
import { StudentRepository } from "../../repositories/StudentRepository";

export class SearchStudentsService {
    constructor(private studentRepo: StudentRepository){}
    async execute({
        fullName,
        maxAge,
        minAge,
        nickname
    }: searchStudentParams){
        const students = await this.studentRepo.search({
            fullName,
            maxAge,
            minAge,
            nickname,
        });

        return students;
    }
}