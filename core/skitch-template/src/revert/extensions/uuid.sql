-- Revert extensions/uuid from pg

BEGIN;

DROP EXTENSION "uuid-ossp";

COMMIT;
