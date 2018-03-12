import { InquirerQuestion } from 'skitch-types';
export interface GrantRoleConfig {
    schema: string;
    table: string;
    actions: Array<string>;
    role: string;
    grantee: string;
}
export declare const requires: (res: GrantRoleConfig) => string[][];
export declare const change: ({ grantee, role }: GrantRoleConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
