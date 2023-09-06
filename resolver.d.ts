export interface Resolver {
    ():ResolverResults
}
export type ResolverResults = Array<(name:string)=> ({name:string, from:string})>
export declare const resolver:Resolver
export default resolver
export {}
