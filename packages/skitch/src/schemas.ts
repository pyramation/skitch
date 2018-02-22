export interface HashObject {
  [key: string]: any
}

import { default as column } from './templates/schemas/column'
import { default as foreignKey } from './templates/schemas/foreignKey'
import { default as grantExecute } from './templates/schemas/grantExecute'
import { default as grantSchema } from './templates/schemas/grantSchema'
import { default as grantTable } from './templates/schemas/grantTable'
import { default as index } from './templates/schemas/index'
import { default as peoplestamps } from './templates/schemas/peoplestamps'
import { default as policy } from './templates/schemas/policy'
import { default as procedure } from './templates/schemas/procedure'
import { default as schema } from './templates/schemas/schema'
import { default as table } from './templates/schemas/table'
import { default as timestamps } from './templates/schemas/timestamps'
import { default as trigger } from './templates/schemas/trigger'
import { default as type } from './templates/schemas/type'
import { default as uniqueIndex } from './templates/schemas/uniqueIndex'
import { default as utility } from './templates/schemas/utility'

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
