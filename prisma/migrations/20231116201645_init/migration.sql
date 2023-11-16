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
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "banner" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MemberGuilds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MemberGuilds_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MemberGuilds_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members" ("discordId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "channelId" TEXT,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GuildToMemberTickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "messages" TEXT,
    "guildId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    CONSTRAINT "GuildToMemberTickets_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GuildToMemberTickets_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GuildToMemberTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Premium" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "redeemedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Premium_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Premium_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members" ("discordId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Premium_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Tokens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Guilds_guildId_key" ON "Guilds"("guildId");

-- CreateIndex
CREATE INDEX "Guilds_guildId_idx" ON "Guilds"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_discordId_key" ON "Members"("discordId");

-- CreateIndex
CREATE INDEX "Members_discordId_idx" ON "Members"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_guildId_key" ON "Premium"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_memberId_key" ON "Premium"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_tokenId_key" ON "Premium"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_token_key" ON "Tokens"("token");
