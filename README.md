# wujie-vue
基于 wuejie 封装的vue3组件

## 使用指南

1.主框架业务如果您是使用 `unplugin-vue-components/vite` 插件，可以按需求使用内置的 Resolver

* vite.config.ts
```typescript
import resolver from '@zys/wujie-vue/resolver';
import { defineConfig } from 'vite';
export default defineConfig({
    //...
    plugins:[
        Components({
            resolvers: [
                //....
                resolver()
            ],
        }),
    ]
    //...
})
```

2.主框架业务代码

```vue
<template>
  <wujie-vue :config="config"
             app-type="test"
             @load="load"
  ></wujie-vue>
</template>

<script setup lang="ts">
const config = ref({
  test: {
    appName: 'bpm设计器',
    host: 'http://localhost:8888/#/test',
  },
});
const load = async () => {
};
</script>

<style></style>
```

3.子框架业务代码

* 全局模式，main.ts 注入代码
```vue
import wujie from '@zys/wujie-vue';
app.use(wujie);
```

* 按需使用
```vue
import {setupWujie} from '@zys/wujie-vue';
<script setup lang="ts">
onMounted(()=>{
  setupWujie()
})
</script>
```


## 说明：

1.如果子框架使用无效，请按照以下子业务代码关键代码注入到业务位置：

```typescript
export const setupWujie = function (){
    if (window.__POWERED_BY_WUJIE__) {
        window.__THIS_WUJIE_VIEW_VM__ = getCurrentInstance();
    }
}
onMounted(()=>{
    setupWujie()
})
```


