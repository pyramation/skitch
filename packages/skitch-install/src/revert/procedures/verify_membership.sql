-- Revert procedures/verify_membership from pg

BEGIN;

SELECT drop_function('list_memberships');
SELECT drop_function('verify_membership');

COMMIT;
