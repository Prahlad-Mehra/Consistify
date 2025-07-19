-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkID" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "parentNoteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TEXT NOT NULL DEFAULT '1999-12-30',

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedCalendarDate" (
    "id" SERIAL NOT NULL,
    "parentNote" INTEGER NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "CompletedCalendarDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkID_key" ON "User"("clerkID");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_parentNoteId_fkey" FOREIGN KEY ("parentNoteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedCalendarDate" ADD CONSTRAINT "CompletedCalendarDate_parentNote_fkey" FOREIGN KEY ("parentNote") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
