import { ChangePathArray, InquirerQuestion } from 'skitch-types'

export interface SchemaConfig {
  schema: string
}

export const change = ({ schema }: SchemaConfig): ChangePathArray => [
  'schemas',
  schema,
  'schema'
]

export const requires = (res: SchemaConfig): Array<ChangePathArray> => []

const questions: Array<InquirerQuestion> = [
  {
    type: 'string',
    name: 'schema',
    message: 'enter a schema name',
    required: true
  }
]

export default questions
