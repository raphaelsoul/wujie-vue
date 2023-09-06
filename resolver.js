const resolver = function (){
    return [
        name=>{
            if(/^WujieVue|wujie-vue$/.test(name)){
                return {
                    name,
                    from:'@zys/wujie-vue'
                }
            }
        }
    ]
}
resolver.resolver = resolver
module.exports = resolver
// exports.default = resolver
