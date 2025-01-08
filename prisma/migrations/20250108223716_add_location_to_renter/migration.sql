/*
  Warnings:

  - Added the required column `latitude` to the `Renter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Renter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Renter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Renter" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reference" TEXT NOT NULL;
