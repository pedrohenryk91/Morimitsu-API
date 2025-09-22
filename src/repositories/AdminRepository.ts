import { admin, Prisma } from "@prisma/client";

export interface AdminRepository {
    create(data: Partial<admin>): Promise<admin>
    findByEmail(email: string): Promise<admin | null>
    update(id: string, data:Partial<admin>): Promise<admin | null>
    delete(id: string): Promise<void>
}