/*
  Warnings:

  - You are about to drop the column `Priority` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "Priority",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'medium';
