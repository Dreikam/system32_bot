-- CreateTable
CREATE TABLE "GuildConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logsChannel" TEXT,
    "modRoles" TEXT,
    "ticketChannel" TEXT,
    "ticketSection" TEXT,
    "announcementsChannel" TEXT,
    "welcomeChannel" TEXT
);

-- CreateIndex
CREATE INDEX "GuildConfig_id_idx" ON "GuildConfig"("id");
