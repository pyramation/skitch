import { TConfig } from 'pg-promise';
export interface TUtilsConfig extends TConfig {
    template?: string;
}
