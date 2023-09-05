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
declare const wujieVue:DefineComponent<
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
export default wujieVue

export {}
