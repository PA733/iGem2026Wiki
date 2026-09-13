export type FoundationArticleKey = 'principles' | 'assistive-technology';

export interface FoundationArticleSection {
  id: string;
  heading?: string;
  level?: 2 | 3 | 4;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
  caption?: string;
  variant?: 'split' | 'assistive-intro' | 'subsections';
  subsections?: Array<{ heading: string; paragraphs: string[] }>;
  snug?: boolean;
}

export interface FoundationArticlePage {
  key: FoundationArticleKey;
  title: string;
  toc: Array<{ label: string; target: string }>;
  sections: FoundationArticleSection[];
  previous: { label: string; href: string };
  next: { label: string; href: string };
}
