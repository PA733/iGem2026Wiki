export type WikiCategoryId = 'project' | 'wet-lab' | 'dry-lab' | 'human-practices' | 'team' | 'safety';

export interface WikiSection {
  id: string;
  heading: string;
  paragraphs: string[];
  /** Imported article body; rendered through Angular's HTML sanitizer. */
  contentHtml?: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  note?: string;
}

export interface WikiArticle {
  slug: string;
  category: WikiCategoryId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  art: string;
  status: 'Project design' | 'Experimental plan' | 'Research plan' | 'Work plan' | 'Models & validation' | 'Entrepreneurship' | 'Our team' | 'Open-source tool';
  sections: WikiSection[];
}

export interface WikiCategory {
  id: WikiCategoryId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  art: string;
  groups: { title: string; description?: string; slugs: string[] }[];
}
