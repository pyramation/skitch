-- Revert procedures/verify_policy from pg

BEGIN;

SELECT drop_function('verify_policy');

COMMIT;
