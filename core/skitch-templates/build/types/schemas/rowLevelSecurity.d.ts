import { InquirerQuestion } from 'skitch-types';
export interface SecurityConfig {
    schema: string;
    table: string;
}
export declare const requires: (res: SecurityConfig) => string[][];
export declare const change: ({ schema, table }: SecurityConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
