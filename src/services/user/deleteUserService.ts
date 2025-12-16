import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { StudentRepository } from "../../repositories/StudentRepository";
import { UserRepository } from "../../repositories/UserRepository";

export class DeleteUserService {
    constructor(private userRepo: UserRepository, private studentRepo: StudentRepository){}
    async execute(id: string){
        const doesUserExists = await this.userRepo.findById(id);
        if(!doesUserExists){
            throw new EntityNotFoundError("Instructor");
        }
        const doesStudentExists = await this.studentRepo.findByCpf(doesUserExists.cpf);
        if(doesStudentExists){
            await this.studentRepo.update(doesStudentExists.id, {
                is_monitor:false,
            })
        }
        await this.userRepo.delete(id);
    }
}