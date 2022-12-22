-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "verified" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Interaction" ALTER COLUMN "share" SET DEFAULT false,
ALTER COLUMN "like" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "media" SET DEFAULT ARRAY[]::TEXT[];
