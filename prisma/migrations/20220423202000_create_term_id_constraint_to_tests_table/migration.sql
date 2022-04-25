-- AlterTable
CREATE SEQUENCE "tests_termid_seq";
ALTER TABLE "tests" ALTER COLUMN "termId" SET DEFAULT nextval('tests_termid_seq');
ALTER SEQUENCE "tests_termid_seq" OWNED BY "tests"."termId";
