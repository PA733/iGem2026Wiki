import { WIKI_ARTICLES, WIKI_CATEGORIES } from '../../content/wiki.data';
import { SearchSuggestion } from './search.models';

/** Build the searchable content from the same data that renders the wiki. */
export const SEARCH_SUGGESTIONS: SearchSuggestion[] = WIKI_CATEGORIES.flatMap((category) => [
  {
    title: category.title,
    subtitle: category.subtitle,
    href: `/${category.id}`,
    category: category.label,
    description: category.description,
    text: [category.description,
      ...category.groups.flatMap((group) => [group.title, group.description ?? ''])].join(' '),
  },
  ...WIKI_ARTICLES.filter((article) => article.category === category.id).map((article) => ({
    title: article.title,
    subtitle: article.subtitle,
    href: `/${article.category}/${article.slug}`,
    category: category.label,
    description: article.description,
    text: [article.description,
      ...article.sections.flatMap((section) => [
        section.heading,
        ...section.paragraphs,
        ...(section.bullets ?? []),
        ...(section.table?.headers ?? []),
        ...(section.table?.rows.flat() ?? []),
        section.note ?? '',
      ])].join(' '),
  })),
]);
