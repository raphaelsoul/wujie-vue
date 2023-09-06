const resolver = function (){
    return [
        name=>{
            if(/^WujieVue|wujie-vue$/.test(name)){
                return {
                    name:'default',
                    from:'@zys/wujie-vue/wujie-vue.vue'
                }
            }
        }
    ]
}
resolver.resolver = resolver
module.exports = resolver
// exports.default = resolver
