/*
  Warnings:

  - Added the required column `token` to the `Premium` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Premium" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "redeemedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Premium_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Premium_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members" ("discordId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Premium" ("guildId", "id", "memberId", "redeemedOn") SELECT "guildId", "id", "memberId", "redeemedOn" FROM "Premium";
DROP TABLE "Premium";
ALTER TABLE "new_Premium" RENAME TO "Premium";
CREATE UNIQUE INDEX "Premium_guildId_key" ON "Premium"("guildId");
CREATE UNIQUE INDEX "Premium_memberId_key" ON "Premium"("memberId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
