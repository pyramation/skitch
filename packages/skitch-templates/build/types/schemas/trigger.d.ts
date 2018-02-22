import { InquirerQuestion } from 'skitch-types';
export interface TriggerConfig {
    schema: string;
    table: string;
    triggername: string;
}
export declare const requires: (res: TriggerConfig) => any[];
export declare const change: ({ schema, triggername }: TriggerConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
