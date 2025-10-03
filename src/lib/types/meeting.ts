import { meeting } from "@prisma/client"

export type Meeting = {
    name: string;
    id: string;
    description: string | null;
    date: Date;
    class_id: string;
}