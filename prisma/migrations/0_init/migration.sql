-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'REVIEWING', 'QUOTED', 'REJECTED');

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "phone" TEXT,
    "countryRegion" TEXT NOT NULL,
    "buyerType" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "quantityRequirement" TEXT NOT NULL,
    "preferredPackaging" TEXT,
    "additionalRequirements" TEXT,
    "message" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

