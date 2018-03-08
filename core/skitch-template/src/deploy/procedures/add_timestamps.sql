-- Deploy procedures/add_timestamps to pg
-- requires: procedures/verify_function

BEGIN;

CREATE FUNCTION stamp_created_by_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_by = current_setting('jwt.claims.user_id');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE FUNCTION stamp_updated_by_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_by = current_setting('jwt.claims.user_id');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE FUNCTION stamp_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';



COMMIT;
