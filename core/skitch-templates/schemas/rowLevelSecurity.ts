import { change as schema } from './schema';
import { change as table } from './table';
import { searchSchemas } from 'skitch-utils';
import { searchTables } from 'skitch-utils';

import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface SecurityConfig {
  schema: string;
  table: string;
  column: string;
}

export const requires = (res: SecurityConfig): Array<ChangePathArray> => [
  schema(res),
  table(res),
];

export const change = ({
  schema,
  table,
  column,
}: SecurityConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'policies',
  `enable_row_level_security`,
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
];

export default questions;
