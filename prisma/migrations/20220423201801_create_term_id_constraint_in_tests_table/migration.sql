-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "termId" INTEGER NOT NULL DEFAULT null;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
