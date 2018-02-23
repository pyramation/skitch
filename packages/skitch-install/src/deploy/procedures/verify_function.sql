-- Deploy procedures/verify_function to pg
-- requires: procedures/get_entity_from_str
-- requires: procedures/get_schema_from_str
-- requires: procedures/drop_function
-- requires: procedures/revoke_execute_on_function
-- requires: procedures/grant_execute_on_function

BEGIN;

CREATE FUNCTION verify_function (_name text, _user text)
    RETURNS boolean
AS $$
BEGIN
    IF EXISTS (
            SELECT
                has_function_privilege(_user, p.oid, 'execute')
            FROM
                pg_catalog.pg_proc p
                JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
            WHERE
                n.nspname = get_schema_from_str(_name) AND p.proname = get_entity_from_str(_name)) THEN
            RETURN TRUE;
    ELSE
        RAISE
        EXCEPTION 'Nonexistent function --> %s', _name
            USING HINT = 'Please check';
    END IF;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE;

COMMIT;
