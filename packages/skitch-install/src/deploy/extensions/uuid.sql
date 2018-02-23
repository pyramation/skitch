-- Deploy extensions/uuid to pg
BEGIN;

CREATE EXTENSION "uuid-ossp";

COMMIT;

