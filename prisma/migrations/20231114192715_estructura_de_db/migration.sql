/*
  Warnings:

  - You are about to drop the `Guild` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Guild";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Guilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "memberCount" INTEGER,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "banner" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "messages" TEXT,
    "channelId" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GuildToMemberTickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    CONSTRAINT "GuildToMemberTickets_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GuildToMemberTickets_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GuildToMemberTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Guilds_guildId_key" ON "Guilds"("guildId");

-- CreateIndex
CREATE INDEX "Guilds_guildId_idx" ON "Guilds"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_discordId_key" ON "Members"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_guildId_key" ON "Members"("guildId");

-- CreateIndex
CREATE INDEX "Members_discordId_guildId_idx" ON "Members"("discordId", "guildId");
