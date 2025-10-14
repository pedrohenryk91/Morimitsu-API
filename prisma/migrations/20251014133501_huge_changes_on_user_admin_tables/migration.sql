/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."roles" AS ENUM ('admin', 'instructor');

-- AlterTable
ALTER TABLE "public"."tb_user" ADD COLUMN     "role" "public"."roles" NOT NULL DEFAULT 'instructor';

-- DropTable
DROP TABLE "public"."admin";
