-- Revert procedures/drop_function from pg

BEGIN;

DROP FUNCTION drop_function(_functionname text, OUT func_drops int);

COMMIT;
