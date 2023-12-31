/*
  Warnings:

  - Made the column `announcementsChannel` on table `GuildConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logsChannel` on table `GuildConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `modRoles` on table `GuildConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ticketChannel` on table `GuildConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ticketSection` on table `GuildConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `welcomeChannel` on table `GuildConfig` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuildConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "logsChannel" TEXT NOT NULL,
    "modRoles" TEXT NOT NULL,
    "ticketChannel" TEXT NOT NULL,
    "ticketSection" TEXT NOT NULL,
    "announcementsChannel" TEXT NOT NULL,
    "welcomeChannel" TEXT NOT NULL,
    CONSTRAINT "GuildConfig_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GuildConfig" ("announcementsChannel", "guildId", "id", "logsChannel", "modRoles", "ticketChannel", "ticketSection", "welcomeChannel") SELECT "announcementsChannel", "guildId", "id", "logsChannel", "modRoles", "ticketChannel", "ticketSection", "welcomeChannel" FROM "GuildConfig";
DROP TABLE "GuildConfig";
ALTER TABLE "new_GuildConfig" RENAME TO "GuildConfig";
CREATE UNIQUE INDEX "GuildConfig_guildId_key" ON "GuildConfig"("guildId");
CREATE INDEX "GuildConfig_id_idx" ON "GuildConfig"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
