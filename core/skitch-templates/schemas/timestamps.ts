import { change as schema } from './schema'
import { change as table } from './table'
import { searchSchemas } from 'skitch-utils'
import { searchTables } from 'skitch-utils'
import { ChangePathArray, InquirerQuestion } from 'skitch-types'

export interface TimestampsConfig {
  schema: string
  table: string
}

export const requires = (res: TimestampsConfig): Array<ChangePathArray> => [
  schema(res),
  table(res)
]

export const change = ({
  schema,
  table
}: TimestampsConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'triggers',
  'timestamps'
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
  }
]

export default questions
