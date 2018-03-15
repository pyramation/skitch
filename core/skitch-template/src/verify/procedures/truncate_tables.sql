-- Verify procedures/truncate_tables on pg

BEGIN;

SELECT
    verify_function ('public.truncate_tables',
        'postgres');

ROLLBACK;
