import { change as schema } from './schema'
import { searchSchemas } from '../utils/schemas'
import { ChangePathArray, InquirerQuestion } from '../../types'

export interface TableConfig {
  schema: string
  table: string
}

export const requires = (res: TableConfig): Array<ChangePathArray> => [
  schema(res)
]

export const change = ({ schema, table }: TableConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'table'
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
    type: 'string',
    name: 'table',
    message: 'enter a table name',
    required: true
  }
]

export default questions
