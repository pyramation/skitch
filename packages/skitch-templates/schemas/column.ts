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
  `alter_table_add_${column}`,
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
    type: 'string',
    name: 'column',
    message: 'enter a column name',
    required: true,
  },
  {
    type: 'string',
    name: 'columntype',
    message: 'enter a column type',
    required: true,
  },
  {
    type: 'list',
    name: 'columnnull',
    message: 'choose a null option',
    choices: ['NOT NULL', 'NULL', { name: '(none)', value: '' }],
    required: true,
  },
];

export default questions;
