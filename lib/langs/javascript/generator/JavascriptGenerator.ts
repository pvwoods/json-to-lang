import { LangGenerator } from '../../base/generator/LangGenerator'
import { JSONTypeTree } from '../../../struct/JSONTypeTree'

class VanillaJavascriptGenerator implements LangGenerator {

    public generate(tree:JSONTypeTree):string {
        return "this.sucks = true;"
    }
    
    public emit():string {
        return this.generate(null);
    }

    public convertToValidVariableName(key:string):string {
        return key;
    }

}

export { VanillaJavascriptGenerator }