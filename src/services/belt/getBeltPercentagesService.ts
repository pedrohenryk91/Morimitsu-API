import { BeltRepository } from "../../repositories/BeltRepository";

export class GetBeltPercentagesService {
    constructor(private beltRepo: BeltRepository){}
    async execute(){
        const data = await this.beltRepo.getPercentages();
        const filteredData = data.map(belt => {
            return {
                color:belt.color,
                percentage:Number(belt.percentage),
                studentsCount:belt.students_count,
            }
        });
        return filteredData;
    }
}