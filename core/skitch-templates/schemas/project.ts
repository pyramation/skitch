import { ChangePathArray, InquirerQuestion } from 'skitch-types'

export interface SchemaConfig {
  refproject: string
  refchange: string
}

export const change = ({ refproject, refchange }: SchemaConfig): ChangePathArray => [
  'projects',
  refproject,
  ...change.split('/')
]

export const requires = (res: SchemaConfig): Array<ChangePathArray> => []

const questions: Array<InquirerQuestion> = [
  {
    type: 'string',
    name: 'refproject',
    message: 'enter a ref project name',
    required: true
  },
  {
    type: 'string',
    name: 'refchange',
    message: 'enter a ref change name',
    required: true
  }
]

export default questions
