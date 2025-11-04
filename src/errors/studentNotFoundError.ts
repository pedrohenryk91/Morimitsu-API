export class studentNotFoundError extends Error {
    constructor(){
        super("student not found");
    }
}