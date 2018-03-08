-- Revert procedures/verify_index from pg

BEGIN;

SELECT drop_function('list_indexes');
SELECT drop_function('verify_index');

COMMIT;
