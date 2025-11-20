import { roles } from "@prisma/client";

export interface SearchReportParams {
    id?: string,
    to: roles,
    text?: string,
    title?: string,
    minDate?: Date,
    maxDate?: Date,
}