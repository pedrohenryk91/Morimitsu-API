export class UserAlreadyExistsError extends Error {
    constructor(data: string){
        super(`The user ${data} is already in use`);
    }
}