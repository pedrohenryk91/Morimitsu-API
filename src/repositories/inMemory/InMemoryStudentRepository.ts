import { student } from "@prisma/client";
import { Student } from "../../lib/types/student";
import { StudentRepository } from "../StudentRepository";
import { randomUUID } from "crypto";

export class InMemoryStudentRepository implements StudentRepository {
    private students: student[] = [];
    async create(data: Student): Promise<student> {
        const {belt_id,birthday,cpf,full_name,goal_frequency,guardian_number,ifce_registration,nickname,phone_number} = data;
        const student: student = {
            id:randomUUID(),
            ifce_registration,
            guardian_number,
            goal_frequency,
            phone_number,
            full_name,
            birthday,
            nickname,
            belt_id,
            cpf,
        }
        this.students.push(student);
        return student;
    }

    async findById(id: string): Promise<student | null> {
        return this.students.find(student => student.id === id) ?? null;
    }

    async update(id: string, data: Partial<Student>): Promise<student | null> {
        const student = this.students.find(student => student.id === id) ?? null;
        if(!student) return null;

        const updatedStudent: student = {
            ...data,
            ...student,
        }

        this.students = this.students.map(student => student.id === id?updatedStudent : student);
        return updatedStudent;
    }

    async delete(id: string): Promise<void> {
        const index = this.students.findIndex(student => student.id === id);
        this.students.splice(index, -1);
    }
}