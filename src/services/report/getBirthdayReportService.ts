import { report } from "@prisma/client";
import { ReportRepository } from "../../repositories/ReportRepository";
import { StudentRepository } from "../../repositories/StudentRepository";
import { randomUUID } from "crypto";

//Need to work more on this
export class GetBirthdayReportService {
    constructor(private reportRepo: ReportRepository, private studentRepo: StudentRepository){}
    async execute(){
        const today = new Date();
        const reports = await this.reportRepo.search({
            to:"instructor",
            id:`.anniversary.${today.getUTCFullYear()}`,
        })
        if(reports.length){
            let result: report[] = [];
            const nDaysAgo = new Date()
            nDaysAgo.setDate(today.getDate()-30);
            for(const report of reports){
                const data = report.id.split(".");
                const date = new Date(data[2]);
                if(nDaysAgo <= date && date <= today){
                    result.push(report);
                }
            }
            return result;
        }
        const doesExistsStudentsCelebrating = await this.studentRepo.checkBirthday(30);
        if(!doesExistsStudentsCelebrating){
            return "No reports were found for birthdays in the last 30 days";
        }
        const report = await this.reportRepo.create({
            id:`.anniversary.${today.getUTCFullYear()}-${today.getMonth()}-${today.getDate()}-${randomUUID()}`,
            date: today,
            text:"Existem alunos que completaram aniversário nos últimos 30 dias",
            title:"Alunos completando aniversário",
            to:"instructor",
        })
        return [report];
    }
}