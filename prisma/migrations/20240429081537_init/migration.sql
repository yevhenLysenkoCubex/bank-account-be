-- CreateTable
CREATE TABLE "operations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Money" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1000,

    CONSTRAINT "Money_pkey" PRIMARY KEY ("id")
);
