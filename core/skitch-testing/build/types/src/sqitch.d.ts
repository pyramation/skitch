import { TUtilsConfig } from './types';
export declare function sqitch({database, host, password, port, user}: TUtilsConfig, path?: string, scriptType?: string): Promise<{}>;
export declare function sqitchFast(config: TUtilsConfig, path?: string, scriptType?: string): Promise<void>;
