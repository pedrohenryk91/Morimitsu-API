-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_instructor_id_fkey";

-- AlterTable
ALTER TABLE "classes" ALTER COLUMN "instructor_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "tb_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
