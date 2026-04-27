ALTER TABLE "Project"
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

WITH ranked AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" ASC, "id" ASC) - 1 AS rn
  FROM "Project"
)
UPDATE "Project" p
SET "sortOrder" = r.rn
FROM ranked r
WHERE p."id" = r."id";

CREATE INDEX "Project_sortOrder_idx" ON "Project"("sortOrder");
