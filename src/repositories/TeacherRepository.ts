import { Prisma, teachers } from "@prisma/client"

export interface TeacherRepository {
    create(data: Prisma.teachersCreateInput): Promise<teachers>
    findById(id: string): Promise<teachers | null>
    update(id: string, data: Partial<teachers>): Promise<teachers | null>
    delete(id: string): Promise<void>
}