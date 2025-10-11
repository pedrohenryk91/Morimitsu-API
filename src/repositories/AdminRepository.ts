import { admin, Prisma } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";

export interface AdminRepository extends DefaultRepository<admin, string> {
    findByEmail(email: string): Promise<admin | null>
}