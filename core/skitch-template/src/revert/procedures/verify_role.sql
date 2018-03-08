-- Revert procedures/verify_role from pg

BEGIN;

SELECT drop_function('verify_role');

COMMIT;
