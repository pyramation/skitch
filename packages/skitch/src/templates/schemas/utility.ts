import { change as schema } from './schema'
import { ChangePathArray, InquirerQuestion } from '../../types'

export interface UtilityConfig {
  procedure: string
}

export const requires = (res: UtilityConfig): Array<ChangePathArray> => []

export const change = ({ procedure }: UtilityConfig): ChangePathArray => [
  'procedures',
  procedure
]

const questions: Array<InquirerQuestion> = [
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
