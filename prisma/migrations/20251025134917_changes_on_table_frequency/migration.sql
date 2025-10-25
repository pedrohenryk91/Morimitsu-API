/*
  Warnings:

  - The primary key for the `frequency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `meeting_id` on the `frequency` table. All the data in the column will be lost.
  - You are about to drop the `meeting` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class_id` to the `frequency` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `frequency` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."frequency" DROP CONSTRAINT "frequency_meeting_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."meeting" DROP CONSTRAINT "meeting_class_id_fkey";

-- AlterTable
ALTER TABLE "public"."frequency" DROP CONSTRAINT "frequency_pkey",
DROP COLUMN "meeting_id",
ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "frequency_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."meeting";

-- AddForeignKey
ALTER TABLE "public"."frequency" ADD CONSTRAINT "frequency_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
