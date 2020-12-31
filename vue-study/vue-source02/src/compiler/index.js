import { parseHtml } from './parse-html';

export function compileToFunctions (html) {
  const ast = parseHtml(html.trim());
  console.log('ast', ast);
}
