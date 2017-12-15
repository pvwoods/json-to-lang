enum JSONDataType {
    objectType = 0,
    numberType,
    stringType,
    arrayType,
    booleanType,
    nullType,
    undefinedType
}

class JSONTypeTree {

    private _type:JSONDataType;
    protected _key:string = "Class";
    protected _value:any = null;
    protected _children:JSONTypeTree[] = [];
    protected _inspectArrays:boolean;
    protected _parent:JSONTypeTree;

    public get children():JSONTypeTree[] {
        return this._children;
    }

    public get key():string {
        return this._key;
    }

    public get value():any {
        return this._value;
    }

    public get parent():JSONTypeTree {
        return this._parent;
    }

    public get path():string[] {
        var path:string[] = [];
        var cur:JSONTypeTree = this;
        while(cur !== null) {
            path.push(cur.key);
            cur = cur.parent;
        }
        return path.reverse();
    }

    constructor(node:any, key:string="Class", parent:JSONTypeTree=null) {
        this._type = JSONTypeTree.inferType(node);
        this._parent = parent;
        this._key = key;
        this._value = this.isPrimitiveDataType ? node:null;
        if(this.isIterableType) {
            this.unpackChildren(node, this);
        }
    }

    protected unpackChildren(parentJSONObject:any, parentTreeNode:JSONTypeTree):void {
        switch(this._type) {
            case JSONDataType.objectType:
                for(var key in parentJSONObject) {
                    this._children.push(new JSONTypeTree(parentJSONObject[key], key, parentTreeNode));
                }
                break;
            case JSONDataType.arrayType:
                for(var child of parentJSONObject) {
                    this._children.push(new JSONTypeTree(child, this._key + "__element", parentTreeNode));
                }
                break;
        }
    }

    public get isIterableType():boolean {
        switch(this._type) {
            case JSONDataType.objectType:
            case JSONDataType.arrayType:
                return true;
            default:
                return false;
        }
    }

    public get isArray():boolean {
        return this._type === JSONDataType.arrayType;
    }

    public get isPrimitiveDataType():boolean {
        switch(this._type) {
            case JSONDataType.numberType:
            case JSONDataType.stringType:
            case JSONDataType.booleanType:
                return true;
            default:
                return false;
        }
    }

    public get isLeafNode():boolean {
        return this._children.length == 0;
    }

    private static inferType(node:any):JSONDataType {
        switch(Object.prototype.toString.call(node)) {
            case "[object Array]":
                return JSONDataType.arrayType;
            case "[object Number]":
                return JSONDataType.numberType;
            case "[object Null]":
                return JSONDataType.nullType;
            case "[object Boolean]":
                return JSONDataType.booleanType;
            case "[object String]":
                return JSONDataType.stringType;
            case "[object Object]":
                return JSONDataType.objectType;
            default:
                return JSONDataType.undefinedType;
        }
    }
}

export { JSONTypeTree }