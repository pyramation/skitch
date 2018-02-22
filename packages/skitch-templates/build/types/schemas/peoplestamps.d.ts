import { InquirerQuestion } from 'skitch-types';
export interface PeoplestampsConfig {
    schema: string;
    table: string;
}
export declare const requires: (res: PeoplestampsConfig) => any[];
export declare const change: ({ schema, table }: PeoplestampsConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
