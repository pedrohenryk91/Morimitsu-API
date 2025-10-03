/*
  Warnings:

  - The primary key for the `frequency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_id` on the `frequency` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `grade` table. All the data in the column will be lost.
  - Added the required column `meeting_id` to the `frequency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."grade" DROP CONSTRAINT "grade_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."frequency" DROP CONSTRAINT "frequency_pkey",
DROP COLUMN "class_id",
ADD COLUMN     "meeting_id" TEXT NOT NULL,
ADD CONSTRAINT "frequency_pkey" PRIMARY KEY ("student_id", "meeting_id");

-- AlterTable
ALTER TABLE "public"."grade" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "public"."meeting" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "class_id" TEXT NOT NULL DEFAULT 'no-class',

    CONSTRAINT "meeting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."frequency" ADD CONSTRAINT "frequency_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."frequency" ADD CONSTRAINT "frequency_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting" ADD CONSTRAINT "meeting_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."grade"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
