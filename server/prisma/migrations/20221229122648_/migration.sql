-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
