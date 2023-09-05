import { getCurrentInstance} from "vue"
import wujieVue from "./wujie-vue.vue"
export const setupWujie = ()=>{
    if (window.__POWERED_BY_WUJIE__) {
        window.__THIS_WUJIE_VIEW_VM__ = getCurrentInstance();
    }
}
export const install = function (app){
    if (window.__POWERED_BY_WUJIE__) {
        window.__THIS_WUJIE_VIEW_VM__ = app;
    }
    app.mixin({
        mounted() {
            if (typeof this.$WUJIE_MOUNTED &&  window.__POWERED_BY_WUJIE__) {
                window.__THIS_WUJIE_VIEW_VM__ = this;
            }
        }
    })
    app.component('wujie-vue', wujieVue)
}
export default install
