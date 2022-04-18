/*
  Warnings:

  - Added the required column `rolesName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "rolesName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "roles" (
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rolesName_fkey" FOREIGN KEY ("rolesName") REFERENCES "roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
