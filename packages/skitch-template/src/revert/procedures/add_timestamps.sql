-- Revert procedures/add_timestamps from pg

BEGIN;

SELECT drop_function('stamp_updated_at_column');
SELECT drop_function('stamp_created_by_column');
SELECT drop_function('stamp_updated_by_column');

COMMIT;
