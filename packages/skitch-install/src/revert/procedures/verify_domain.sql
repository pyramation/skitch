-- Revert procedures/verify_domain from pg

BEGIN;

SELECT drop_function('public.verify_domain');

COMMIT;
