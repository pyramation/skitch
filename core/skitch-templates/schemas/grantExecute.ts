import { change as schema } from './schema';
import { change as procedure } from './procedure';
import { searchSchemas } from 'skitch-utils';
import { searchProcedures } from 'skitch-utils';
import { searchRoles } from 'skitch-utils';
import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface GrantExecuteConfig {
  schema: string;
  table: string;
  procedure: string;
  role: string;
}

export const requires = (res: GrantExecuteConfig): Array<ChangePathArray> => [
  schema(res),
  procedure(res),
];

export const change = ({
  schema,
  table,
  procedure,
  role,
}: GrantExecuteConfig): ChangePathArray => [
  'schemas',
  schema,
  'grants',
  'procedures',
  procedure,
  `grant_execute_to_${role}`,
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
    name: 'procedure',
    message: 'enter a procedure name',
    source: searchProcedures,
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
