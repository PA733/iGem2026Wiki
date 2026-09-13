export interface MaterialCard {
  title: string;
  description: string;
  image?: string;
  href: string;
  date?: string;
  size?: 'feature' | 'large' | 'small' | 'compact';
}
