/*
  Warnings:

  - You are about to drop the column `goal_frequency` on the `student` table. All the data in the column will be lost.
  - You are about to drop the `_gradeTostudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gender` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."gender" AS ENUM ('man', 'woman');

-- DropForeignKey
ALTER TABLE "public"."_gradeTostudent" DROP CONSTRAINT "_gradeTostudent_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_gradeTostudent" DROP CONSTRAINT "_gradeTostudent_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."meeting" DROP CONSTRAINT "meeting_class_id_fkey";

-- AlterTable
ALTER TABLE "public"."belt" ADD COLUMN     "rq_meetings" INTEGER NOT NULL DEFAULT 15;

-- AlterTable
ALTER TABLE "public"."student" DROP COLUMN "goal_frequency",
ADD COLUMN     "current_fq" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "public"."gender" NOT NULL;

-- DropTable
DROP TABLE "public"."_gradeTostudent";

-- DropTable
DROP TABLE "public"."grade";

-- CreateTable
CREATE TABLE "public"."classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_classesTostudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_classesTostudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_key" ON "public"."classes"("name");

-- CreateIndex
CREATE INDEX "_classesTostudent_B_index" ON "public"."_classesTostudent"("B");

-- AddForeignKey
ALTER TABLE "public"."meeting" ADD CONSTRAINT "meeting_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_classesTostudent" ADD CONSTRAINT "_classesTostudent_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_classesTostudent" ADD CONSTRAINT "_classesTostudent_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
