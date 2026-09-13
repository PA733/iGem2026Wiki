export interface NavItem {
  /** Stable local category id used to highlight the active navigation item. */
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

