import { belt } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";
import { Colors } from "../lib/types/colors";

export interface BeltRepository extends DefaultRepository<belt, string> {
    searchByColor(color: string): Promise<belt[]>
    updateMany(color: Colors, data: Partial<belt>): Promise<boolean>
}