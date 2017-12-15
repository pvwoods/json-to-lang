import { JSONTypeTree } from '../../../struct/JSONTypeTree'

abstract class LangGenerator {

    abstract generate(tree:JSONTypeTree):string;
    abstract emit():string;
    abstract convertToValidVariableName(key:string):string;
    
}

export { LangGenerator }