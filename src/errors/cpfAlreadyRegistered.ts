export class CpfAlreadyRegistered extends Error {
    constructor(){
        super("Cpf is already registered");
    }
}