-- Revert procedures/verify_view from pg

BEGIN;

SELECT drop_function('public.verify_view');

COMMIT;
