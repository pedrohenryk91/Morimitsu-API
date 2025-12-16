export class UnauthorizedUserError extends Error {
    constructor(){
        super(`The user does not have authorization to access this route`);
    }
}