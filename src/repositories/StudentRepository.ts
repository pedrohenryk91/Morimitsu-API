import { student } from "@prisma/client";
import { Student } from "../lib/types/student";
import { DefaultRepository } from "./DefaultRepository";

export interface StudentRepository extends DefaultRepository<student, string> {}