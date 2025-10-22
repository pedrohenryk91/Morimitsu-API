import { meeting } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";

export interface MeetingRepository extends DefaultRepository<meeting, string> {
    searchByName(name: string): Promise<meeting[]>
}