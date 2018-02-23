-- Revert extensions/plv8 from pg

BEGIN;

DROP EXTENSION "plv8";

COMMIT;
