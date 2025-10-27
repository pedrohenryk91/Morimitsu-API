import { CpfAlreadyRegistered } from "../../errors/cpfAlreadyRegistered";
import { EmailAlreadyInUseError } from "../../errors/emailAlreadyInUseError";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserAlreadyExistsError } from "../../errors/userAlreadyExistsError";
import { StudentRepository } from "../../repositories/StudentRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface Params {
    studentId: string,
    password: string,
    email: string,
}

export class CreateUserFromStudentService {
    constructor(private userRepo: UserRepository, private studentRepo: StudentRepository){}
    async execute({
        studentId,
        password,
        email,
    }: Params){
        const doesStudentExists = await this.studentRepo.findById(studentId);
        if(!doesStudentExists){
            throw new EntityNotFoundError("Student");
        }

        const doesCpfAlreadyInUse = await this.userRepo.findByCpf(doesStudentExists.cpf);
        if(doesCpfAlreadyInUse){
            throw new UserAlreadyExistsError();
        }

        const doesEmailInUse = await this.userRepo.findByEmail(email);
        if(doesEmailInUse){
            throw new EmailAlreadyInUseError();
        }

        const {belt_id,cpf,nickname,phone_number} = doesStudentExists
        await this.userRepo.create({
            belt_id,
            cpf,
            email,
            password,
            phone_number,
            name:nickname,
            role:"instructor"
        });
    }
}