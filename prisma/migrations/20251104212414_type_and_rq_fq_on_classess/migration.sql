-- CreateEnum
CREATE TYPE "classtype" AS ENUM ('kids', 'normal', 'mista');

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "rq_fq" INTEGER,
ADD COLUMN     "type" "classtype" NOT NULL DEFAULT 'mista';
