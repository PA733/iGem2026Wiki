export interface NavItem {
  /** Stable section id used by the source navigation's aria-controls links. */
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
  expandable?: boolean;
}

export interface MobileSubmenuItem {
  label: string;
  href: string;
  children?: MobileSubmenuItem[];
}

export interface VisibleMobileSubmenuItem {
  item: MobileSubmenuItem;
  depth: number;
  childStart?: boolean;
  childEnd?: boolean;
}

