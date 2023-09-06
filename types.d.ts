import {App, DefineComponent} from "vue";
import * as $wujie from "wujie";
import {cacheOptions, startOptions} from "wujie";

declare global {
    interface Window {
        __POWERED_BY_WUJIE__: boolean;
        __THIS_WUJIE_VIEW_VM__:App
        $wujie:typeof $wujie
    }
}
export declare const WujieVue:DefineComponent<
    {
        readonly appType:string
        readonly config:AppTypeMap
    },
    {
        error(data:{
            appInfo:AppTypeMapConfig
            url:string
            err: Error
        }):void
        load(data:{
            appInfo: AppTypeMapConfig
            $wujie:typeof $wujie
            window: Window
            app: App
        }):void
    }
>
export interface AppTypeMap {
    [key: string | number]: AppTypeMapConfig;
}
type AppTypeMapConfig = {
    appName: string;
    host?: string;
    maxTime?: number;
    getUserInfo?(): Promise<string>;
    execFun?(config: AppTypeMapConfig): void;
    config?: cacheOptions;
    startOptions?: startOptions;
};
export interface InstallConfig {
    root:boolean
}
export interface Install {
    (app:App, config?:Partial<InstallConfig>):void
}
export declare const install:Install
export default install
export declare const setupWujie:()=> void
export {}
