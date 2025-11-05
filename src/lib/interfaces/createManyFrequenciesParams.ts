
export interface StudentData {
    id: string,
    cpf: string,
}
export interface CreateManyFrequenciesParams {
    students_data: StudentData[],
    class_id: string,
    date: Date,
}