import { InquirerQuestion } from 'skitch-types';
export interface SchemaConfig {
    schema: string;
}
export declare const change: ({ schema }: SchemaConfig) => any;
export declare const requires: (res: SchemaConfig) => any[];
declare const questions: Array<InquirerQuestion>;
export default questions;
