import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface RoleConfig {
  role: string;
}

export const requires = (res: RoleConfig): Array<ChangePathArray> => [];

export const change = ({ role }: RoleConfig): ChangePathArray => [
  'roles',
  role,
  'role',
];

const questions: Array<InquirerQuestion> = [
  {
    type: 'string',
    name: 'role',
    message: 'enter a role name',
    required: true,
  },
];

export default questions;
