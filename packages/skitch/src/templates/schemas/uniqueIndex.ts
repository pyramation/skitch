import { change as schema } from './schema'
import { change as table } from './table'
import { searchSchemas } from '../utils/schemas'
import { searchTables } from '../utils/tables'
import { ChangePathArray, InquirerQuestion } from '../../types'

export interface UniqueIndexConfig {
  schema: string
  table: string
  index: string
}

export const requires = (res: UniqueIndexConfig): Array<ChangePathArray> => [
  schema(res),
  table(res)
]

export const change = ({
  schema,
  table,
  index
}: UniqueIndexConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'indexes',
  index
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
    name: 'index',
    message: 'enter an index name',
    required: true
  }
]

export default questions
