import { change as role } from './role';
import { searchSchemas } from 'skitch-utils';
import { searchRoles } from 'skitch-utils';
import { searchTables } from 'skitch-utils';
import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface GrantRoleConfig {
  schema: string;
  table: string;
  actions: Array<string>;
  role: string;
  grantee: string;
}

export const requires = (res: GrantRoleConfig): Array<ChangePathArray> => [
  role({ role: res.role }),
  role({ role: res.grantee }),
];

export const change = ({ grantee, role }: GrantRoleConfig) => [
  'roles',
  grantee,
  'grants',
  role,
];

const questions: Array<InquirerQuestion> = [
  {
    type: 'autocomplete',
    name: 'role',
    message: 'choose the role to grant',
    source: searchRoles,
    required: true,
  },
  {
    type: 'autocomplete',
    name: 'grantee',
    message: 'choose the role to grant to',
    source: searchRoles,
    required: true,
  },
];
export default questions;
