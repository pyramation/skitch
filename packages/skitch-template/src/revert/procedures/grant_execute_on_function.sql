-- Revert procedures/grant_execute_on_function from pg

BEGIN;

DROP FUNCTION grant_execute_on_function (_functionname text, _role text, OUT func_grants int);

COMMIT;
