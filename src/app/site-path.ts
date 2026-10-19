/** Resolve application paths against Angular's configured deployment base. */
export function siteBase(): string {
  return new URL(document.baseURI).pathname.replace(/\/+$/, '');
}

export function appPath(path: string): string {
  const base = siteBase();
  return base && (path === base || path.startsWith(base + '/'))
    ? path.slice(base.length) || '/' : path;
}

export function siteUrl(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return siteBase() + appPath(path);
}
