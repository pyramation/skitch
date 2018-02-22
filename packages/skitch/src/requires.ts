export interface HashObject {
  [key: string]: any
}

import { requires as column } from './templates/schemas/column'
import { requires as foreignKey } from './templates/schemas/foreignKey'
import { requires as grantExecute } from './templates/schemas/grantExecute'
import { requires as grantSchema } from './templates/schemas/grantSchema'
import { requires as grantTable } from './templates/schemas/grantTable'
import { requires as index } from './templates/schemas/index'
import { requires as peoplestamps } from './templates/schemas/peoplestamps'
import { requires as policy } from './templates/schemas/policy'
import { requires as procedure } from './templates/schemas/procedure'
import { requires as schema } from './templates/schemas/schema'
import { requires as table } from './templates/schemas/table'
import { requires as timestamps } from './templates/schemas/timestamps'
import { requires as trigger } from './templates/schemas/trigger'
import { requires as type } from './templates/schemas/type'
import { requires as uniqueIndex } from './templates/schemas/uniqueIndex'
import { requires as utility } from './templates/schemas/utility'

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
