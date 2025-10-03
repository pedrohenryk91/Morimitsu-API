/*
  Warnings:

  - You are about to drop the `_classesTostudents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_classesTostudents" DROP CONSTRAINT "_classesTostudents_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_classesTostudents" DROP CONSTRAINT "_classesTostudents_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."classes" DROP CONSTRAINT "classes_teacher_id_fkey";

-- DropTable
DROP TABLE "public"."_classesTostudents";

-- DropTable
DROP TABLE "public"."classes";

-- CreateTable
CREATE TABLE "public"."grade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL DEFAULT 'no-teacher',

    CONSTRAINT "grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_gradeTostudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_gradeTostudents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "grade_name_key" ON "public"."grade"("name");

-- CreateIndex
CREATE INDEX "_gradeTostudents_B_index" ON "public"."_gradeTostudents"("B");

-- AddForeignKey
ALTER TABLE "public"."grade" ADD CONSTRAINT "grade_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."tb_user"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_gradeTostudents" ADD CONSTRAINT "_gradeTostudents_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_gradeTostudents" ADD CONSTRAINT "_gradeTostudents_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
