/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[cuil]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LOGISTICS', 'PAYROLL', 'NONE');

-- CreateEnum
CREATE TYPE "Permision" AS ENUM ('ALL', 'CREATE', 'READ', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'NONE';

-- CreateTable
CREATE TABLE "UserPermisions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "client" "Permision"[],
    "product" "Permision"[],
    "orders" "Permision"[],
    "users" "Permision"[],
    "role" "Role" NOT NULL,

    CONSTRAINT "UserPermisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cuil_key" ON "Client"("cuil");
