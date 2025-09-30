/*
  Warnings:

  - Changed the type of `color` on the `belt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."belt" DROP COLUMN "color",
ADD COLUMN     "color" "public"."colors" NOT NULL;
