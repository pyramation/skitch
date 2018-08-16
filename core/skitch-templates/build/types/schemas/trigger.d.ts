import { InquirerQuestion } from 'skitch-types';
export interface TriggerConfig {
    schema: string;
    table: string;
    triggername: string;
}
export declare const requires: (res: TriggerConfig) => string[][];
export declare const change: ({ schema, table, triggername }: TriggerConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
