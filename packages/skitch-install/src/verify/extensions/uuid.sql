-- Verify extensions/uuid on pg

BEGIN;

SELECT
    1 / count(*)
FROM
    pg_available_extensions
WHERE
    name = 'uuid-ossp';

ROLLBACK;
