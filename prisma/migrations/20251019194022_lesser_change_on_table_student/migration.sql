/*
  Warnings:

  - You are about to drop the column `ifce_registration` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guardian_name]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guardian_name` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."student_ifce_registration_key";

-- AlterTable
ALTER TABLE "public"."student" DROP COLUMN "ifce_registration",
ADD COLUMN     "guardian_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "student_guardian_name_key" ON "public"."student"("guardian_name");
