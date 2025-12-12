import { randomInt } from "crypto";

export function genSixDigitCode() {
    return randomInt(0, 1000000).toString().padStart(6, "0");
}
