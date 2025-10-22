import { Prisma, user } from "@prisma/client"
import { DefaultRepository } from "./DefaultRepository"

export interface UserRepository extends DefaultRepository<user, string> {
    findByCpf(cpf: string): Promise<user | null>
    findByEmail(email: string): Promise<user | null>
}