/*
  Warnings:

  - You are about to drop the `announcement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "announcement";

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "date" TIMESTAMP(3),
    "to" "roles" NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);
