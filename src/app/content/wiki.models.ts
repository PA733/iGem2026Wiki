export type WikiCategoryId = 'project' | 'wet-lab' | 'dry-lab' | 'human-practices' | 'team' | 'safety';

export interface WikiSection {
  id: string;
  heading: string;
  paragraphs: string[];
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
  status: 'Project design' | 'Experimental plan' | 'Research plan' | 'Work plan';
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
