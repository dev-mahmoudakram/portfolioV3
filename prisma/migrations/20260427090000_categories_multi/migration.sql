-- Add multi-category support to projects
ALTER TABLE "Project"
ADD COLUMN "categories" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

UPDATE "Project"
SET "categories" = ARRAY["category"]
WHERE cardinality("categories") = 0;

-- Add category catalog table for admin CRUD
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

INSERT INTO "Category" ("name")
SELECT DISTINCT "category"
FROM "Project"
WHERE "category" IS NOT NULL AND "category" <> ''
ON CONFLICT ("name") DO NOTHING;
