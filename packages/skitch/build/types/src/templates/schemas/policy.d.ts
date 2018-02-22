import { InquirerQuestion } from '../../types';
export interface PolicyConfig {
    schema: string;
    table: string;
    policy: string;
}
export declare const requires: (res: PolicyConfig) => string[][];
export declare const change: ({ schema, table, policy }: PolicyConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
