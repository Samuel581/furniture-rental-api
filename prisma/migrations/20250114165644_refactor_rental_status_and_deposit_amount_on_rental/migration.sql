/*
  Warnings:

  - The values [PENDING,ACTIVE] on the enum `RentalStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RentalStatus_new" AS ENUM ('RESERVED', 'DELIVERED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "rentals" ALTER COLUMN "rentalStatus" DROP DEFAULT;
ALTER TABLE "rentals" ALTER COLUMN "rentalStatus" TYPE "RentalStatus_new" USING ("rentalStatus"::text::"RentalStatus_new");
ALTER TYPE "RentalStatus" RENAME TO "RentalStatus_old";
ALTER TYPE "RentalStatus_new" RENAME TO "RentalStatus";
DROP TYPE "RentalStatus_old";
ALTER TABLE "rentals" ALTER COLUMN "rentalStatus" SET DEFAULT 'RESERVED';
COMMIT;

-- AlterTable
ALTER TABLE "rentals" ALTER COLUMN "rentalStatus" SET DEFAULT 'RESERVED',
ALTER COLUMN "depositAmount" SET DEFAULT 0;
