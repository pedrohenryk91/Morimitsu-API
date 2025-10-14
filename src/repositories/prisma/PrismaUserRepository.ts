import { Prisma, user } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../UserRepository";
import { randomUUID } from "crypto";

export class PrismaUserRepository implements UserRepository {
    async create(data: user): Promise<user> {
        const {cpf,email,name,password,phone_number,belt_id,role} = data;
        const user = await prisma.user.create({
            data:{
                cpf,
                name,
                role,
                belt:{
                    create:{
                        id:belt_id,
                        color:"white",
                    }
                },
                email,
                password,
                phone_number,
            },
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