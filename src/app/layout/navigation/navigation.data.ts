import type { MobileSubmenuItem, NavItem } from './navigation.models';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', href: '/', active: true },
  { id: 'project', label: 'Project', icon: 'apps', href: '/project', expandable: true },
  { id: 'wet-lab', label: 'Wet lab', icon: 'science', href: '/wet-lab', expandable: true },
  { id: 'dry-lab', label: 'Dry lab', icon: 'code', href: '/dry-lab', expandable: true },
  { id: 'human-practices', label: 'Practices', icon: 'diversity_3', href: '/human-practices', expandable: true },
  { id: 'team', label: 'Team', icon: 'groups', href: '/team', expandable: true },
  { id: 'safety', label: 'Safety', icon: 'verified_user', href: '/safety', expandable: true },
];

/** Local destinations shared by the desktop topic drawer and mobile menu. */
export const NAVIGATION_SUBMENUS: Record<string, MobileSubmenuItem[]> = {
  Project: [
    { label: 'Project overview', href: '/project' },
    { label: 'Description', href: '/project/description' },
    {
      label: 'Design & implementation', href: '/project/design',
      children: [
        { label: 'Design', href: '/project/design' },
        { label: 'Implementation', href: '/project/implementation' },
      ],
    },
    { label: 'Contribution', href: '/project/contribution' },
  ],
  'Wet lab': [
    { label: 'Wet lab overview', href: '/wet-lab' },
    { label: 'Engineering', href: '/wet-lab/engineering' },
    { label: 'Experiments', href: '/wet-lab/experiments' },
    {
      label: 'Parts & results', href: '/wet-lab/parts',
      children: [
        { label: 'Parts', href: '/wet-lab/parts' },
        { label: 'Results', href: '/wet-lab/results' },
      ],
    },
  ],
  'Dry lab': [
    { label: 'Dry lab overview', href: '/dry-lab' },
    { label: 'Model', href: '/dry-lab/model' },
    { label: 'Software', href: '/dry-lab/software' },
  ],
  Practices: [
    { label: 'Human practices overview', href: '/human-practices' },
    { label: 'Integrated human practices', href: '/human-practices/integrated' },
    { label: 'Education', href: '/human-practices/education' },
    { label: 'Collaborations', href: '/human-practices/collaborations' },
  ],
  Team: [
    { label: 'Team overview', href: '/team' },
    { label: 'Members', href: '/team/members' },
    { label: 'Attributions', href: '/team/attributions' },
    { label: 'Notebook', href: '/team/notebook' },
  ],
  Safety: [
    { label: 'Safety overview', href: '/safety' },
    { label: 'Biosafety', href: '/safety/biosafety' },
  ],
};
