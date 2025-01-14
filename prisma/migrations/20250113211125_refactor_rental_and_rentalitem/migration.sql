/*
  Warnings:

  - You are about to drop the column `dailyRate` on the `rental_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "furniture" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "rental_items" DROP COLUMN "dailyRate";

-- AlterTable
ALTER TABLE "rentals" ALTER COLUMN "depositAmount" DROP NOT NULL;
