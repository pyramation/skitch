-- Deploy procedures/get_schema_from_str to pg
-- requires: extensions/plv8

BEGIN;

CREATE FUNCTION get_schema_from_str(
  qualified_name text
) returns text as $$
  var parts = qualified_name.split('.');
  if (parts.length === 1) return 'public';
  return parts[0];
$$
LANGUAGE 'plv8' STABLE;

COMMIT;
