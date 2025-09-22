export class IncorrectPasswordError extends Error {
    constructor(){
        super("The password is incorrect");
    }
}