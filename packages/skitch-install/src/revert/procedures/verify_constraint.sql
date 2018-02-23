-- Revert procedures/verify_constraint from pg

BEGIN;

SELECT drop_function('verify_constraint');

COMMIT;
