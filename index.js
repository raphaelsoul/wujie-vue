import { merge } from "lodash"
import { getCurrentInstance} from "vue"
import WujieVueComponent from "./wujie-vue.vue"
export const WujieVue = WujieVueComponent
export const setupWujie = function (){
    if (window.__POWERED_BY_WUJIE__) {
        window.__THIS_WUJIE_VIEW_VM__ = getCurrentInstance();
    }
}
export const install = function (app, options = {}){
    const config = merge({
        root:true,
        child:true
    }, options)
    if (config.root && window.__POWERED_BY_WUJIE__) {
        window.__THIS_WUJIE_VIEW_VM__ = app;
    }
    app.mixin({
        mounted() {
            if (config.child &&  window.__POWERED_BY_WUJIE__) {
                window.__THIS_WUJIE_VIEW_VM__ = this;
            }
        }
    })
    app.component('WujieVue', WujieVueComponent)
}
export default install
