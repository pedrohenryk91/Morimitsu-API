export type User = {
    id: string,
    cpf: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string | null,
}

export type InstructorShownData = {
    instructorId: string,
    instructorName: string,
    classes:{
        name: string,
        id: string,
    }[]
}