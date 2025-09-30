/*
  Warnings:

  - You are about to drop the column `frequency` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `registration` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `teachers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ifce_registration]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal_frequency` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifce_registration` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."colors" AS ENUM ('white', 'white_gray', 'gray', 'gray_black', 'yellow_white', 'yellow', 'yellow_black', 'orange_white', 'orange', 'orange_black', 'green_white', 'green', 'green_black', 'blue', 'purple', 'brown', 'black', 'red');

-- DropForeignKey
ALTER TABLE "public"."classes" DROP CONSTRAINT "classes_teacher_id_fkey";

-- DropIndex
DROP INDEX "public"."students_registration_key";

-- AlterTable
ALTER TABLE "public"."admin" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "frequency",
DROP COLUMN "name",
DROP COLUMN "registration",
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "goal_frequency" INTEGER NOT NULL,
ADD COLUMN     "ifce_registration" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."teachers";

-- CreateTable
CREATE TABLE "public"."announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_user" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_cpf_key" ON "public"."tb_user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "public"."tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "public"."admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "students_ifce_registration_key" ON "public"."students"("ifce_registration");

-- AddForeignKey
ALTER TABLE "public"."classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."tb_user"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
