/*
  Warnings:

  - You are about to drop the column `rq_meetings` on the `belt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."belt" DROP COLUMN "rq_meetings",
ADD COLUMN     "rq_frequency" INTEGER NOT NULL DEFAULT 15;
