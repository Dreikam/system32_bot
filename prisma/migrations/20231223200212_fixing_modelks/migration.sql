/*
  Warnings:

  - You are about to drop the column `banner` on the `Members` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Members" ("avatar", "createdAT", "discordId", "id", "name") SELECT "avatar", "createdAT", "discordId", "id", "name" FROM "Members";
DROP TABLE "Members";
ALTER TABLE "new_Members" RENAME TO "Members";
CREATE UNIQUE INDEX "Members_discordId_key" ON "Members"("discordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
