import { Prisma, user } from "@prisma/client"
import { DefaultRepository } from "./DefaultRepository"
import { InstructorShownData } from "../lib/types/user"

export interface UserRepository extends DefaultRepository<user, string> {
    findByCpf(cpf: string): Promise<user | null>
    findByEmail(email: string): Promise<user | null>
    getInstructorsShownData(take?: number): Promise<InstructorShownData[]>
}