/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Added the required column `emailVerificationToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotPasswordExpiry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEmailVerified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "avatar" JSONB,
ADD COLUMN     "emailVerificationToken" TEXT NOT NULL,
ADD COLUMN     "forgotPasswordExpiry" TEXT NOT NULL,
ADD COLUMN     "forgotPasswordToken" TEXT NOT NULL,
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL;
