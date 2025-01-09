/*
  Warnings:

  - You are about to drop the `Combo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComboItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Furniture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rental` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RentalItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Renter` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "ComboItem" DROP CONSTRAINT "ComboItem_comboId_fkey";

-- DropForeignKey
ALTER TABLE "ComboItem" DROP CONSTRAINT "ComboItem_furnitureId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_renterId_fkey";

-- DropForeignKey
ALTER TABLE "RentalItem" DROP CONSTRAINT "RentalItem_comboId_fkey";

-- DropForeignKey
ALTER TABLE "RentalItem" DROP CONSTRAINT "RentalItem_furnitureId_fkey";

-- DropForeignKey
ALTER TABLE "RentalItem" DROP CONSTRAINT "RentalItem_rentalId_fkey";

-- DropTable
DROP TABLE "Combo";

-- DropTable
DROP TABLE "ComboItem";

-- DropTable
DROP TABLE "Furniture";

-- DropTable
DROP TABLE "Rental";

-- DropTable
DROP TABLE "RentalItem";

-- DropTable
DROP TABLE "Renter";

-- CreateTable
CREATE TABLE "furniture" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "dailyRate" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "furniture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dailyRate" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "combos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combo_furniture" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "comboId" TEXT NOT NULL,
    "furnitureId" TEXT NOT NULL,

    CONSTRAINT "combo_furniture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "addressReference" TEXT NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rentals" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "rentalStatus" "RentalStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "depositAmount" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "secondaryDeliveryAddress" TEXT,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_items" (
    "id" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dailyRate" DECIMAL(10,2) NOT NULL,
    "furnitureId" TEXT,
    "comboId" TEXT,

    CONSTRAINT "rental_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "combo_furniture" ADD CONSTRAINT "combo_furniture_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "combos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combo_furniture" ADD CONSTRAINT "combo_furniture_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "furniture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_items" ADD CONSTRAINT "rental_items_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_items" ADD CONSTRAINT "rental_items_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "furniture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_items" ADD CONSTRAINT "rental_items_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "combos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
