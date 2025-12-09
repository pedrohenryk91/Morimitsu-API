import { NODE_ENV } from "../lib/env";

export function isCpfValid(cpf: string): boolean {
    if(NODE_ENV!=="deploy"){
        return true;
    }
    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }

    let sum: number = 0;
    let remainder: number;

    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i), 10) * (10 - i);
    }
    remainder = sum % 11;

    const expectedDV1 = (remainder < 2) ? 0 : 11 - remainder;

    if (expectedDV1 !== parseInt(cleanCPF.charAt(9), 10)) {
        return false;
    }

    sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i), 10) * (11 - i);
    }

    remainder = sum % 11;
    const expectedDV2 = (remainder < 2) ? 0 : 11 - remainder;

    if (expectedDV2 !== parseInt(cleanCPF.charAt(10), 10)) {
        return false;
    }
    return true;
}