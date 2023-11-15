-- CreateTable
CREATE TABLE "Premium" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "redeemedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Premium_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guilds" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Premium_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members" ("discordId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Premium_guildId_key" ON "Premium"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_memberId_key" ON "Premium"("memberId");
