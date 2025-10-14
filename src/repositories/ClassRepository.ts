import { classes } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";

export interface ClassRepository extends DefaultRepository<classes, string> {}