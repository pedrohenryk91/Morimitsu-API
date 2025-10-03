import { admin, Prisma } from "@prisma/client";
import { AdminRepository } from "../AdminRepository";
import { prisma } from "../../lib/prisma";

export class PrismaAdminRepository implements AdminRepository {
    async create(data: Prisma.adminCreateInput): Promise<admin> {
        const {email,username,password} = data;
        const admin = await prisma.admin.create({
            data:{
                email,
                username,
                password,
            }
        })
        return admin
    }

    async findByEmail(email: string): Promise<admin | null> {
        const admin = prisma.admin.findUnique({
            where:{
                email,
            }
        })
        return admin
    }

    async update(id: string, data: Partial<admin>): Promise<admin | null> {
        const admin = prisma.admin.update({
            where:{
                id,
            },
            data:{
                email:data.email,
                password:data.password,
            }
        })
        return admin
    }

    async delete(id: string): Promise<void> {
        prisma.admin.delete({
            where:{
                id,
            }
        })
    }
}