import { LangGenerator } from '../../base/generator/LangGenerator'
import { IndentableOutput as iom } from '../../base/output/IndentableOutput'
import { JSONTypeTree } from '../../../struct/JSONTypeTree'
import { StringUtils } from '../../../utils/StringUtils'

class JSONGenerator implements LangGenerator {

    private _tree:JSONTypeTree;
    private _classIO:iom.IndentableOutput[];

    constructor() {
        this._classIO = [];
    }

    public generate(tree:JSONTypeTree):string {
        this._tree = tree
        var io:iom.IndentableOutput = new iom.IndentableOutput();
        io.addLineToOutput("{").indent();
        return this._generate_node(this._tree, io).rstrip(",").dedent().addLineToOutput("}").output;
    }

    protected _generate_node(node:JSONTypeTree, io:iom.IndentableOutput, parentIsArray:boolean=false):iom.IndentableOutput {
        if(node.isIterableType) {
            if(node.isArray) {
                return this._generateArray(node, io);
            } else {
                return this._generateObject(node, io);
            }
        } else {
            if(parentIsArray) {
                io.addLineToOutput(
                    this.escapeValue(node.value) + ","
                );
            } else {
                io.addLineToOutput(
                    "\"" + this.convertToValidVariableName(node.key) + 
                    "\": " + this.escapeValue(node.value) + ","
                );
            }
        }

        return io;
    }

    protected _generateArray(node:JSONTypeTree, io:iom.IndentableOutput):iom.IndentableOutput {
        io.addLineToOutput(
            "\"" + this.convertToValidVariableName(node.key) + "\": ["
        ).indent();
        for(var child of node.children) {
            this._generate_node(child, io, true);
        }
        return io.rstrip(",").dedent().addLineToOutput("],");
    }

    protected _generateObject(node:JSONTypeTree, io:iom.IndentableOutput):iom.IndentableOutput {
        io.addLineToOutput(
            "\"" + this.convertToValidVariableName(node.key) + "\": {"
        ).indent();
        for(var child of node.children) {
            this._generate_node(child, io);
        }
        return io.rstrip(",").dedent().addLineToOutput("},");
    }

    public escapeValue(n:any):string {
        return (isNaN(n) && typeof(n) !== "boolean") ? ("\"" + n + "\""):n;
    }

    public emit():string {
        return "";
    }

    public convertToValidVariableName(key:string):string {
        return StringUtils.slugify(key);
    }

}

export { JSONGenerator }