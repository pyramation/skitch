-- Revert procedures/verify_table_grant from pg

BEGIN;

SELECT drop_function('verify_table_grant');

COMMIT;
