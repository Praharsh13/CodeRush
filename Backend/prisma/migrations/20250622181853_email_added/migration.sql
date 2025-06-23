/*
  Warnings:

  - The `forgotPasswordExpiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationExpiry" TIMESTAMP(3),
DROP COLUMN "forgotPasswordExpiry",
ADD COLUMN     "forgotPasswordExpiry" TIMESTAMP(3),
ALTER COLUMN "isEmailVerified" SET DEFAULT false;
