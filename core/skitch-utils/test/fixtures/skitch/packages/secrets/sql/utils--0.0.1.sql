\echo Use "CREATE EXTENSION utils" to load this file. \quit
CREATE FUNCTION secretfunction (  ) RETURNS int AS $EOFCODE$
  SELECT 1;
$EOFCODE$ LANGUAGE sql STABLE;