import { student } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";
import { searchStudentParams } from "../lib/interfaces/searchStudentsParams";
import { EligibleStudent } from "../lib/types/eligibleStudent";
import { StudentBasicInfo } from "../lib/types/student";

export interface StudentRepository extends DefaultRepository<student, string> {
    findByBeltId(id: string): Promise<student[]>
    findManyById(ids: string[]): Promise<student[]>
    connectManyToClass(ids: string[], classId: string): Promise<void>
    findByClassId(classId: string): Promise<student[]>
    findByCpf(cpf: string): Promise<student | null>
    findByName(studentName: string): Promise<student[]>
    search(data: searchStudentParams, limit?: number): Promise<student[]>
    searchByBirthday(nDaysBefore: number): Promise<StudentBasicInfo[]>
    checkBirthday(nDaysBefore: number): Promise<boolean>
    countByFrequency(): Promise<EligibleStudent[]>
}