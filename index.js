import { merge, get } from "lodash"
import { getCurrentInstance} from "vue"
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
    app.mixin({
        mounted() {
            const is$wujie =
                get(this, '$wujie') === true ||
                get(this, '_.exposed.$wujie') === true ||
                get(this, '_.setupState.$wujie') === true
            if (is$wujie && config.child &&  window.__POWERED_BY_WUJIE__) {
                window.__THIS_WUJIE_VIEW_VM__ = this._;
            }
        }
    })
}
export default install
