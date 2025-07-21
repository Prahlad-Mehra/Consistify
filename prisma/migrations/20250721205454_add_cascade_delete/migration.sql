-- DropForeignKey
ALTER TABLE "CompletedCalendarDate" DROP CONSTRAINT "CompletedCalendarDate_parentNote_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_parentNoteId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_parentNoteId_fkey" FOREIGN KEY ("parentNoteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedCalendarDate" ADD CONSTRAINT "CompletedCalendarDate_parentNote_fkey" FOREIGN KEY ("parentNote") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
