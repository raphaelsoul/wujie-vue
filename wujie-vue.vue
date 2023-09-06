<template>
    <div ref="container" class="WujieVueRouterView" />
</template>

<script setup lang="ts">
import { merge, omit } from 'lodash';
import { unref, App, ref, computed, onMounted, onActivated,  onBeforeUnmount, watchEffect} from 'vue';
import {
    setupApp,
    startApp,
    destroyApp,
    cacheOptions,
    startOptions,
    bus,
} from 'wujie';
const emits = defineEmits<{
    (
        e: 'error',
        data: {
            appInfo: unref<typeof appInfo>;
            url: string;
            err: Error;
        }
    ): void;
    (
        e: 'load',
        data: {
            appInfo: unref<typeof appInfo>;
            $wujie;
            window: Window;
            app: App;
        }
    );
}>();
const props = defineProps<{
    config: AppTypeMap;
    appType: any;
}>();
const container = ref();
interface AppTypeMap {
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
const appTypeMap = computed<AppTypeMap>(() => props.config || {});
const appInfo = computed<AppTypeMapConfig>(
    () => appTypeMap.value[props.appType]
);
const appIds = ref<Array<string>>([]);
/**
 * 生成执行脚本
 * @param fn
 */
const getExecFun = (fn: any, initData?: any) => {
    if (['function', 'string'].includes(typeof fn)) {
        return [
            {
                content: `(${fn.toString()})(${JSON.stringify(
                    appInfo.value
                )}, ${JSON.stringify(initData)})`,
            },
        ];
    } else {
        return [];
    }
};
/**
 * 初始化应用
 */
function setupWuJieAppLoad() {
    (function __THIS_WUJIE_VIEW_VM_INIT__() {
        if (window.__THIS_WUJIE_VIEW_VM__ && window.$wujie) {
            window.$wujie.bus.$emit(
                'load',
                window.__THIS_WUJIE_VIEW_VM__,
                window.$wujie,
                window
            );
        } else {
            requestAnimationFrame(__THIS_WUJIE_VIEW_VM_INIT__);
        }
    })();
}

/**
 * 设置用户信息
 */
function setupUserInfo(
    _,
    userInfo: { [s: string]: unknown } | ArrayLike<unknown>
) {
    for (const [key, value] of Object.entries(userInfo || {})) {
        sessionStorage.setItem(key, value as string);
        localStorage.setItem(key, value as string);
    }
}

const setupWuJieApp = async () => {
    if (!appInfo.value?.appName) {
        return;
    }
    const setupAppOptions = merge(
        {
            name: appInfo.value?.appName,
            el: container.value,
            url: appInfo.value.host || '',
            loadError(url, err) {
                emits('error', {
                    appInfo: appInfo.value,
                    url,
                    err,
                });
            },
        },
        omit(merge({}, appInfo.value.config), ['plugins']),
        {
            plugins: [
                {
                    jsBeforeLoaders: getExecFun(
                        setupUserInfo,
                        await appInfo.value.getUserInfo?.()
                    )
                        .concat(getExecFun(setupWuJieAppLoad))
                        .concat(
                            getExecFun(
                                appInfo.value?.execFun
                                    ?.toString?.()
                                    .replace('execFun', 'function')
                            )
                        ),
                },
            ].concat((appInfo.value.config?.plugins || []) as any),
        }
    ) as cacheOptions;
    setupApp(setupAppOptions);
    await startApp(
        merge(
            {
                name: appInfo.value?.appName,
            },
            appInfo.value.startOptions
        ) as startOptions
    );
};
const isMountedHook = ref(false);
const reset = (isMounted: boolean) => {
    isMountedHook.value = isMounted;
    if (isMounted) {
        appIds.value = [];
        bus.$on('load', (app, $wujie, window) => {
            emits('load', {
                appInfo: appInfo.value,
                $wujie,
                window,
                app,
            });
        });
    } else {
        appIds.value.forEach((appId) => {
            destroyApp(appId);
        });
    }
};
onMounted(reset.bind(null, true));
onActivated(reset.bind(null, true));
onBeforeUnmount(reset.bind(null, false));
watchEffect(async () => {
    if (isMountedHook.value && appInfo.value?.appName) {
        appIds.value.push(appInfo.value?.appName);
        await setupWuJieApp();
    }
});
</script>

<style scoped lang="less">
.WujieVueRouterView {
    width: 100%;
    height: 100%;
    :deep(iframe) {
        border: none;
        background-color: transparent;
    }
}
</style>
