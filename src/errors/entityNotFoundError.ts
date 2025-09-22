export class EntityNotFoundError extends Error {
    constructor(entity: string){
        super(`${entity} was not found`);
    }
}