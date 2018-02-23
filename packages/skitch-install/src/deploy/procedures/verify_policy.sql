-- Deploy procedures/verify_policy to pg
-- requires: procedures/verify_function

BEGIN;

CREATE FUNCTION verify_policy (_policy text)
    RETURNS boolean
AS $$
BEGIN
    IF EXISTS (
            SELECT
                1
            FROM
                pg_policy
            WHERE
                polname = _policy) THEN
            RETURN TRUE;
    ELSE
        RAISE
        EXCEPTION 'Nonexistent policy --> %s', _policy
            USING HINT = 'Please check';
    END IF;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE;


COMMIT;
