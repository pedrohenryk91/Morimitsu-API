import { student } from "@prisma/client";
import { Student } from "../lib/types/student";
import { DefaultRepository } from "./DefaultRepository";

export interface StudentRepository extends DefaultRepository<student, string> {
    findByBeltId(id: string): Promise<student[]>
    findManyById(ids: string[]): Promise<student[]>
    connectManyToClass(ids: string[], classId: string): Promise<void>
    findByClassId(classId: string): Promise<student[]>
    findByCpf(cpf: string): Promise<student | null>
}