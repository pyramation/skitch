import { change as schema } from './schema'
import { change as table } from './table'
import { searchSchemas } from 'skitch-utils'
import { searchTables } from 'skitch-utils'
import { ChangePathArray, InquirerQuestion } from 'skitch-types'

export interface PolicyConfig {
  schema: string
  table: string
  policy: string
}

export const requires = (res: PolicyConfig): Array<ChangePathArray> => [
  schema(res),
  table(res)
]

export const change = ({
  schema,
  table,
  policy
}: PolicyConfig): ChangePathArray => [
  'schemas',
  schema,
  'tables',
  table,
  'policies',
  policy,
  'policy'
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
    name: 'policy',
    message: 'enter an policy name',
    required: true
  },
  {
    type: 'checkbox',
    name: 'roles',
    message: 'choose the roles',
    choices: ['anonymous_user', 'known_user'],
    required: true
  }
]

export default questions
