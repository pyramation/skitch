import { change as schema } from './schema';
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
  role(res),
];

export const change = ({
  schema,
  table,
  action,
  role,
}: PolicyConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'policies',
  `${action}`.toLowerCase(),
  `${role}`.toLowerCase(),
  'policy',
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
  },
  {
    type: 'autocomplete',
    name: 'role',
    message: 'choose a role',
    source: searchRoles,
    required: true,
  },
];

export default questions;
