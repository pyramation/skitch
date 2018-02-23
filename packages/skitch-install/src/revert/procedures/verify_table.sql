-- Revert procedures/verify_table from pg

BEGIN;

SELECT drop_function('verify_table');

COMMIT;
