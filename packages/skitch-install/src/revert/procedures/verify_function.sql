-- Revert procedures/verify_function from pg

BEGIN;

SELECT drop_function('verify_function');

COMMIT;
