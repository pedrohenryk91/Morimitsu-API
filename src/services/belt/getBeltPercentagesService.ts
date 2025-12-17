import { BeltRepository } from "../../repositories/BeltRepository";

export class GetBeltPercentagesService {
    constructor(private beltRepo: BeltRepository){}
    async execute(){
        const data = await this.beltRepo.getPercentages();
        return data;
    }
}