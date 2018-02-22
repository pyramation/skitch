import { InquirerQuestion } from 'skitch-types';
export interface PolicyConfig {
    schema: string;
    table: string;
    policy: string;
}
export declare const requires: (res: PolicyConfig) => any[];
export declare const change: ({ schema, table, policy }: PolicyConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
