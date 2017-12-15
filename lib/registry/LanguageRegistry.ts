import { PHPGenerator } from '../langs/php/generator/PHPGenerator';
import { JSONGenerator } from '../langs/json/generator/JSONGenerator';
import { VanillaJavascriptGenerator } from '../langs/javascript/generator/JavascriptGenerator';

const GeneratorRegistry = {
    "PHP": PHPGenerator,
    "JSON": JSONGenerator,
    "Javascript (Vanilla)": VanillaJavascriptGenerator
}

export { GeneratorRegistry }