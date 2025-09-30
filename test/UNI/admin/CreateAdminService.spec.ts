import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAdminRepository } from "../../../src/repositories/inMemory/InMemoryAdminRepository";
import { randomUUID } from "crypto";
import { CreateAdminService } from "../../../src/services/admin/createAdminService";
import { EmailAlreadyInUseError } from "../../../src/errors/emailAlreadyInUseError";

let adminRepo: InMemoryAdminRepository;
let service: CreateAdminService;
describe("Create Admin Tests", ()=>{
    beforeEach(async()=>{
        adminRepo = new InMemoryAdminRepository();
        service = new CreateAdminService(adminRepo);
    });
    it("Should be able to create a admin", async () => {
        const result = await service.execute({
            email:"test@email.com",
            username:"username",
            password:"87654321"
        });
        expect(result?.email).toBe("test@email.com");
    })
    it("Should not create admin if email already in use", async () => {
        await adminRepo.create({
            id:randomUUID(),
            email:"test@email.com",
            username:"username",
            password:"12345678",
        });
        await expect(service.execute({
            email:"test@email.com",
            username:"username",
            password:"12345678",
        })).rejects.toBeInstanceOf(EmailAlreadyInUseError);
    })
})