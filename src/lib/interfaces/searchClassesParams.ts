import { classtype } from "@prisma/client";

export interface SearchClassesParams {
    name?: string,
    type?: classtype,
}