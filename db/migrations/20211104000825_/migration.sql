/*
  Warnings:

  - The `client` column on the `UserPermisions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `product` column on the `UserPermisions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `orders` column on the `UserPermisions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `users` column on the `UserPermisions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserPermisions" DROP COLUMN "client",
ADD COLUMN     "client" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "product",
ADD COLUMN     "product" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "orders",
ADD COLUMN     "orders" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "users",
ADD COLUMN     "users" BOOLEAN NOT NULL DEFAULT false;
