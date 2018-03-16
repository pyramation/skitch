import { TUtilsConfig } from './types';
export declare function seed({database, host, password, port, user}: TUtilsConfig, path?: string): Promise<{}>;
export declare const setArgs: (config: TUtilsConfig) => string[];
export declare function hotSeed(config: TUtilsConfig, path?: string): Promise<{}>;
export declare function setTemplate(config: TUtilsConfig, template?: string): Promise<{}>;
