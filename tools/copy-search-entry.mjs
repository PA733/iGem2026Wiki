import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Angular's application builder emits the browser files below the configured
// output directory.  A static host serves an exact `/search.html` request as
// a file and does not provide the history fallback that `ng serve` provides,
// so keep aliases of the generated entrypoint for every client-side article
// route beside `index.html`.
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputCandidates = [
  resolve(projectRoot, 'dist/material-design-3-clone/browser'),
  resolve(projectRoot, 'dist/material-design-3-clone'),
];

const browserOutput = outputCandidates.find((directory) => existsSync(join(directory, 'index.html')));
if (!browserOutput) {
  console.error('Unable to create search.html: Angular index.html was not found in the build output.');
  process.exitCode = 1;
} else {
  const indexFile = join(browserOutput, 'index.html');
  const aliases = [
    'search.html',
    'foundations/overview/index.html',
    'foundations/overview/principles/index.html',
    'foundations/overview/assistive-technology/index.html',
  ];
  for (const alias of aliases) {
    const destination = join(browserOutput, alias);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(indexFile, destination);
    console.log(`Created ${destination} as a static entrypoint alias.`);
  }
}
