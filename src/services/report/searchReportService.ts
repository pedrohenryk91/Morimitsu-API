import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { ReportRepository } from "../../repositories/ReportRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface SearchParams {
    id?: string,
    maxDate?: Date,
    minDate?: Date,
    text?: string,
    title?: string
}

export class SearchReportService {
    constructor(private reportRepo: ReportRepository, private userRepo: UserRepository){}
    async execute(userId: string, {
        id,
        maxDate,
        minDate,
        text,
        title,
    }: SearchParams){
        const doesUserExists = await this.userRepo.findById(userId);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }

        const reports = await this.reportRepo.search({
            to:doesUserExists.role,
            id,
            maxDate,
            minDate,
            text,
            title,
        });

        if(!reports.length){
            return "No reports were found";
        }

        return reports;
    }
}