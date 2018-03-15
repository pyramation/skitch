-- Revert procedures/truncate_tables from pg

BEGIN;

SELECT drop_function('public.truncate_tables');

COMMIT;
