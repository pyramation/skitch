import { InquirerQuestion } from 'skitch-types';
export interface GrantExecuteConfig {
    schema: string;
    table: string;
    procedure: string;
    role: string;
}
export declare const requires: (res: GrantExecuteConfig) => string[][];
export declare const change: ({ schema, table, procedure, role, }: GrantExecuteConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
