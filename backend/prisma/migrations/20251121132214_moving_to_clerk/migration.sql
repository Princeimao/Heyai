/*
  Warnings:

  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AuthProvider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AuthProvider" DROP CONSTRAINT "AuthProvider_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthdate",
DROP COLUMN "isEmailVerified",
DROP COLUMN "refreshToken",
DROP COLUMN "status";

-- DropTable
DROP TABLE "public"."AuthProvider";

-- DropEnum
DROP TYPE "public"."ProviderType";

-- DropEnum
DROP TYPE "public"."Status";
