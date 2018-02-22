import { change as schema } from './schema'
import { change as table } from './table'
import { searchSchemas } from '../utils/schemas'
import { searchTables } from '../utils/tables'
import { ChangePathArray, InquirerQuestion } from '../../types'

export interface PeoplestampsConfig {
  schema: string
  table: string
}

export const requires = (res: PeoplestampsConfig): Array<ChangePathArray> => [
  schema(res),
  table(res)
]

export const change = ({
  schema,
  table
}: PeoplestampsConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'triggers',
  'peoplestamps'
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
    type: 'confirm',
    name: 'updated_by',
    message: 'add updated_by trigger?',
    required: true
  }
]
export default questions
