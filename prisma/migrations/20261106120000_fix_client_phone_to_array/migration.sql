-- `clients.phone` was created as a single TEXT column, but the Prisma schema
-- declares `phone String[]` (a client can have multiple phone numbers). Widen
-- it to TEXT[] to match, wrapping any existing single value into a one-element
-- array.
ALTER TABLE "clients" ALTER COLUMN "phone" SET DATA TYPE TEXT[] USING ARRAY["phone"];
