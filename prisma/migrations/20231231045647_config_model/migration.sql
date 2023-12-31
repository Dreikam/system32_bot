/*
  Warnings:

  - Added the required column `guildId` to the `GuildConfig` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuildConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "logsChannel" TEXT,
    "modRoles" TEXT,
    "ticketChannel" TEXT,
    "ticketSection" TEXT,
    "announcementsChannel" TEXT,
    "welcomeChannel" TEXT,
    CONSTRAINT "GuildConfig_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GuildConfig" ("announcementsChannel", "id", "logsChannel", "modRoles", "ticketChannel", "ticketSection", "welcomeChannel") SELECT "announcementsChannel", "id", "logsChannel", "modRoles", "ticketChannel", "ticketSection", "welcomeChannel" FROM "GuildConfig";
DROP TABLE "GuildConfig";
ALTER TABLE "new_GuildConfig" RENAME TO "GuildConfig";
CREATE UNIQUE INDEX "GuildConfig_guildId_key" ON "GuildConfig"("guildId");
CREATE INDEX "GuildConfig_id_idx" ON "GuildConfig"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
