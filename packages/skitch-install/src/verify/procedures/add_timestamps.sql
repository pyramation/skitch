-- Verify procedures/add_timestamps on pg

BEGIN;

SELECT
    verify_function ('public.stamp_updated_at_column',
        'postgres');

SELECT
    verify_function ('public.stamp_updated_at_column',
        'postgres');

SELECT
    verify_function ('public.stamp_updated_by_column',
        'postgres');

ROLLBACK;
