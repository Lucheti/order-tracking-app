/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cuil` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Product" ("brand", "createdAt", "description", "id", "location", "model", "stock", "updatedAt") SELECT "brand", "createdAt", "description", "id", "location", "model", "stock", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_User" ("createdAt", "email", "hashedPassword", "id", "name", "phone", "role", "surname", "updatedAt") SELECT "createdAt", "email", "hashedPassword", "id", "name", "phone", "role", "surname", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
