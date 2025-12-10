export interface searchStudentParams {
    guardianName?: string,
    phoneNumber?: string,
    nickname?: string,
    fullName?: string,
    minAge?: number,
    maxAge?: number,
    beltId?: string,
    gender?: "man" | "woman",
    cpf?: string,
}