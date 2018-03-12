import { change as schema } from './schema';
import { searchSchemas } from 'skitch-utils';
import { searchRoles } from 'skitch-utils';
import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface GrantSchemaConfig {
  schema: string;
  table: string;
  role: string;
}

export const requires = (res: GrantSchemaConfig): Array<ChangePathArray> => [
  schema(res),
];

export const change = ({
  schema,
  table,
  role,
}: GrantSchemaConfig): ChangePathArray => [
  'schemas',
  schema,
  'grants',
  `grant_schema_to_${role}`,
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
