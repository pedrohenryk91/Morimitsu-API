/*
  Warnings:

  - Added the required column `instructor_id` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."classes" ADD COLUMN     "instructor_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."classes" ADD CONSTRAINT "classes_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "public"."tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
