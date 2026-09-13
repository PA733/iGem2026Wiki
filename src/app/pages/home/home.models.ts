export interface MaterialCard {
  title: string;
  description: string;
  art?: string;
  href: string;
  date?: string;
  size?: 'feature' | 'large' | 'small' | 'compact';
}
