/*
  Warnings:

  - You are about to drop the column `Birthdate` on the `User` table. All the data in the column will be lost.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('draft', 'active', 'inactive');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Birthdate",
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "status" NOT NULL;
