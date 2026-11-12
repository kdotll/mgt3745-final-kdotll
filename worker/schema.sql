-- schema.sql
-- One table, because your HW3 feature stores one kind of thing.
-- A second table is ADR-003 territory.

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  degree TEXT NOT NULL,
  grad_year INTEGER NOT NULL,
  work_auth TEXT NOT NULL,
  relocation TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);