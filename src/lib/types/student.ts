export type Student = {
    id: string;
    cpf: string;
    nickname: string;
    full_name: string;
    ifce_registration: string;
    phone_number: string | null;
    guardian_number: string | null;
    birthday: Date;
    goal_frequency: number;
    belt_id: string;
}