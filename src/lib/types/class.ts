import { ClassTypes } from "./classtype";

export type Class = {
    name: string;
    id: string;
    instructorId: string;
    requiredFq: number;
    type: ClassTypes;
}