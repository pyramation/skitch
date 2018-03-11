import * as shell from 'shelljs';
import { prompt } from 'inquirerer';
const pgPromise = require('pg-promise');

const policies = `SELECT
  CONCAT(n.nspname, '.', c.relname) AS tablename,
  pol.polname AS policyname
  FROM pg_policy pol
  JOIN pg_class c ON c.oid = pol.polrelid
  LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
`;

const grants = `SELECT
  grantee, privilege_type, table_schema, table_name
  FROM information_schema.role_table_grants
  WHERE grantee != 'postgres'
  AND grantee != 'PUBLIC'
  ORDER BY table_schema, table_name
`;

const anonymous = `SELECT
  grantee, privilege_type, table_schema, table_name
  FROM information_schema.role_table_grants
  WHERE grantee = 'anonymous_user'
  ORDER BY table_schema, table_name
`;

const tables = `SELECT
  CONCAT(table_schema, '.', table_name) AS tbl
  FROM information_schema.tables
  WHERE table_schema != 'pg_catalog'
  AND table_schema != 'sqitch'
  AND table_schema != 'information_schema'
  ORDER BY table_schema, table_name
`;

const security = `SELECT
  CONCAT(relname, '.', n.nspname), 'enabled'::TEXT AS tablename
	FROM pg_class p
	JOIN pg_catalog.pg_namespace n ON n.oid = p.relnamespace
	WHERE relrowsecurity = 'true'
`;

const QUERIES = {
  policies,
  roles: `SELECT rolname FROM pg_roles`,
  schemas: `SELECT * FROM pg_catalog.pg_namespace`,
  grants,
  tables,
  security,
  anonymous,
};

const questions = [
  {
    _: true,
    name: 'db',
    message: 'database',
    required: true,
  },
  {
    _: true,
    type: 'list',
    name: 'query',
    message: 'choose a query',
    choices: Object.keys(QUERIES),
    required: true,
  },
];

export default async argv => {
  try {
    const { db, query } = await prompt(questions, argv);

    const initOptions = {
      /* initialization options */
    };
    const pgp = pgPromise(initOptions);
    const cn = {
      host: 'localhost',
      port: 5432,
      database: db,
      user: 'postgres',
      password: '',
    };

    const d = pgp(cn); // database instance;

    console.log(query);
    const result = await d.any(QUERIES[query]);

    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  }
  pgp.end();
};
