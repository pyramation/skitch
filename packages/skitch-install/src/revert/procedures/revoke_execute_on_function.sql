-- Revert procedures/revoke_execute_on_function from pg

BEGIN;

DROP FUNCTION revoke_execute_on_function (_functionname text, _role text, OUT func_revocations int);

COMMIT;
