-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false;
