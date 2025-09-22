-- CreateTable
CREATE TABLE "public"."admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."teachers" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "phone_number" TEXT,
    "guardian_number" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "frequency" INTEGER NOT NULL,
    "belt_id" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."belt" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "belt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."frequency" (
    "student_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "frequency_pkey" PRIMARY KEY ("student_id","class_id")
);

-- CreateTable
CREATE TABLE "public"."classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL DEFAULT 'no-teacher',

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_classesTostudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_classesTostudents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "teachers_cpf_key" ON "public"."teachers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "students_registration_key" ON "public"."students"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_key" ON "public"."classes"("name");

-- CreateIndex
CREATE INDEX "_classesTostudents_B_index" ON "public"."_classesTostudents"("B");

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_belt_id_fkey" FOREIGN KEY ("belt_id") REFERENCES "public"."belt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_classesTostudents" ADD CONSTRAINT "_classesTostudents_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_classesTostudents" ADD CONSTRAINT "_classesTostudents_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
