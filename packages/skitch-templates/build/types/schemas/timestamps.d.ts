import { InquirerQuestion } from 'skitch-types';
export interface TimestampsConfig {
    schema: string;
    table: string;
}
export declare const requires: (res: TimestampsConfig) => any[];
export declare const change: ({ schema, table }: TimestampsConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
