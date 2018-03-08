-- Revert procedures/verify_type from pg

BEGIN;

SELECT drop_function('verify_type');

COMMIT;
