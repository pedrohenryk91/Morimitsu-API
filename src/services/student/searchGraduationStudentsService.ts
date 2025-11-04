import { StudentRepository } from "../../repositories/StudentRepository";

export class SearchGraduationStudentsService {
    constructor(private studentRepo: StudentRepository){}
    async execute(){
        const students = await this.studentRepo.countByFrequency();
        console.log(students)
        if(!students.length){
            return "None students were found";
        }
        return students;
    }
}