-- Deploy procedures/truncate_tables to pg

BEGIN;

CREATE FUNCTION truncate_tables (ignore_schemas text[])
RETURNS void AS $$
DECLARE
    _sql text;
    _ignore_schemas text[] := ARRAY['information_schema', 'pg_catalog', 'sqitch'] || ignore_schemas;
BEGIN
      SELECT
         string_agg(format('%I.%I', table_schema, table_name), ', ') as table
         FROM   information_schema.tables
         WHERE NOT table_schema = ANY(_ignore_schemas)
	INTO _sql;
	EXECUTE format('TRUNCATE TABLE %s CASCADE', _sql);
END
$$
LANGUAGE plpgsql;

COMMIT;
