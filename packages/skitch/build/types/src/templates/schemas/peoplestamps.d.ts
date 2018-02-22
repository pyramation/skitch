import { InquirerQuestion } from '../../types';
export interface PeoplestampsConfig {
    schema: string;
    table: string;
}
export declare const requires: (res: PeoplestampsConfig) => string[][];
export declare const change: ({ schema, table }: PeoplestampsConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
