/*
  Warnings:

  - You are about to drop the column `userId` on the `Execution` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `Execution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Execution" DROP CONSTRAINT "Execution_userId_fkey";

-- AlterTable
ALTER TABLE "Execution" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Execution" ADD CONSTRAINT "Execution_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
