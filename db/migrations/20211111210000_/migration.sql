/*
  Warnings:

  - Made the column `productId` on table `OrderedProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `OrderedProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderedProduct" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "orderId" SET NOT NULL;
