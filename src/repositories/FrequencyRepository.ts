import { frequency } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";
import { CreateManyFrequenciesParams } from "../lib/interfaces/createManyFrequenciesParams";

export interface FrequencyRepository extends DefaultRepository<frequency, string> {
    createMany(data: CreateManyFrequenciesParams): Promise<void>
    findByStudentId(id: string): Promise<frequency[]>
    findByClassId(id: string): Promise<frequency[]>
}