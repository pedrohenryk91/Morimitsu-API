import { belt } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";
import { Colors } from "../lib/types/colors";
import { BeltPercentage } from "../lib/types/beltPercentage";

export interface BeltRepository extends DefaultRepository<belt, string> {
    searchByColor(color: string): Promise<belt[]>
    updateMany(color: Colors, data: Partial<belt>): Promise<boolean>
    getPercentages(): Promise<BeltPercentage[]>
}