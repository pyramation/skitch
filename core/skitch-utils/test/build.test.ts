import { build } from '../src/build';
process.env.SKITCH_PATH = __dirname + '/fixtures/skitch';

const clean = t =>
  t
    .split("\n")
    .map(a => a.trim())
    .filter(a => a)
    .join("\n");

describe('build', () => {
  it('works', async () => {
    const results = await build('secrets');
    expect(clean(results)).toEqual(
      clean(`CREATE EXTENSION IF NOT EXISTS "plpgsql" CASCADE;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp" CASCADE;
    CREATE EXTENSION IF NOT EXISTS "pgcrypto" CASCADE;
    CREATE FUNCTION generate_secret ( len int DEFAULT 32, symbols boolean DEFAULT (FALSE) ) RETURNS text AS $EOFCODE$
    DECLARE
      v_set text;

      v_bytea bytea;
      v_output text;

      x int;
      y int;
      b_index int;
    BEGIN
      v_set = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      v_output = '';
      v_bytea = gen_random_bytes(len);

      IF (symbols IS NOT NULL) THEN
        v_set = v_set || '!@#$%^&*()<>?/[]{},.:;';
      END IF;

      FOR x IN 0 .. len-1 LOOP
        y := get_byte(v_bytea, x);
        b_index := floor(y/255.0 * (length(v_set)-1));
    	  v_output := v_output || substring(v_set from b_index for 1);
      END LOOP;

      RETURN v_output;
    END;
    $EOFCODE$ LANGUAGE plpgsql STABLE;
    CREATE FUNCTION secretfunction (  ) RETURNS int AS $EOFCODE$
      SELECT 1;
    $EOFCODE$ LANGUAGE sql STABLE;`)
    );
  });
});
