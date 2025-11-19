import { SearchClassesParams } from "../../lib/interfaces/searchClassesParams";
import { ClassRepository } from "../../repositories/ClassRepository";

export class SearchClassesService {
    constructor(private classRepo: ClassRepository){}
    async execute(data: SearchClassesParams){
        const {name,type} = data;

        const classes = await this.classRepo.search({
            name,
            type,
        });

        if(!classes.length)
            return "No classes were found";
        return classes;
    }
}