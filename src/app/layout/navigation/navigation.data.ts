import type { MobileSubmenuItem, NavItem } from './navigation.models';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'material_design', href: '/', active: true },
  { id: 'get-started', label: 'Get started', icon: 'apps', href: 'https://m3.material.io/get-started' },
  { id: 'develop', label: 'Develop', icon: 'code', href: 'https://m3.material.io/develop', expandable: true },
  { id: 'foundations', label: 'Foundations', icon: 'book', href: 'https://m3.material.io/foundations', expandable: true },
  { id: 'styles', label: 'Styles', icon: 'palette', href: 'https://m3.material.io/styles', expandable: true },
  { id: 'components', label: 'Components', icon: 'add_circle', href: 'https://m3.material.io/components', expandable: true },
  { id: 'blog', label: 'Blog', icon: 'pages', href: 'https://m3.material.io/blog' },
];

/** The mobile source drawer exposes these sections as a second-level menu. */
export const NAVIGATION_SUBMENUS: Record<string, MobileSubmenuItem[]> = {
  Develop: [
    { label: 'Develop overview', href: 'https://m3.material.io/develop' },
    {
      label: 'Android',
      href: 'https://m3.material.io/develop/android',
      children: [
        { label: 'Android Views', href: 'https://m3.material.io/develop/android/mdc-android' },
        { label: 'Jetpack Compose', href: 'https://m3.material.io/develop/android/jetpack-compose' },
      ],
    },
    { label: 'Flutter', href: 'https://m3.material.io/develop/flutter' },
    { label: 'Web', href: 'https://m3.material.io/develop/web' },
  ],
  Foundations: [
    { label: 'Foundations overview', href: 'https://m3.material.io/foundations' },
    {
      label: 'Accessibility',
      href: '/foundations/overview',
      children: [
        { label: 'Overview', href: '/foundations/overview' },
        { label: 'Designing', href: 'https://m3.material.io/foundations/designing' },
        { label: 'Writing and text', href: 'https://m3.material.io/foundations/writing' },
      ],
    },
    { label: 'Building for all', href: 'https://m3.material.io/foundations/building-for-all' },
    {
      label: 'Content design',
      href: 'https://m3.material.io/foundations/content-design',
      children: [
        { label: 'Overview', href: 'https://m3.material.io/foundations/content-design/overview' },
        { label: 'Alt text', href: 'https://m3.material.io/foundations/content-design/alt-text' },
        { label: 'Global writing', href: 'https://m3.material.io/foundations/content-design/global-writing' },
        { label: 'Notifications', href: 'https://m3.material.io/foundations/content-design/notifications' },
        { label: 'Style guide', href: 'https://m3.material.io/foundations/content-design/style-guide' },
      ],
    },
    { label: 'Customizing Material', href: 'https://m3.material.io/foundations/customization' },
    {
      label: 'Devices',
      href: 'https://m3.material.io/foundations/devices',
      children: [
        { label: 'Watches', href: 'https://m3.material.io/foundations/watches' },
        {
          label: 'XR',
          href: 'https://m3.material.io/foundations/xr',
          children: [
            { label: 'Design', href: 'https://m3.material.io/foundations/xr/design' },
            { label: 'Components', href: 'https://m3.material.io/foundations/xr/components' },
          ],
        },
      ],
    },
    { label: 'Design tokens', href: 'https://m3.material.io/foundations/design-tokens' },
    {
      label: 'Interaction',
      href: 'https://m3.material.io/foundations/interaction',
      children: [
        { label: 'Gestures', href: 'https://m3.material.io/foundations/interaction/gestures' },
        { label: 'Inputs', href: 'https://m3.material.io/foundations/interaction/inputs' },
        { label: 'Selection', href: 'https://m3.material.io/foundations/interaction/selection' },
        { label: 'States', href: 'https://m3.material.io/foundations/interaction/states' },
      ],
    },
    {
      label: 'Layout',
      href: 'https://m3.material.io/foundations/layout',
      children: [
        { label: 'Overview', href: 'https://m3.material.io/foundations/layout/layout-overview' },
        { label: 'Scaffold', href: 'https://m3.material.io/foundations/layout/scaffold' },
        { label: 'Grids & spacing', href: 'https://m3.material.io/foundations/layout/grids-spacing' },
        { label: 'Breakpoints', href: 'https://m3.material.io/foundations/layout/breakpoints' },
        { label: 'Bidirectionality & RTL', href: 'https://m3.material.io/foundations/layout/bidirectionality-rtl' },
        { label: 'Canonical examples', href: 'https://m3.material.io/foundations/layout/canonical-examples' },
      ],
    },
    { label: 'Usability', href: 'https://m3.material.io/foundations/usability' },
    { label: 'Material A-Z', href: 'https://m3.material.io/foundations/glossary' },
  ],
  Styles: [
    { label: 'Styles overview', href: 'https://m3.material.io/styles' },
    {
      label: 'Color',
      href: 'https://m3.material.io/styles/color',
      children: [
        { label: 'Color system', href: 'https://m3.material.io/styles/color/system' },
        { label: 'Color roles', href: 'https://m3.material.io/styles/color/roles' },
        {
          label: 'Color schemes',
          href: 'https://m3.material.io/styles/color/choosing-a-scheme',
          children: [
            { label: 'Choosing a scheme', href: 'https://m3.material.io/styles/color/choosing-a-scheme' },
            { label: 'Static', href: 'https://m3.material.io/styles/color/static' },
            { label: 'Dynamic', href: 'https://m3.material.io/styles/color/dynamic' },
          ],
        },
        { label: 'Advanced', href: 'https://m3.material.io/styles/color/advanced' },
        { label: 'Color resources', href: 'https://m3.material.io/styles/color/resources' },
      ],
    },
    { label: 'Elevation', href: 'https://m3.material.io/styles/elevation' },
    { label: 'Icons', href: 'https://m3.material.io/styles/icons' },
    {
      label: 'Motion',
      href: 'https://m3.material.io/styles/motion/overview',
      children: [
        { label: 'Motion physics system', href: 'https://m3.material.io/styles/motion/overview' },
        { label: 'Easing and duration', href: 'https://m3.material.io/styles/motion/easing-and-duration' },
        { label: 'Transitions', href: 'https://m3.material.io/styles/motion/transitions' },
      ],
    },
    { label: 'Shape', href: 'https://m3.material.io/styles/shape' },
    { label: 'Spacing', href: 'https://m3.material.io/styles/spacing' },
    { label: 'Typography', href: 'https://m3.material.io/styles/typography' },
  ],
  Components: [
    { label: 'Components overview', href: 'https://m3.material.io/components' },
    { label: 'App bars', href: 'https://m3.material.io/components/app-bars' },
    { label: 'Badges', href: 'https://m3.material.io/components/badges' },
    {
      label: 'Buttons',
      href: 'https://m3.material.io/components/buttons',
      children: [
        { label: 'All buttons', href: 'https://m3.material.io/components/all-buttons' },
        { label: 'Button groups', href: 'https://m3.material.io/components/button-groups' },
        { label: 'Buttons', href: 'https://m3.material.io/components/buttons' },
        { label: 'Extended FABs', href: 'https://m3.material.io/components/extended-fab' },
        { label: 'FAB menu', href: 'https://m3.material.io/components/fab-menu' },
        { label: 'FABs', href: 'https://m3.material.io/components/floating-action-button' },
        { label: 'Icon buttons', href: 'https://m3.material.io/components/icon-buttons' },
        { label: 'Segmented buttons', href: 'https://m3.material.io/components/segmented-buttons' },
        { label: 'Split button', href: 'https://m3.material.io/components/split-button' },
      ],
    },
    { label: 'Cards', href: 'https://m3.material.io/components/cards' },
    { label: 'Carousel', href: 'https://m3.material.io/components/carousel' },
    { label: 'Checkbox', href: 'https://m3.material.io/components/checkbox' },
    { label: 'Chips', href: 'https://m3.material.io/components/chips' },
    {
      label: 'Date & time pickers',
      href: 'https://m3.material.io/components/date-pickers',
      children: [
        { label: 'Date pickers', href: 'https://m3.material.io/components/date-pickers' },
        { label: 'Time pickers', href: 'https://m3.material.io/components/time-pickers' },
      ],
    },
    { label: 'Dialogs', href: 'https://m3.material.io/components/dialogs' },
    { label: 'Divider', href: 'https://m3.material.io/components/divider' },
    { label: 'Lists', href: 'https://m3.material.io/components/lists' },
    {
      label: 'Loading & progress',
      href: 'https://m3.material.io/components/loading-progress',
      children: [
        { label: 'Loading indicator', href: 'https://m3.material.io/components/loading-indicator' },
        { label: 'Progress indicators', href: 'https://m3.material.io/components/progress-indicators' },
      ],
    },
    { label: 'Menus', href: 'https://m3.material.io/components/menus' },
    {
      label: 'Navigation',
      href: 'https://m3.material.io/components/navigation-bar/overview',
      children: [
        { label: 'Navigation bar', href: 'https://m3.material.io/components/navigation-bar' },
        { label: 'Navigation drawer', href: 'https://m3.material.io/components/navigation-drawer' },
        { label: 'Navigation rail', href: 'https://m3.material.io/components/navigation-rail' },
      ],
    },
    { label: 'Radio button', href: 'https://m3.material.io/components/radio-button' },
    { label: 'Search', href: 'https://m3.material.io/components/search' },
    {
      label: 'Sheets',
      href: 'https://m3.material.io/components/sheets',
      children: [
        { label: 'Bottom sheets', href: 'https://m3.material.io/components/bottom-sheets' },
        { label: 'Side sheets', href: 'https://m3.material.io/components/side-sheets' },
      ],
    },
    { label: 'Sliders', href: 'https://m3.material.io/components/sliders' },
    { label: 'Snackbar', href: 'https://m3.material.io/components/snackbar' },
    { label: 'Switch', href: 'https://m3.material.io/components/switch' },
    { label: 'Tabs', href: 'https://m3.material.io/components/tabs' },
    { label: 'Text fields', href: 'https://m3.material.io/components/text-fields' },
    { label: 'Toolbars', href: 'https://m3.material.io/components/toolbars' },
    { label: 'Tooltips', href: 'https://m3.material.io/components/tooltips' },
  ],
};

