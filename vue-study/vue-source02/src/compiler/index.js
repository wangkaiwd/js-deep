import { parseHtml } from './parse-html';
import { generate } from './generate';


export function compileToFunctions (html) {
  const ast = parseHtml(html.trim());
  const code = generate(ast);
}
