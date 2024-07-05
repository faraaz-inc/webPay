/*
  Warnings:

  - Changed the type of `status` on the `OnRampTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Successful', 'Processing', 'Failed');

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL;

-- DropEnum
DROP TYPE "onRampStatus";

-- CreateTable
CREATE TABLE "p2pTransactions" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "p2pTransactions_id_key" ON "p2pTransactions"("id");

-- AddForeignKey
ALTER TABLE "p2pTransactions" ADD CONSTRAINT "p2pTransactions_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransactions" ADD CONSTRAINT "p2pTransactions_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
