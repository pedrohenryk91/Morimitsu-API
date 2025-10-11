import { grade } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";

export interface GradeRepository extends DefaultRepository<grade, string> {}