/*
  Warnings:

  - You are about to drop the column `title` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `title` to the `Execution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Execution" ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
