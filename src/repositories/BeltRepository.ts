import { belt } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";

export interface BeltRepository extends DefaultRepository<belt, string> {
    findByStudentId(id: string): Promise<belt | null>
}