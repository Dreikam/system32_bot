/*
  Warnings:

  - You are about to drop the column `guildId` on the `GuildToMemberTickets` table. All the data in the column will be lost.
  - Added the required column `ticketId` to the `MemberGuilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuildToMemberTickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "messages" TEXT,
    "memberId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    CONSTRAINT "GuildToMemberTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GuildToMemberTickets" ("id", "memberId", "messages", "ticketId") SELECT "id", "memberId", "messages", "ticketId" FROM "GuildToMemberTickets";
DROP TABLE "GuildToMemberTickets";
ALTER TABLE "new_GuildToMemberTickets" RENAME TO "GuildToMemberTickets";
CREATE TABLE "new_MemberGuilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MemberGuilds_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MemberGuilds_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members" ("discordId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MemberGuilds_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "GuildToMemberTickets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MemberGuilds" ("createdAt", "guildId", "id", "memberId") SELECT "createdAt", "guildId", "id", "memberId" FROM "MemberGuilds";
DROP TABLE "MemberGuilds";
ALTER TABLE "new_MemberGuilds" RENAME TO "MemberGuilds";
CREATE TABLE "new_Tickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "channelId" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "Tickets_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tickets" ("channelId", "createdAT", "id", "name") SELECT "channelId", "createdAT", "id", "name" FROM "Tickets";
DROP TABLE "Tickets";
ALTER TABLE "new_Tickets" RENAME TO "Tickets";
CREATE UNIQUE INDEX "Tickets_guildId_key" ON "Tickets"("guildId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
