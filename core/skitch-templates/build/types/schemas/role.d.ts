import { InquirerQuestion } from 'skitch-types';
export interface RoleConfig {
    role: string;
}
export declare const requires: (res: RoleConfig) => string[][];
export declare const change: ({ role }: RoleConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
