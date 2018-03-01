import { transform } from '../index';

describe('transforms', () => {
  it('function', () => {
    const result = transform(`SELECT * FROM original.table;`, {
      schemaname: function(value) {
        if (value === 'original') {
          return 'amazing';
        }
        return value;
      },
    });
    expect(result).toEqual(`SELECT * FROM "amazing" . "table"`);
  });
  it('object', () => {
    const result = transform(`SELECT * FROM original.table;`, {
      schemaname: {
        original: 'amazing',
      },
    });
    expect(result).toEqual(`SELECT * FROM "amazing" . "table"`);
  });
  it('integration', () => {
    const result = transform(
      `CREATE TABLE users_private.user_account (
    user_id uuid PRIMARY KEY REFERENCES users.user (id) ON DELETE CASCADE,
    email text NOT NULL UNIQUE CHECK (email ~* '^.+@.+\..+$'),
    password_hash text NOT NULL
);
`,
      {
        schemaname: {
          users_private: 'customers',
        },
        relname: {
          user_account: 'profile',
        },
      }
    );
    expect(result).toEqual(
      `CREATE TABLE "customers" . "profile" ( "user_id" uuid PRIMARY KEY REFERENCES "users" . "user" ( id ) ON DELETE CASCADE, "email" text NOT NULL UNIQUE CHECK (("email") ~* ('^.+@.+..+$')), "password_hash" text NOT NULL ) ;`
    );
  });
});
