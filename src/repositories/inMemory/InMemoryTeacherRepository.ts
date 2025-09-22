import { Prisma, teachers } from "@prisma/client";
import { TeacherRepository } from "../TeacherRepository";
import { randomUUID } from "crypto";

export class InMemoryTeacherRepository implements TeacherRepository {
    private teachers: teachers[] = []

    async create(data: Prisma.teachersCreateInput): Promise<teachers> {
        const teacher: teachers = {
            id:randomUUID(),
            cpf:data.cpf,
            name:data.name,
            password:data.password,
        }
        this.teachers.push(teacher)
        return teacher
    }

    async findById(id: string): Promise<teachers | null> {
        return this.teachers.find(teacher => teacher.id === id) ?? null;
    }

    async update(id: string, data: Partial<teachers>): Promise<teachers | null> {
        const teacher = this.teachers.find(teacher => teacher.id === id);
        if(!teacher) return null;

        const updatedTeacher = {
            ...teacher,
            ...data,
        };

        this.teachers = this.teachers.map(teacher => teacher.id === id ? updatedTeacher : teacher);
        return updatedTeacher;
    }

    async delete(id: string): Promise<void> {
        const index = this.teachers.findIndex(teacher => teacher.id === id);
        const [deletedTeacher] = this.teachers.splice(index, -1);
    }
}