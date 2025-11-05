import { EntityNotFoundError } from "../errors/entityNotFoundError";
import { UserRepository } from "../repositories/UserRepository";

export async function verifyUserExistence(repo: UserRepository, id: string) {
    const success = await repo.findById(id);
    if(!success){
        throw new EntityNotFoundError("User");
    }
}