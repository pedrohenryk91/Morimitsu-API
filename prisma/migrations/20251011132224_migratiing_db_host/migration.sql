/*
  Warnings:

  - You are about to drop the `_gradeTostudents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `belt_id` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_gradeTostudents" DROP CONSTRAINT "_gradeTostudents_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_gradeTostudents" DROP CONSTRAINT "_gradeTostudents_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."frequency" DROP CONSTRAINT "frequency_student_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."students" DROP CONSTRAINT "students_belt_id_fkey";

-- AlterTable
ALTER TABLE "public"."tb_user" ADD COLUMN     "belt_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_gradeTostudents";

-- DropTable
DROP TABLE "public"."students";

-- CreateTable
CREATE TABLE "public"."student" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "ifce_registration" TEXT NOT NULL,
    "phone_number" TEXT,
    "guardian_number" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "goal_frequency" INTEGER NOT NULL,
    "belt_id" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_gradeTostudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_gradeTostudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_cpf_key" ON "public"."student"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "student_ifce_registration_key" ON "public"."student"("ifce_registration");

-- CreateIndex
CREATE INDEX "_gradeTostudent_B_index" ON "public"."_gradeTostudent"("B");

-- AddForeignKey
ALTER TABLE "public"."tb_user" ADD CONSTRAINT "tb_user_belt_id_fkey" FOREIGN KEY ("belt_id") REFERENCES "public"."belt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."student" ADD CONSTRAINT "student_belt_id_fkey" FOREIGN KEY ("belt_id") REFERENCES "public"."belt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."frequency" ADD CONSTRAINT "frequency_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_gradeTostudent" ADD CONSTRAINT "_gradeTostudent_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_gradeTostudent" ADD CONSTRAINT "_gradeTostudent_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
