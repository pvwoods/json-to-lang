export module IndentableOutput {

    export enum OutputInstructionType {
        Indent = 0,
        PrintLine,
        IndentableOutput
    }

    export interface OutputInstruction {
        type:OutputInstructionType;
        data:any;
    }

    export class IndentableOutput {
        
        public spacesPerIndent:number = 4;
        
        public _indentation:number = 0; 
        public _rawIndentation:number = 0;
        public get indentation():number {
            return this._indentation;
        }
        public set indentation(v:number) {
            let i:number = this._indentation + v;
            this._rawIndentation += v;
            this.rawOutput.push(<OutputInstruction>{
                type: OutputInstructionType.Indent, 
                data: i
            });
        }
        
        public rawOutput:OutputInstruction[] = [];

        protected _markerToIO:Map<string, IndentableOutput> = new Map<string, IndentableOutput>();

        public get output():string {
            var result:string = "";
            var indent:number = 0;
            for(var instruction of this.rawOutput) {
                switch(instruction.type) {
                    case OutputInstructionType.Indent:
                        indent += instruction.data;
                        break;
                    case OutputInstructionType.PrintLine:
                        result += " ".repeat(indent * this.spacesPerIndent) + instruction.data + "\n";
                        break;
                    case OutputInstructionType.IndentableOutput:
                        result += this._markerToIO.get(instruction.data as string).output;
                }
            }
            return result;
        }
        
        public addLineToOutput(l:String=""):IndentableOutput {
            this.rawOutput.push(<OutputInstruction>{
                type: OutputInstructionType.PrintLine, 
                data: l
            });
            return this;
        }

        public addLineToOutputAtMarker(marker:string, l:String):IndentableOutput {
            var io:IndentableOutput = this._markerToIO.get(marker);
            if(io !== undefined) {
                return io.addLineToOutput(l);
            } else return null;
        }

        public addInsertionMarker(markerName:string):IndentableOutput {
            var io:IndentableOutput = new IndentableOutput();
            io.indentation = this._rawIndentation;
            this._markerToIO.set(markerName, io);
            this.rawOutput.push(<OutputInstruction>{
                type: OutputInstructionType.IndentableOutput, 
                data: markerName
            });
            return this;
        }

        protected mergeInsertionMarker(marker:string, io:IndentableOutput):IndentableOutput {
            this.addInsertionMarker(marker);
            this._markerToIO.set(marker, io);
            return this;
        }
        
        public indent():IndentableOutput {
            this.indentation++;
            return this;
        }
        
        public dedent():IndentableOutput {
            this.indentation--;
            return this;
        }

        public rstrip(char:string):IndentableOutput {
            if(this.rawOutput.length === 0) return;
            var lastNode = this.rawOutput.pop();
            if(
                lastNode.type === OutputInstructionType.PrintLine &&
                lastNode.data.slice(-1) === char
            ) {
                this.addLineToOutput(lastNode.data.substring(0, lastNode.data.length - 1));
            } else {
                this.rawOutput.push(lastNode);
            }
            return this;
        }

        public concat(io:IndentableOutput):IndentableOutput {
            for(var instruction of io.rawOutput) {
                switch(instruction.type) {
                    case OutputInstructionType.Indent:
                        this.indentation = instruction.data;
                        break;
                    case OutputInstructionType.PrintLine:
                        this.addLineToOutput(instruction.data);
                        break;
                    case OutputInstructionType.IndentableOutput:
                        this.mergeInsertionMarker(instruction.data, io.getRawMarker(instruction.data));
                        break;
                }
            }
            return this;
        }

        protected getRawMarker(marker:string):IndentableOutput {
            return this._markerToIO.get(marker);
        }
        
    }
}