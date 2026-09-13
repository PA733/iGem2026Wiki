import { FoundationArticleKey } from './foundation-article.models';

export function foundationArticleKeyForPath(path: string): FoundationArticleKey | null {
  const normalized = path.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  if (normalized === '/foundations/overview' || normalized === '/foundations/overview/principles') {
    return 'principles';
  }
  if (normalized === '/foundations/overview/assistive-technology') {
    return 'assistive-technology';
  }
  return null;
}
