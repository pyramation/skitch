-- Revert procedures/verify_schema from pg

BEGIN;

SELECT drop_function('verify_schema');

COMMIT;
