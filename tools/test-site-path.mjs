import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/app/site-path.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } }).outputText;
const { appPath, siteUrl } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
for (const base of ['/', '/lut-china/']) {
  globalThis.document = { baseURI: `https://2026.igem.wiki${base}` };
  for (const path of ['/', '/project', '/team/members/', '/search.html?q=dressing', '/dry-lab/model#results']) {
    assert.equal(siteUrl(path), base.slice(0, -1) + path);
    assert.equal(appPath(siteUrl(path)), path);
    assert.equal(siteUrl(siteUrl(path)), siteUrl(path));
  }
  for (const external of ['https://igem.org/', '//example.com/path', '#section', 'mailto:team@example.com']) {
    assert.equal(siteUrl(external), external);
  }
}
console.log('PASS: root and /lut-china/ path round trips, idempotence, search/hash, external URLs');
