import { report } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";
import { SearchReportParams } from "../lib/interfaces/searchReportParams";

export interface ReportRepository extends DefaultRepository<report, string>{
    search(data: SearchReportParams): Promise<report[]>
}