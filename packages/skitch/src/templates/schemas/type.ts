import { change as schema } from './schema'
import { searchSchemas } from '../utils/schemas'
import { ChangePathArray, InquirerQuestion } from '../../types'

export interface TypeConfig {
  schema: string
  type: string
}

export const requires = (res: TypeConfig): Array<ChangePathArray> => [
  schema(res)
]

export const change = ({ schema, type }: TypeConfig): ChangePathArray => [
  'schemas',
  schema,
  'types',
  type
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
    name: 'type',
    message: 'enter a type name',
    required: true
  }
]

export default questions
