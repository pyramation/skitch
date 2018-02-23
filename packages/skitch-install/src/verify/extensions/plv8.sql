-- Verify extensions/plv8 on pg

BEGIN;

SELECT
    1 / count(*)
FROM
    pg_available_extensions
WHERE
    name = 'plv8';

ROLLBACK;
