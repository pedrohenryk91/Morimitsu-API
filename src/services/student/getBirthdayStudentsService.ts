import { StudentRepository } from "../../repositories/StudentRepository";

export class GetBirthdayStudentsService {
    constructor(private studentRepo: StudentRepository){}
    async execute(days: number){
        const students = await this.studentRepo.searchByBirthday(days);
        if(students.length == 0){
            return `No students is completing their birthday in the next ${days} days`
        }
        return students;
    }
}