-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "images" DROP NOT NULL,
ALTER COLUMN "images" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProductSize" ADD COLUMN     "image" TEXT[];
