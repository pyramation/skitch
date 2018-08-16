import { change as schema } from './schema';
import { change as rowLevelSecurity } from './rowLevelSecurity';
import { change as table } from './table';
import { change as role } from './role';
import { searchSchemas, searchTables, searchRoles } from 'skitch-utils';
import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface PolicyConfig {
  schema: string;
  table: string;
  policy: string;
}

export const requires = (res: PolicyConfig): Array<ChangePathArray> => [
  schema(res),
  table(res),
  rowLevelSecurity(res),
];

export const change = ({
  schema,
  table,
  action,
  role,
  policy,
}: PolicyConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'policies',
  policy
];

const questions: Array<InquirerQuestion> = [
  {
    type: 'autocomplete',
    name: 'schema',
    message: 'enter a schema name',
    source: searchSchemas,
    required: true,
  },
  {
    type: 'autocomplete',
    name: 'table',
    message: 'enter a table name',
    source: searchTables,
    required: true,
  },
  {
    type: 'list',
    name: 'action',
    message: 'which action?',
    choices: ['ALL', 'SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    required: true,
  },
  {
    type: 'string',
    name: 'policy',
    message: 'choose a policy name',
    required: true,
    filter: (val) => val.toLowerCase()
  },
  {
    type: 'checkbox',
    name: 'role',
    message: 'choose role (optional)',
    choices: ['authenticated', 'anonymous', 'administrator'],
    required: false,
  }
];

export default questions;
