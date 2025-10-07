import { grade } from "@prisma/client";

export interface GradeRepository {
    create(data: grade): Promise<grade>
    findById(id: string): Promise<grade | null>
    delete(id: string): Promise<void>
}