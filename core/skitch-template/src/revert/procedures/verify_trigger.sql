-- Revert procedures/verify_trigger from pg

BEGIN;

SELECT drop_function('verify_trigger');

COMMIT;
