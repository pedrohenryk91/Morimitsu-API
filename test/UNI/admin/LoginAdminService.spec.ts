import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAdminRepository } from "../../../src/repositories/inMemory/InMemoryAdminRepository";
import { LoginAdminService } from "../../../src/services/admin/loginAdminService";
import { IncorrectPasswordError } from "../../../src/errors/passwordIncorrectError";
import { EntityNotFoundError } from "../../../src/errors/entityNotFoundError";

let adminRepo: InMemoryAdminRepository;
let service: LoginAdminService;
describe("Login Admin Tests", () => {
    beforeEach(async()=>{
        adminRepo = new InMemoryAdminRepository();
        service = new LoginAdminService(adminRepo);
        await adminRepo.create({
            email:"test@email.com",
            username:"username",
            password:"123456",
        });
    });
    it("Should be able to login the admin", async () => {
        const result = await service.execute({
            email:"test@email.com",
            password:"123456",
        });
        expect(result.username).toBe("username");
    });
    it("Should not pass wrong passwords", async () => {
        await expect(service.execute({
            email:"test@email.com",
            password:"",
        })).rejects.toBeInstanceOf(IncorrectPasswordError);
    });
    it("Should reject emails not registered", async () => {
        await expect(service.execute({
            email:"aaaa@email.com",
            password:"",
        })).rejects.toBeInstanceOf(EntityNotFoundError);
    });
});