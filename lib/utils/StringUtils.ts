class StringUtils {

    protected static SPECIAL_CHARACTER_MAP:{ [char:string]:string; } = {
        "!": "bang", "\"":"double_quote", "@": "at", "#":"hash", "$":"dollar",
        "%": "percent", "&": "ampersand", "'":"quote", "(":"left_paren", ")":"right_paren",
        "*":"asterisk", "+":"plus", ",":"comma", "-":"minus", ".":"period", "/":"slash",
        ":":"colon", ";":"semi_colon", "<":"less_than", "greater_than":">", "=":"equal",
        "?":"question_mark", "[":"left_bracket", "]":"right_bracket", "\\":"backslash",
        "^":"caret", "`":"back_tick", "{":"left_brace", "}":"right_brace", "|":"vertical_bar",
        "~":"tilde", "_":"underscore"

    }

    public static mapSpecialCharacters(text:string):string {
        var result:string = "";
        for(var i = 0; i < text.length; i++) {
            if(StringUtils.SPECIAL_CHARACTER_MAP[text[i]] != undefined) {
                result += "_" + StringUtils.SPECIAL_CHARACTER_MAP[text[i]] + "_";
            } else {
                result += text[i];
            }
        }
        return result;
    }

    public static slugify(text:string):string {
        return StringUtils.mapSpecialCharacters(text)
            .replace(/\s+/g, '_')           // Replace spaces with _
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\_\_+/g, '_')         // Replace multiple _ with single _
            .replace(/^_+/, '')             // Trim - from start of text
            .replace(/_+$/, '');            // Trim - from end of text
    }

    public static camelCase(path:string[], lowerCaseStartingCharacter:boolean = true):string {
        return path.join(" ").replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
            return (index == 0 && lowerCaseStartingCharacter) ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

}

export { StringUtils };