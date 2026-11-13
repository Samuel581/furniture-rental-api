-- Align the database with prisma/schema.prisma after `phone` changed
-- from String to String[] without a migration being generated.
-- Wrap existing scalar values into single-element arrays instead of
-- dropping the column, so existing clients keep their phone numbers.
ALTER TABLE "clients" ALTER COLUMN "phone" TYPE TEXT[] USING ARRAY["phone"];

-- Align combos.isActive default with the schema
ALTER TABLE "combos" ALTER COLUMN "isActive" SET DEFAULT true;
