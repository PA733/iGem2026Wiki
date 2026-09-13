import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// Generate every static entry directly from the same content index used by
// navigation/search, so a newly added article also works after a direct reload.
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputCandidates = [
  resolve(projectRoot, 'dist/material-design-3-clone/browser'),
  resolve(projectRoot, 'dist/material-design-3-clone'),
];
const browserOutput = outputCandidates.find(directory => existsSync(join(directory, 'index.html')));
if (!browserOutput) throw new Error('Angular index.html was not found in the build output.');
const source = readFileSync(resolve(projectRoot, 'src/app/content/wiki.data.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } }).outputText;
const { WIKI_CATEGORIES, WIKI_ARTICLES, articlePath } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const aliases = [
  'search.html', 'search/index.html', 'get-started/index.html', '404.html',
  ...WIKI_CATEGORIES.map(category => `${category.id}/index.html`),
  ...WIKI_ARTICLES.map(article => `${articlePath(article).replace(/^\//, '')}/index.html`),
];
for (const alias of aliases) {
  const destination = join(browserOutput, alias);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(join(browserOutput, 'index.html'), destination);
}
console.log(`Created ${aliases.length} static entrypoints for LUT-CHINA.`);
