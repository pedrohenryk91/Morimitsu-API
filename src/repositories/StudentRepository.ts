import { student } from "@prisma/client";
import { Student } from "../lib/types/student";

export interface StudentRepository {
    create(data: Student): Promise<student>
    findById(id: string): Promise<student | null>
    update(id: string, data: Partial<Student>): Promise<student | null>
    delete(id: string): Promise<void>
}