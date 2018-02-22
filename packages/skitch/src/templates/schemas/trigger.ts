import { change as schema } from './schema'
import { change as table } from './table'
import { searchSchemas } from '../utils/schemas'
import { searchTables } from '../utils/tables'
import { ChangePathArray, InquirerQuestion } from '../../types'

export interface TriggerConfig {
  schema: string
  table: string
  triggername: string
}

export const requires = (res: TriggerConfig): Array<ChangePathArray> => [
  schema(res),
  table(res)
]

export const change = ({
  schema,
  triggername
}: TriggerConfig): ChangePathArray => [
  'schemas',
  schema,
  'triggers',
  triggername
]

const questions: Array<InquirerQuestion> = [
  {
    type: 'autocomplete',
    name: 'schema',
    message: 'enter a schema name',
    source: searchSchemas,
    required: true
  },
  {
    type: 'autocomplete',
    name: 'table',
    message: 'enter a table name',
    source: searchTables,
    required: true
  },
  {
    type: 'string',
    name: 'triggername',
    message: 'enter a trigger name',
    required: true
  },
  {
    type: 'list',
    name: 'when',
    message: 'choose when',
    choices: ['BEFORE', 'AFTER'],
    required: true
  },
  {
    type: 'list',
    name: 'op',
    message: 'choose ops',
    choices: ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'],
    required: true
  }
]

export default questions
