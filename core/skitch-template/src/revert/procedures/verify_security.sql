-- Revert procedures/verify_security from pg

BEGIN;

SELECT drop_function('verify_security');

COMMIT;
