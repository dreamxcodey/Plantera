/*
  Warnings:

  - You are about to drop the column `image` on the `ProductSize` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductSize" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
