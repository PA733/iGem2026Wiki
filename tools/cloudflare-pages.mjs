import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const account = '59a01eefabdbc9ef0ebadf236bbf3081';
const project = 'igem2026';
const output = 'dist/material-design-3-clone/browser';
const state = join(root, '.cloudflare');
const [action = 'deploy', ...flags] = process.argv.slice(2);
const dryRun = flags.includes('--dry-run');

if (!['login', 'deploy'].includes(action) || flags.some(flag => flag !== '--dry-run') || (action === 'login' && flags.length)) {
  console.error('Usage: node tools/cloudflare-pages.mjs login|deploy [--dry-run]');
  process.exit(1);
}

const env = {
  ...process.env,
  CLOUDFLARE_ACCOUNT_ID: account,
  XDG_CONFIG_HOME: state,
  WRANGLER_LOG_PATH: join(state, 'logs'),
  WRANGLER_SEND_METRICS: 'false',
};
// Only accept an explicitly supplied CLOUDFLARE_API_TOKEN or this project's OAuth login.
for (const key of ['CF_ACCOUNT_ID', 'CF_API_TOKEN', 'CF_API_KEY', 'CF_EMAIL', 'CLOUDFLARE_API_KEY', 'CLOUDFLARE_EMAIL']) {
  delete env[key];
}
if (action === 'login') delete env.CLOUDFLARE_API_TOKEN;

function run(command, args, commandEnv = process.env) {
  const result = spawnSync(command, args, { cwd: root, env: commandEnv, stdio: 'inherit' });
  if (result.error) console.error(result.error.message);
  if (result.error || result.status !== 0) process.exit(result.status || 1);
}

function wrangler(args) {
  // Wrangler 4.63 prefers this legacy directory over XDG_CONFIG_HOME.
  // Refuse that fallback so another account's stored login is never used.
  if (!env.CLOUDFLARE_API_TOKEN && existsSync(join(homedir(), '.wrangler'))) {
    console.error('Wrangler detected ~/.wrangler, which overrides isolated login. Use a CLOUDFLARE_API_TOKEN for the target account, or move the legacy directory before logging in.');
    process.exit(1);
  }
  mkdirSync(state, { recursive: true, mode: 0o700 });
  run('npx', ['--yes', '--package=wrangler@4.63.0', 'wrangler', ...args], env);
}

if (action === 'login') {
  wrangler(['login']);
} else {
  console.log(`Cloudflare account: ${account}\nPages project: ${project}\nProduction branch: main`);
  run('npm', ['run', 'build']);
  if (!existsSync(join(root, output, 'index.html'))) {
    console.error(`Missing build output: ${output}/index.html`);
    process.exit(1);
  }
  const args = ['pages', 'deploy', output, '--project-name', project, '--branch', 'main', '--commit-dirty=true'];
  if (dryRun) {
    console.log(`Build verified. Upload skipped.\nDeployment command: wrangler ${args.join(' ')}`);
  } else {
    wrangler(args);
  }
}
