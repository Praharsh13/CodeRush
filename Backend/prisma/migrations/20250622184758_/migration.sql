/*
  Warnings:

  - The `emailVerificationExpiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `forgotPasswordExpiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerificationExpiry",
ADD COLUMN     "emailVerificationExpiry" TIMESTAMP(3),
DROP COLUMN "forgotPasswordExpiry",
ADD COLUMN     "forgotPasswordExpiry" TIMESTAMP(3);
