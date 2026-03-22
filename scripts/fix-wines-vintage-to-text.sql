-- Si la columna `vintage` sigue siendo INTEGER en PostgreSQL y el schema de Prisma
-- la define como String, al guardar un vino obtendrás error 500.
--
-- Opción A (recomendada): desde la raíz del proyecto
--   npx prisma db push
--
-- Opción B: ejecutar este SQL en tu base (una sola vez):

ALTER TABLE "wines"
  ALTER COLUMN "vintage" TYPE TEXT
  USING (
    CASE
      WHEN "vintage" IS NULL THEN NULL
      ELSE "vintage"::text
    END
  );
