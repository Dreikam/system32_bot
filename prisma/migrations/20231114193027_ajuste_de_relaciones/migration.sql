-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "banner" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Members_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Members" ("avatar", "banner", "createdAT", "discordId", "guildId", "id", "name") SELECT "avatar", "banner", "createdAT", "discordId", "guildId", "id", "name" FROM "Members";
DROP TABLE "Members";
ALTER TABLE "new_Members" RENAME TO "Members";
CREATE UNIQUE INDEX "Members_discordId_key" ON "Members"("discordId");
CREATE UNIQUE INDEX "Members_guildId_key" ON "Members"("guildId");
CREATE INDEX "Members_discordId_guildId_idx" ON "Members"("discordId", "guildId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
