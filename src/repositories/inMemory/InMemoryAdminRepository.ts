import { admin } from "@prisma/client";
import { AdminRepository } from "../AdminRepository";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";

export class InMemoryAdminRepository implements AdminRepository {
    private admins: admin[] = []

    async create(data: Partial<admin>): Promise<admin> {
        const hash_password = await hash(String(data.password),11);
        const admin: admin = {
            id: String(randomUUID),
            email: String(data.email),
            username: String(data.username),
            password: hash_password
        };
        this.admins.push(admin);
        return admin;
    }

    async findByEmail(email: string): Promise<admin | null> {
        return this.admins.find(admin => admin.email === email) ?? null;
    }

    async update(id: string, data: Partial<admin>): Promise<admin | null> {
        const admin = this.admins.find(admin => admin.id === id);
        if(!admin) return null;

        const updatedAdmin = {
            ...admin,
            ...data,
        };

        this.admins = this.admins.map(admin => admin.id === id ? updatedAdmin : admin);
        return updatedAdmin;
    }

    async delete(id: string): Promise<void> {
        const index = this.admins.findIndex(admin => admin.id === id);
    
        const [deletedAdmin] = this.admins.splice(index, -1);
    }
}