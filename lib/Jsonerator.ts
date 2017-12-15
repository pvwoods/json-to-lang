import { JSONTypeTree } from './struct/JSONTypeTree'
import { LangGenerator } from './langs/base/generator/LangGenerator'

class Jsonerator {

    private _typeTree:JSONTypeTree;
    private _generator:LangGenerator;
    private _cache:string;
    private _shouldCache:boolean;

    constructor(json:any, baseClassName:string, generator:LangGenerator, shouldCache:boolean=true) {
        this._cache = "";
        this._typeTree = new JSONTypeTree(json, baseClassName);
        this._generator = generator
        this._shouldCache = shouldCache;

    }

    public get isCaching():boolean {
        return this._shouldCache;
    }

    public get code():string {
        if(!this._shouldCache) return this._generator.generate(this._typeTree);
        if(this._cache === "") {
            this._cache = this._generator.generate(this._typeTree);
        }
        return this._cache;
    }

}

export { Jsonerator }