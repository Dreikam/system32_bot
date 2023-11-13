/*
  Warnings:

  - Added the required column `avatar` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberCount` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "memberCount" INTEGER NOT NULL
);
INSERT INTO "new_Guild" ("id", "name") SELECT "id", "name" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
