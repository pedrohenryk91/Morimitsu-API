import { user } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../UserRepository";
import { InstructorShownData } from "../../lib/types/user";

export class PrismaUserRepository implements UserRepository {
    async create(data: user): Promise<user> {
        const {cpf,email,name,password,phone_number,belt_id,role} = data;
        const user = await prisma.user.create({
            data:{
                cpf,
                name,
                role,
                belt:{
                    connect:{
                        id:belt_id,
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
        return await prisma.user.findUnique({
            where:{
                id,
            },
            include:{
                classes:{
                    where:{
                        instructor_id:id,
                    }
                }
            }
        });
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

    async getInstructorsShownData(take?: number): Promise<InstructorShownData[]> {
        const dataRaw = await prisma.user.findMany({
            where:{
                role:"instructor",
            },
            select:{
                id:true,
                name:true,
                classes:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            },
            take,
        })
        const dataParsed: InstructorShownData[] = dataRaw.map(data => {
            return {
                instructorName:data.name,
                instructorId:data.id,
                classes:data.classes,
            }
        })
        return dataParsed;
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

    async delete(id: string): Promise<user | null> {
        return await prisma.user.delete({
            where:{
                id,
            }
        })
    }
}