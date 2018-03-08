import { change as schema } from './schema'
import { change as table } from './table'
import { searchSchemas } from 'skitch-utils'
import { searchTables } from 'skitch-utils'
import { ChangePathArray, InquirerQuestion } from 'skitch-types'

export interface GrantTableConfig {
  schema: string
  table: string
  actions: Array<string>
  role: string
}

export const requires = (res: GrantTableConfig): Array<ChangePathArray> => [
  schema(res),
  table(res)
]

export const change = ({ schema, table, actions, role }: GrantTableConfig) => [
  'schemas',
  schema,
  'grants',
  'tables',
  table,
  `grant_${actions.join('_')}_to_${role}`.toLowerCase()
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
    type: 'checkbox',
    name: 'actions',
    message: 'choose the actions',
    choices: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    required: true
  },
  {
    type: 'list',
    name: 'role',
    message: 'choose the role',
    choices: ['anonymous_user', 'known_user'],
    required: true
  }
]
export default questions
