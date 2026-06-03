/*
  Warnings:

  - Made the column `full_name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "audit_action" AS ENUM ('create', 'update', 'delete');

-- CreateEnum
CREATE TYPE "entity_type" AS ENUM ('room', 'session', 'event', 'question', 'user');

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "full_name" SET NOT NULL;

-- CreateTable
CREATE TABLE "audit_log" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" "audit_action" NOT NULL,
    "entity_type" "entity_type" NOT NULL,
    "entity_id" TEXT NOT NULL,
    "old_data" JSONB,
    "new_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
