export interface HashObject {
  [key: string]: any
}

import { change as column } from './templates/schemas/column'
import { change as foreignKey } from './templates/schemas/foreignKey'
import { change as grantExecute } from './templates/schemas/grantExecute'
import { change as grantSchema } from './templates/schemas/grantSchema'
import { change as grantTable } from './templates/schemas/grantTable'
import { change as index } from './templates/schemas/index'
import { change as peoplestamps } from './templates/schemas/peoplestamps'
import { change as policy } from './templates/schemas/policy'
import { change as procedure } from './templates/schemas/procedure'
import { change as schema } from './templates/schemas/schema'
import { change as table } from './templates/schemas/table'
import { change as timestamps } from './templates/schemas/timestamps'
import { change as trigger } from './templates/schemas/trigger'
import { change as type } from './templates/schemas/type'
import { change as uniqueIndex } from './templates/schemas/uniqueIndex'
import { change as utility } from './templates/schemas/utility'

const schemas: HashObject = {
  column,
  foreignKey,
  grantExecute,
  grantSchema,
  grantTable,
  index,
  peoplestamps,
  policy,
  procedure,
  schema,
  table,
  timestamps,
  trigger,
  type,
  uniqueIndex,
  utility
}

export default schemas
