/*
  Warnings:

  - You are about to drop the column `link` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "link",
ADD COLUMN     "website" TEXT NOT NULL DEFAULT '';
