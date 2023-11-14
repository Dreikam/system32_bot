/*
  Warnings:

  - You are about to drop the column `messages` on the `Tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GuildToMemberTickets" ADD COLUMN "messages" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "channelId" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tickets" ("channelId", "createdAT", "id", "name") SELECT "channelId", "createdAT", "id", "name" FROM "Tickets";
DROP TABLE "Tickets";
ALTER TABLE "new_Tickets" RENAME TO "Tickets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
