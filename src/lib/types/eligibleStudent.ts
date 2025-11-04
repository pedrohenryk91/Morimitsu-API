import { colors } from "@prisma/client"

export type EligibleStudent = {
    id: string;
    full_name: string;
    current_fq: number;
    belt_color: string | null;
    belt_rq_fq: number | null;
    class_id?: string | null;
    class_name?: string | null;
    class_type?: "kids" | "normal" | "mista" | null;
    class_rq_fq?: number | null;
};