/*
  Warnings:

  - Made the column `userId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "userId" SET NOT NULL;
