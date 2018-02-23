-- Verify procedures/drop_function  on pg

BEGIN;

DO
$do$
BEGIN
IF NOT EXISTS (
        SELECT
            has_function_privilege('postgres', p.oid, 'execute')
        FROM
            pg_catalog.pg_proc p
            JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
        WHERE
            n.nspname = 'public' AND p.proname = 'drop_function') THEN
        RAISE
        EXCEPTION 'Nonexistent function --> %s', 'drop_function'
            USING HINT = 'Please check';
END IF;
END
$do$;

ROLLBACK;
