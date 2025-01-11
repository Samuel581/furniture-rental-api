/*
  Warnings:

  - Added the required column `type` to the `furniture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "furniture" ADD COLUMN     "color" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;
