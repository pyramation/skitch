import { change as schema } from './schema';
import { change as role } from './role';
import { searchSchemas, searchTables, searchRoles } from 'skitch-utils';
import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface GrantAllTables {
  schema: string;
  role: string;
}

export const requires = (res: GrantAllTables): Array<ChangePathArray> => [
  schema(res),
  role(res),
];

export const change = ({ schema, role }: GrantAllTables) => [
  'schemas',
  schema,
  'grants',
  `grant_all_tables_to_${role}`.toLowerCase(),
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
    name: 'role',
    message: 'choose the role',
    source: searchRoles,
    required: true,
  },
];
export default questions;
