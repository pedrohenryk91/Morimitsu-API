import { frequency } from "@prisma/client";
import { DefaultRepository } from "./DefaultRepository";

export type CompositeId = {
    student_id: string,
    meeting_id: string,
}

export interface FrequencyRepository extends DefaultRepository<frequency, CompositeId> {
    findByStudentId(id: string): Promise<frequency[]>
    findByMeetingId(id: string): Promise<frequency[]>
}