-- CreateTable
CREATE TABLE "PooOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "PooOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PooOption" ADD CONSTRAINT "PooOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
