import { colors } from "@prisma/client";
import { BeltRepository } from "../../repositories/BeltRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { Colors } from "../../lib/types/colors";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";

interface EditBeltParams {
    rq_frequency: number,
}

export class EditBeltService {
    constructor(private beltRepo: BeltRepository){}
    async execute(color: Colors, {
        rq_frequency,
    }: EditBeltParams){
        const result = await this.beltRepo.updateMany(color, {
            rq_frequency,
        });

        if(!result){
            throw new EntityNotFoundError("Belt");
        }
    }
}