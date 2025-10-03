/*
  Warnings:

  - You are about to drop the column `teacher_id` on the `grade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."grade" DROP CONSTRAINT "grade_teacher_id_fkey";

-- AlterTable
ALTER TABLE "public"."grade" DROP COLUMN "teacher_id",
ADD COLUMN     "user_id" TEXT NOT NULL DEFAULT 'no-teacher';

-- AddForeignKey
ALTER TABLE "public"."grade" ADD CONSTRAINT "grade_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."tb_user"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
