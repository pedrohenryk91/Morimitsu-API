import { gender } from "@prisma/client";

export type Student = {
    id: string;
    cpf: string;
    gender: gender;
    nickname: string;
    full_name: string;
    ifce_registration: string;
    phone_number: string | null;
    guardian_number: string | null;
    birthday: Date;
    current_fq: number;
    belt_id: string;
}