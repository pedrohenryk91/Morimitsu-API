export class UserAlreadyExistsError extends Error {
    constructor(){
        super(`The user already exists`);
    }
}