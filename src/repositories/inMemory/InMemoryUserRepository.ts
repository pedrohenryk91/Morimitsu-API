import { Prisma, user } from "@prisma/client";
import { UserRepository } from "../UserRepository";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";

export class InMemoryUserRepository implements UserRepository {
    private users: user[] = []

    async create(data: Prisma.userCreateInput): Promise<user> {
        const hash_password = await hash(data.password, 11);
        const teacher: user = {
            id:randomUUID(),
            cpf:data.cpf,
            name:data.name,
            email:data.email,
            password:hash_password,
        }
        this.users.push(teacher)
        return teacher
    }

    async findById(id: string): Promise<user | null> {
        return this.users.find(user => user.id === id) ?? null;
    }

    async findByEmail(email: string): Promise<user | null> {
        return this.users.find(user => user.email === email) ?? null;
    }

    async update(id: string, data: Partial<user>): Promise<user | null> {
        const user = this.users.find(user => user.id === id);
        if(!user) return null;

        const updatedUser = {
            ...user,
            ...data,
        };

        this.users = this.users.map(user => user.id === id ? updatedUser : user);
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const index = this.users.findIndex(user => user.id === id);
        const [deletedTeacher] = this.users.splice(index, -1);
    }
}