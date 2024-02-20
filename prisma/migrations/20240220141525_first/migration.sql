-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "serialQuest" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);
