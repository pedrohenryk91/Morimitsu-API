/*
  Warnings:

  - A unique constraint covering the columns `[id,cpf]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `student_cpf` to the `frequency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."frequency" DROP CONSTRAINT "frequency_student_id_fkey";

-- AlterTable
ALTER TABLE "frequency" ADD COLUMN     "student_cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "student_id_cpf_key" ON "student"("id", "cpf");

-- AddForeignKey
ALTER TABLE "frequency" ADD CONSTRAINT "frequency_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
