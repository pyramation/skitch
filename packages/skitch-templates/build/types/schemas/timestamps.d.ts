import { InquirerQuestion } from 'skitch-types';
export interface TimestampsConfig {
    schema: string;
    table: string;
}
export declare const requires: (res: TimestampsConfig) => string[][];
export declare const change: ({ schema, table }: TimestampsConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
