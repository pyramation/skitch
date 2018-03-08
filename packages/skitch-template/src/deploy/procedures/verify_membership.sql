-- Deploy procedures/verify_membership to pg
-- requires: procedures/verify_function

BEGIN;

CREATE FUNCTION list_memberships (_user text)
    RETURNS TABLE (rolname text)
AS $$ WITH RECURSIVE cte AS (
    SELECT
        oid
    FROM
        pg_roles
    WHERE
        rolname = _user
    UNION ALL
    SELECT
        m.roleid
    FROM
        cte
        JOIN pg_auth_members m ON m.member = cte.oid
)
SELECT
    pg_roles.rolname::text AS rolname
FROM
    cte c,
    pg_roles
WHERE
    pg_roles.oid = c.oid;
$$
LANGUAGE 'sql' IMMUTABLE;

CREATE FUNCTION verify_membership (_user text, _role text)
    RETURNS boolean
AS $$
BEGIN
    IF EXISTS (
            SELECT
                1
            FROM
                list_memberships (_user)
            WHERE
                rolname = _role) THEN
            RETURN TRUE;
    ELSE
        RAISE
        EXCEPTION 'Nonexistent member --> %s', _user
            USING HINT = 'Please check';
    END IF;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE;

COMMIT;