/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT,
ALTER COLUMN "emailVerificationToken" DROP NOT NULL,
ALTER COLUMN "forgotPasswordExpiry" DROP NOT NULL,
ALTER COLUMN "forgotPasswordToken" DROP NOT NULL,
ALTER COLUMN "isEmailVerified" DROP NOT NULL;
