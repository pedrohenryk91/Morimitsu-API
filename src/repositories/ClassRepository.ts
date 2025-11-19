import { classes } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";
import { SearchClassesParams } from "../lib/interfaces/searchClassesParams";

export interface ClassRepository extends DefaultRepository<classes, string> {
    search(data: SearchClassesParams): Promise<classes[]>
}