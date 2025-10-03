import { Prisma, user } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../UserRepository";

export class PrismaUserRepository implements UserRepository {
    async create(data: Prisma.userCreateInput): Promise<user> {
        const user = await prisma.user.create({
            data,
        })
        return user
    }

    async findById(id: string): Promise<user | null> {
        const user = await prisma.user.findUnique({
            where:{
                id,
            }
        })
        return user
    }

    async findByCpf(cpf: string): Promise<user | null> {
        const user = await prisma.user.findUnique({
            where:{
                cpf,
            }
        })
        return user
    }

    async findByEmail(email: string): Promise<user | null> {
        const user = await prisma.user.findFirst({
            where:{
                email:{
                    mode:"insensitive",
                    equals:email,
                },
            }
        })
        return user
    }

    async update(id: string, data: Partial<user>): Promise<user | null> {
        const user = await prisma.user.update({
            where:{
                id,
            },
            data,
        })
        return user
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where:{
                id,
            }
        })
    }
}