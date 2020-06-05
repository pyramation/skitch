import { InquirerQuestion } from 'skitch-types';
export interface SchemaConfig {
    schema: string;
}
export declare const change: ({ schema }: SchemaConfig) => string[];
export declare const requires: (res: SchemaConfig) => string[][];
declare const questions: Array<InquirerQuestion>;
export default questions;
