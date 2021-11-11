/*
  Warnings:

  - Added the required column `address` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableFrom` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableTo` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "availableFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "availableTo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0;
