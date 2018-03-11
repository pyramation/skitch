import { change as schema } from './schema';
import { change as table } from './table';
import { searchSchemas } from 'skitch-utils';
import { searchTables } from 'skitch-utils';

import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface ColumnConfig {
  schema: string;
  table: string;
  column: string;
}

export const requires = (res: ColumnConfig): Array<ChangePathArray> => [
  schema(res),
  table(res),
];

export const change = ({
  schema,
  table,
  column,
}: ColumnConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'alterations',
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
