-- CreateTable
CREATE TABLE "GuildChannels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "GuildChannels_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildChannels_channelId_key" ON "GuildChannels"("channelId");

-- CreateIndex
CREATE INDEX "GuildChannels_channelId_idx" ON "GuildChannels"("channelId");
