import { TUtilsConfig } from './types';
export declare const setArgs: (config: TUtilsConfig) => string[];
export declare function streamSql(config: TUtilsConfig, sql?: string): Promise<{}>;
export declare function setTemplate(config: TUtilsConfig, template?: string): Promise<void>;
