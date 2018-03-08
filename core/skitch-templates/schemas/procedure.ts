import { change as schema } from './schema'
import { searchSchemas } from 'skitch-utils'

import { ChangePathArray, InquirerQuestion } from 'skitch-types'

export interface ProcedureConfig {
  schema: string
  procedure: string
}

export const requires = (res: ProcedureConfig): Array<ChangePathArray> => [
  schema(res)
]

export const change = ({
  schema,
  procedure
}: ProcedureConfig): ChangePathArray => [
  'schemas',
  schema,
  'procedures',
  procedure
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
    name: 'procedure',
    message: 'enter a procedure name',
    required: true
  },
  {
    type: 'list',
    name: 'stability',
    message: 'choose the stability',
    choices: ['STABLE', 'VOLATILE', 'IMMUTABLE', 'IMMUTABLE STRICT'],
    required: true
  },
  {
    type: 'list',
    name: 'lang',
    message: 'choose the language',
    choices: ['sql', 'plpgsql', 'plv8'],
    required: true
  }
]

export default questions
