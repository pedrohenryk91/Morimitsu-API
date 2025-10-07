import { belt } from "@prisma/client";

export interface BeltRepository {
    create(data: belt): Promise<belt>
    findById(id: string): Promise<belt | null>
    findByStudentId(id: string): Promise<belt | null>
    update(id: string, data: Partial<belt>): Promise<belt>
    delete(id: string): Promise<void>
}