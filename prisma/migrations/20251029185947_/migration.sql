-- DropForeignKey
ALTER TABLE "public"."frequency" DROP CONSTRAINT "frequency_student_id_fkey";

-- AlterTable
ALTER TABLE "frequency" ALTER COLUMN "student_id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "frequency" ADD CONSTRAINT "frequency_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
