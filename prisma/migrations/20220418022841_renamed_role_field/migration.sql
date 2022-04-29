/*
  Warnings:

  - You are about to drop the column `rolesName` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rolesName_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "rolesName",
ADD COLUMN     "role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_fkey" FOREIGN KEY ("role") REFERENCES "roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
