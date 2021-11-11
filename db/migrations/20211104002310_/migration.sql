/*
  Warnings:

  - You are about to drop the `UserPermisions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserPermisions";

-- CreateTable
CREATE TABLE "UserPermision" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "client" BOOLEAN NOT NULL DEFAULT false,
    "product" BOOLEAN NOT NULL DEFAULT false,
    "orders" BOOLEAN NOT NULL DEFAULT false,
    "users" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL,

    CONSTRAINT "UserPermision_pkey" PRIMARY KEY ("id")
);
