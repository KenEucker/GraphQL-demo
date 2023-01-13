/*
  Warnings:

  - You are about to drop the column `authorId` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[creatorId,postId]` on the table `Interaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creatorId,title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "Interaction_authorId_postId_key";

-- DropIndex
DROP INDEX "Post_authorId_title_key";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "authorId",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Author";

-- CreateTable
CREATE TABLE "Creator" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "permissions" "Permissions"[],
    "name" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT NOT NULL DEFAULT '',
    "banner" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "birthday" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_handle_key" ON "Creator"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Interaction_creatorId_postId_key" ON "Interaction"("creatorId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_creatorId_title_key" ON "Post"("creatorId", "title");

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
