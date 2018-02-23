-- Verify extensions/pgcrypto on pg

BEGIN;

SELECT
    1 / count(*)
FROM
    pg_available_extensions
WHERE
    name = 'pgcrypto';

ROLLBACK;
