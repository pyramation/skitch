import { change as schema } from './schema'
import { searchSchemas } from 'skitch-utils'
import { ChangePathArray, InquirerQuestion } from 'skitch-types'

export interface ViewConfig {
  schema: string
  view: string
}

export const requires = (res: ViewConfig): Array<ChangePathArray> => [
  schema(res)
]

export const change = ({ schema, view }: ViewConfig): ChangePathArray => [
  'schemas',
  schema,
  'views',
  view,
  'view'
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
    name: 'view',
    message: 'enter a view name',
    required: true
  }
]

export default questions
