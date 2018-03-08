import { InquirerQuestion } from 'skitch-types';
export interface GrantTableConfig {
    schema: string;
    table: string;
    actions: Array<string>;
    role: string;
}
export declare const requires: (res: GrantTableConfig) => string[][];
export declare const change: ({ schema, table, actions, role }: GrantTableConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
