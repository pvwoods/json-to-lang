import { IndentableOutput as iom } from '../../base/output/IndentableOutput';

class PHPClassIndentableOutput extends iom.IndentableOutput {

    static VARIABLE_DECLERATION_MARKER:string = "PHPClassIndentableOutput:VARIABLE_DECLERATION_MARKER:";
    static CONSTRUCTOR_MARKER:string = "PHPClassIndentableOutput:CONSTRUCTOR_MARKER:";

    protected _className:string = "";

    constructor(className:string) {
        super();
        this._className = className;
        this.addLineToOutput(`class ${className} {`).indent().addLineToOutput();
        this.addInsertionMarker(PHPClassIndentableOutput.VARIABLE_DECLERATION_MARKER + className);
        this.addLineToOutput().addLineToOutput(`public static function fromString($jsonString) {`).indent();
        this.addLineToOutput(`return new ${this._className}(json_decode($jsonString));`).dedent().addLineToOutput("}");
        this.addLineToOutput().addLineToOutput("public function __construct($jsonObj) {").indent().addLineToOutput();
        this.addInsertionMarker(PHPClassIndentableOutput.CONSTRUCTOR_MARKER + className);
        this.addLineToOutput().dedent().addLineToOutput("}").dedent().addLineToOutput("}");
    }

    public insertVariableDecleration(l:string):PHPClassIndentableOutput {
        this.addLineToOutputAtMarker(PHPClassIndentableOutput.VARIABLE_DECLERATION_MARKER + this._className, l);
        return this;
    }

    public insertLineAtConstructor(l:string):PHPClassIndentableOutput {
        this.addLineToOutputAtMarker(PHPClassIndentableOutput.CONSTRUCTOR_MARKER + this._className, l);
        return this;
    }


}

export { PHPClassIndentableOutput }