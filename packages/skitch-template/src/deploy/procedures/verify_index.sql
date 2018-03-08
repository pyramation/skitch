-- Deploy procedures/verify_index to pg
-- requires: procedures/get_entity_from_str
-- requires: procedures/get_schema_from_str
-- requires: procedures/verify_function

BEGIN;

CREATE FUNCTION list_indexes (_table text, _index text)
    RETURNS TABLE (schema_name text, table_name text, index_name text)
AS $$
SELECT
    n.nspname::text AS schema_name,
    t.relname::text AS table_name,
    i.relname::text AS index_name
FROM
    pg_class t,
    pg_class i,
    pg_index ix,
    pg_catalog.pg_namespace n
WHERE
    t.oid = ix.indrelid
    AND i.oid = ix.indexrelid
    AND n.oid = i.relnamespace
    AND n.nspname = get_schema_from_str(_table)
    AND i.relname = _index
    AND t.relname = get_entity_from_str(_table);
$$
LANGUAGE 'sql' IMMUTABLE;

CREATE FUNCTION verify_index (_table text, _index text)
    RETURNS boolean
AS $$
BEGIN
    IF EXISTS (
            SELECT
                list_indexes (_table, _index)
              ) THEN
            RETURN TRUE;
    ELSE
        RAISE
        EXCEPTION 'Nonexistent index --> %s', _index
            USING HINT = 'Please check';
    END IF;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE;

COMMIT;
