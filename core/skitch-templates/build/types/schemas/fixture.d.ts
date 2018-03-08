import { InquirerQuestion } from 'skitch-types';
export interface FixtureConfig {
    schema: string;
    table: string;
    name: string;
}
export declare const requires: (res: FixtureConfig) => string[][];
export declare const change: ({ schema, table, name, }: FixtureConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
