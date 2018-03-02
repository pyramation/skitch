import { change as schema } from './schema';
import { change as table } from './table';
import { searchSchemas } from 'skitch-utils';
import { searchTables } from 'skitch-utils';

import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface FixtureConfig {
  schema: string;
  table: string;
  name: string;
}

export const requires = (res: FixtureConfig): Array<ChangePathArray> => [
  schema(res),
  table(res),
];

export const change = ({
  schema,
  table,
  name,
}: FixtureConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'fixtures',
  `${name}`,
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
    name: 'name',
    message: 'enter a name',
    required: true,
  },
];

export default questions;
