/*
  Warnings:

  - Added the required column `verified` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('READ', 'WRITE', 'LOGIN', 'INTERACT');

-- CreateEnum
CREATE TYPE "MutationType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'PUBLISHED', 'UNPUBLISHED');

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "birthday" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "link" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "permissions" "Permissions"[],
ADD COLUMN     "status" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "verified" BOOLEAN NOT NULL,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "avatar" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "media" TEXT[],
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "text" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Interaction" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "share" BOOLEAN NOT NULL,
    "like" BOOLEAN NOT NULL,
    "authorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_fkey" FOREIGN KEY ("id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
