-- Revert extensions/pgcrypto from pg

BEGIN;

DROP EXTENSION "pgcrypto";

COMMIT;
