import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

interface NavItem {
  /** Stable section id used by the source navigation's aria-controls links. */
  id: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
  expandable?: boolean;
}

interface MobileSubmenuItem {
  label: string;
  href: string;
  children?: MobileSubmenuItem[];
}

interface VisibleMobileSubmenuItem {
  item: MobileSubmenuItem;
  depth: number;
  childStart?: boolean;
  childEnd?: boolean;
}

interface MaterialCard {
  title: string;
  description: string;
  image?: string;
  href: string;
  date?: string;
  size?: 'feature' | 'large' | 'small' | 'compact';
}

interface SearchSuggestion {
  title: string;
  href: string;
  category: string;
}

type FoundationArticleKey = 'principles' | 'assistive-technology';

interface FoundationArticleSection {
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

interface FoundationArticlePage {
  key: FoundationArticleKey;
  title: string;
  toc: Array<{ label: string; target: string }>;
  sections: FoundationArticleSection[];
  previous: { label: string; href: string };
  next: { label: string; href: string };
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @ViewChild('heroVideo') private heroVideo?: ElementRef<HTMLVideoElement>;
  @ViewChild('pageContent') private pageContent?: ElementRef<HTMLElement>;
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  readonly navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'material_design', href: '/', active: true },
    { id: 'get-started', label: 'Get started', icon: 'apps', href: 'https://m3.material.io/get-started' },
    { id: 'develop', label: 'Develop', icon: 'code', href: 'https://m3.material.io/develop', expandable: true },
    { id: 'foundations', label: 'Foundations', icon: 'book', href: 'https://m3.material.io/foundations', expandable: true },
    { id: 'styles', label: 'Styles', icon: 'palette', href: 'https://m3.material.io/styles', expandable: true },
    { id: 'components', label: 'Components', icon: 'add_circle', href: 'https://m3.material.io/components', expandable: true },
    { id: 'blog', label: 'Blog', icon: 'pages', href: 'https://m3.material.io/blog' },
  ];

  /** The mobile source drawer exposes these sections as a second-level menu. */
  readonly mobileSubmenus: Record<string, MobileSubmenuItem[]> = {
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

  readonly ioCards: MaterialCard[] = [
    {
      title: 'What’s new at Google I/O 2026',
      description: 'Material’s latest updates make it easier to create expressive, adaptive products',
      image: 'assets/card-io26.png',
      href: 'https://m3.material.io/blog/whats-new-at-io26?utm_source=homepage&utm_medium=referral&utm_campaign=IO26',
      date: 'May 19, 2026',
      size: 'feature',
    },
    {
      title: 'Material Android is Compose-first',
      description: 'Start migrating to Compose to get the latest from Material',
      image: 'assets/card-compose-first.png',
      href: 'https://m3.material.io/blog/material-is-compose-first?utm_source=homepage&utm_medium=referral&utm_campaign=IO26',
      date: 'May 19, 2026',
      size: 'large',
    },
    {
      title: 'Google I/O 2026',
      description: 'Check out all the announcements, keynotes, sessions, and fireside chats on the main site for Google I/O 2026',
      image: 'assets/card-google-io-2026.png',
      href: 'https://io.google/2026/',
      size: 'large',
    },
  ];

  readonly expressiveIntroCards: MaterialCard[] = [
    {
      title: 'Updated: Figma M3 Design Kit',
      description: 'Quickly create design mockups and prototypes with the latest Material 3 Expressive components and styles',
      image: 'assets/card-figma-design-kit.png',
      href: 'https://www.figma.com/community/file/1035203688168086460',
      size: 'large',
    },
    {
      title: 'New: Motion physics',
      description: 'Easier-to-implement motion system for more customizable transitions—powered by tokens',
      image: 'assets/card-motion-physics.png',
      href: 'https://m3.material.io/styles/motion/overview?utm_source=homepage&utm_medium=referral&utm_campaign=IO25',
      size: 'large',
    },
    {
      title: 'Expanded: Shape library',
      description: 'New set of 35 shapes to add decorative visual elements, with built-in shape morph motion',
      image: 'assets/card-shape-library.png',
      href: 'https://m3.material.io/styles/shape/overview-principles?utm_source=homepage&utm_medium=referral&utm_campaign=IO25',
      size: 'small',
    },
    {
      title: 'Blog: Guide to our latest update',
      description: 'Get a full introduction to the latest evolution of Material, including new components and style updates',
      image: 'assets/card-expressive-guide.png',
      href: 'https://m3.material.io/blog/building-with-m3-expressive?utm_source=homepage&utm_medium=referral&utm_campaign=IO25',
      size: 'small',
    },
    {
      title: 'Google Design: Making Google Sans Flex',
      description: 'How seven design problems shaped Google’s iconic typeface — from inception to going open-source',
      image: 'assets/card-google-sans-flex.png',
      href: 'https://design.google/library/google-sans-flex-font',
      size: 'small',
    },
  ];

  readonly componentCards: MaterialCard[] = [
    {
      title: 'New: Toolbars',
      description: 'Flexible component to display frequently used actions. Toolbars hold a variety of controls like buttons, and can also be paired with a FAB.',
      image: 'assets/card-toolbars.png',
      href: 'https://m3.material.io/components/toolbars/overview?utm_source=homepage&utm_medium=referral&utm_campaign=IO25',
      size: 'large',
    },
    {
      title: 'New: Split button',
      description: 'Pair a button with related actions in a connected menu. Split buttons leverage expressive shape and motion strategies.',
      image: 'assets/card-split-button.png',
      href: 'https://m3.material.io/components/split-button/overview?utm_source=homepage&utm_medium=referral&utm_campaign=IO25',
      size: 'large',
    },
    {
      title: 'Updated: Progress indicators',
      description: 'An eye-catching way to show the status of a process in real time. Customize waveform and thickness to show progress with style.',
      image: 'assets/card-progress-indicators.png',
      href: 'https://m3.material.io/components/progress-indicators/overview?utm_source=homepage&utm_medium=referral&utm_campaign=IO25',
      size: 'compact',
    },
    {
      title: 'New: Button groups',
      description: 'A new way to organize related buttons—with shape-shifting buttons that bump and react to each other',
      image: 'assets/card-button-groups.png',
      href: 'https://m3.material.io/components/button-groups/overview?utm_source=homepage&utm_medium=tile&utm_campaign=IO25',
      size: 'compact',
    },
    {
      title: 'See all expressive components',
      description: 'Check out all 14 new and updated M3 Expressive components',
      image: 'assets/card-all-expressive-components.png',
      href: 'https://m3.material.io/blog/building-with-m3-expressive?utm_source=get-started&utm_medium=referral&utm_campaign=IO25#what-rsquo-s-in-the-update',
      size: 'compact',
    },
  ];

  readonly applyCards: MaterialCard[] = [
    {
      title: 'Blog: Using motion physics',
      description: 'Learn how the motion scheme works, the changes to existing APIs, and what you need to know to leverage it',
      image: 'assets/card-motion-blog.png',
      href: 'https://m3.material.io/blog/m3-expressive-motion-theming?utm_source=homepage&utm_medium=tile&utm_campaign=IO25',
      size: 'large',
    },
    {
      title: 'Watch: Build with M3 Expressive',
      description: 'Discover how to use Material’s emotional design patterns to boost usability and desire for your product',
      image: 'assets/card-build-with-expressive.png',
      href: 'https://io.google/2025/explore/technical-session-24?utm_source=homepage&utm_medium=referral&utm_campaign=IO25',
      size: 'large',
    },
  ];

  readonly latestCards: MaterialCard[] = [
    {
      title: 'Material Design blog',
      description: 'Discover what’s new, tutorials, and inspiration from the Material team',
      image: 'assets/card-material-blog.png',
      href: 'https://m3.material.io/blog?utm_source=homepage&utm_medium=referral&utm_campaign=IO26',
      size: 'large',
    },
    {
      title: 'Google Design',
      description: 'Learn about the craft of design at Google, with articles written by designers and developers, how-to guides, and podcasts',
      image: 'assets/card-google-design.png',
      href: 'https://design.google/',
      size: 'large',
    },
  ];

  readonly nextCards: MaterialCard[] = [
    { title: 'Get started', description: 'Guides, videos, and tools to start building with Material', href: 'https://m3.material.io/get-started' },
    { title: 'Figma M3 Design Kit', description: 'Customizable styles and components to help you design with Material 3', href: 'https://www.figma.com/community/file/1035203688168086460' },
    { title: 'Develop', description: 'Code and developer documentation for building with Material', href: 'https://m3.material.io/develop' },
  ];

  isDark = false;
  isSearchOpen = false;
  isMobileMenuOpen = false;
  mobileMenuSection: string | null = null;
  private expandedMobileSubmenuItems = new Set<MobileSubmenuItem>();
  private mobileMenuTrigger?: HTMLElement;
  private mobileSubmenuTrigger?: string;
  /** Desktop keeps the source site's second-level drawer beside the rail. */
  desktopMenuSection: string | null = null;
  desktopPanelOpen = false;
  private expandedDesktopSubmenuItems = new Set<MobileSubmenuItem>();
  private desktopMenuTrigger?: HTMLElement;
  private desktopCloseTimer?: ReturnType<typeof setTimeout>;
  private desktopOpenTimer?: ReturnType<typeof setTimeout>;
  isVideoPaused = false;
  animationsPaused = false;
  searchQuery = '';
  isSearchPage = typeof window !== 'undefined' && window.location.pathname.endsWith('/search.html');
  articleKey: FoundationArticleKey | null = typeof window !== 'undefined'
    ? this.foundationArticleKeyForPath(window.location.pathname)
    : null;
  copiedArticleSection: string | null = null;
  activeArticleTocIndex: number | null = null;

  /** The three article routes share the source site's Overview reading shell. */
  readonly foundationArticles: Record<FoundationArticleKey, FoundationArticlePage> = {
    principles: {
      key: 'principles',
      title: 'Overview',
      toc: [
        { label: 'Accessibility & Material Design', target: 'accessibility-material-design' },
        { label: 'Principles for accessible design', target: 'principles-for-accessible-design' },
      ],
      sections: [
        {
          id: 'accessibility-material-design',
          heading: 'Accessibility & Material Design',
          level: 2,
          paragraphs: [
            '<strong>Accessibility by default</strong> is a core design value for Material. Material\'s accessibility requirements and goals are documented across component pages and guidelines. Understanding your product’s accessibility can enhance usability for all users, including those with low vision, blindness, hearing impairments, cognitive impairments, motor impairments, or situational disabilities (such as a broken arm).',
            'Accessibility standards are built into Material components, providing a foundation for inclusive product design. Anticipating a wide range of human experiences and disabilities prevents costly redesigns, reduces tech and design debt, and conserves resources upfront.',
          ],
          snug: true,
        },
        {
          id: 'principles-for-accessible-design',
          heading: 'Principles for accessible design',
          level: 2,
          paragraphs: [
            'The following principles for accessible design are approaches that can help <strong>anticipate, include, and respond to the needs of individuals</strong>. They\'re considerations for design, development, collaboration, and co-creation that encourage inclusive and equitable outcomes.',
          ],
          snug: true,
        },
        {
          id: 'honor-individuals',
          heading: 'Honor individuals',
          level: 3,
          paragraphs: [
            'Universal default experiences rarely meet everyone’s needs. Introducing customizable features in a default experience allows room for individual adaptation. Honoring the shifting needs of any person can mean giving more freedom to choose things for themselves.',
            'Because a person\'s experience throughout their day, or year, or life can continue to change, it helps to support varying preferences and choices that allow individuals to address how their changing conditions, individual knowledge, and varying needs are met.',
          ],
          image: 'https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fl6qr2chf-l1yxwqsj-Google_AvatarProject-12_Final%201%20(1).png?alt=media&token=c3170438-686d-468a-8986-abd14605ce2b',
          imageAlt: 'silhouette of person\'s head made out of colorful liquid',
          variant: 'split',
          snug: true,
        },
        {
          id: 'learn-before-not-after',
          heading: 'Learn before, not after',
          level: 3,
          paragraphs: [
            'Before defining solutions, invest time in understanding the needs of users with a wide range of abilities and life experiences. Formal and informal research can open new ways of thinking, reduce biases, and encourage creative ways to make access available, especially to those who fall outside prevailing norms.',
            'Accessible design processes anticipate as many potential product or experience outcomes as possible upfront. When user problems do arise, exploring the unanticipated outcomes can become a research foundation for learning, adapting, and recovering thoughtfully.',
          ],
          image: 'https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fl6qr36jq-l1yxvjzc-Google_AvatarProject-4_Final%201%20(1).png?alt=media&token=376d8bc6-34aa-4433-abda-6050fb280a41',
          imageAlt: 'cube floating above a circular hole',
          variant: 'split',
          snug: true,
        },
        {
          id: 'requirements-as-a-starting-point',
          heading: 'Requirements as a starting point',
          level: 3,
          paragraphs: [
            'The minimum requirements established by <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener"><u>WCAG</u></a> support specific human needs. However, these requirements can produce creative solutions with broad benefits.',
            'History has shown that features originating from responses to specific access needs (dark mode, text-to-speech, speech-to-text) are a result of creative problem-solving within specified constraints. Seeing the requirements as opportunities, rather than constraints, has been shown to lead to solutions that ultimately serve many.',
          ],
          image: 'https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fl6qr41s7-l1yxwaxg-Google_AvatarProject-1_Final%201%20(2).png?alt=media&token=7518c7a7-0f3a-4999-8953-532542edd129',
          imageAlt: 'foam-like material sculpted into a puzzle piece resembling a standing human',
          variant: 'split',
        },
      ],
      previous: { label: 'Web', href: 'https://m3.material.io/develop/web' },
      next: { label: 'Overview: Assistive technology', href: '/foundations/overview/assistive-technology' },
    },
    'assistive-technology': {
      key: 'assistive-technology',
      title: 'Overview',
      toc: [{ label: 'Assistive technology', target: 'assistive-technology' }],
      sections: [
        {
          id: 'assistive-technology',
          heading: 'Assistive technology',
          level: 2,
          snug: true,
        },
        {
          id: 'assistive-technology-introduction',
          paragraphs: [
            'Assistive technology helps increase, maintain, or improve the functional capabilities of individuals with disabilities. People can live more independently by engaging with technology through devices like keyboards, screen readers, and braille displays, as well as tracking input, magnifiers, and voice input.',
          ],
          image: 'https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qv6git-3-3p.png?alt=media&token=58747de8-c1f4-4f0d-8b47-50b05385a705',
          imageAlt: 'Examples of icons with target sizes indicated beyond the actual size of the icon',
          caption: 'Icons are one example of interactive elements that require an understanding of different input methods and user needs. In this example the target area of the icon is identified to show how the expanded icon perimeter makes interacting with an action more accessible.',
          variant: 'assistive-intro',
          snug: true,
        },
        {
          id: 'common-forms-of-assistive-technologies',
          heading: 'Common forms of assistive technologies',
          level: 3,
          snug: true,
        },
        {
          id: 'assistive-technology-types',
          variant: 'subsections',
          subsections: [
            {
              heading: 'Keyboard',
              paragraphs: ['Hardware or software directional controllers such as keyboards, a D-pad, or trackball allow users to jump from selection to selection in a linear fashion.'],
            },
            {
              heading: 'Screen readers',
              paragraphs: ['A screen reader is a software program that uses either a braille display or reads text aloud, such as Google’s screen reader, TalkBack. People with vision impairments, experiencing difficulty reading, or who temporarily can’t read might use a screen reader. Screen readers verbalize visible content and read it aloud. Paragraph and button text, as well as hidden content like alternative text for icons and headings, are identified by the program. Content can be labeled to optimize the experience for those who use screen readers or experience a text-only version of your UI.'],
            },
            {
              heading: 'Switch input',
              paragraphs: ['Switches scan the items on your screen, highlighting each item in turn, until you make a selection. Switch Access lets you interact with your Android device using one or more switches instead of the touchscreen. '],
            },
          ],
        },
      ],
      previous: { label: 'Overview: Principles', href: '/foundations/overview/principles' },
      next: { label: 'Designing: Overview', href: 'https://m3.material.io/foundations/content-design/overview' },
    },
  };

  /** A small local index mirroring the most visible source search results. */
  readonly searchSuggestions: SearchSuggestion[] = [
    { title: 'Foundations', category: 'Foundations', href: '/foundations' },
    { title: 'Foundations overview', category: 'Foundations', href: '/foundations' },
    { title: 'Accessibility', category: 'Foundations', href: '/foundations' },
    { title: 'Writing and text', category: 'Foundations', href: '/foundations/writing' },
    { title: 'Building for all', category: 'Foundations', href: '/foundations/building-for-all' },
    { title: 'Develop', category: 'Develop', href: '/develop' },
    { title: 'Develop overview', category: 'Develop', href: '/develop' },
    { title: 'Android', category: 'Develop', href: '/develop/android' },
    { title: 'Android Views', category: 'Develop', href: '/develop/android/mdc-android' },
    { title: 'App bars', category: 'Components', href: '/components/app-bars' },
    { title: 'Badges', category: 'Components', href: '/components/badges' },
    { title: 'Global writing', category: 'Foundations', href: '/foundations/content-design/global-writing' },
    { title: 'Breakpoints', category: 'Foundations', href: '/foundations/layout/breakpoints' },
    { title: 'Bidirectionality & RTL', category: 'Foundations', href: '/foundations/layout/bidirectionality-rtl' },
    { title: 'Usability', category: 'Foundations', href: '/foundations/usability' },
    { title: 'Web', category: 'Develop', href: '/develop/web' },
    { title: 'Extended FABs', category: 'Components', href: '/components/extended-fab' },
    { title: 'Checkbox', category: 'Components', href: '/components/checkbox' },
    { title: 'Text fields', category: 'Components', href: '/components/text-fields' },
    { title: 'Alt text', category: 'Foundations', href: '/foundations/content-design/alt-text' },
    { title: 'XR', category: 'Foundations', href: '/' },
    { title: 'Canonical examples', category: 'Foundations', href: '/foundations/layout/canonical-examples' },
    { title: 'Styles', category: 'Styles', href: '/styles' },
    { title: 'Styles overview', category: 'Styles', href: '/styles' },
    { title: 'Components', category: 'Components', href: '/components' },
    { title: 'Components overview', category: 'Components', href: '/components' },
    { title: 'Jetpack Compose', category: 'Develop', href: '/develop/android/jetpack-compose' },
    { title: 'Buttons', category: 'Components', href: '/components' },
    { title: 'All buttons', category: 'Components', href: '/components/all-buttons' },
    { title: 'Button groups', category: 'Components', href: '/components/button-groups' },
    { title: 'Buttons', category: 'Components', href: '/components/buttons' },
    { title: 'Icon buttons', category: 'Components', href: '/components/icon-buttons' },
    { title: 'Segmented buttons', category: 'Components', href: '/components/segmented-buttons' },
    { title: 'Split button', category: 'Components', href: '/components/split-button' },
    { title: 'Radio button', category: 'Components', href: '/components/radio-button' },
    { title: 'Customizing Material', category: 'Foundations', href: '/foundations/customization' },
    { title: 'Designing', category: 'Foundations', href: '/foundations/designing' },
    { title: 'Content design', category: 'Foundations', href: '/foundations/content-design' },
    { title: 'Design tokens', category: 'Foundations', href: '/foundations/design-tokens' },
    { title: 'Material A-Z', category: 'Foundations', href: '/foundations/glossary' },
    { title: 'FAB menu', category: 'Components', href: '/components/fab-menu' },
    { title: 'FABs', category: 'Components', href: '/components/floating-action-button' },
    { title: 'Notifications', category: 'Foundations', href: '/foundations/content-design/notifications' },
    { title: 'Scaffold', category: 'Foundations', href: '/foundations/layout/scaffold' },
    { title: 'Flutter', category: 'Develop', href: '/develop/flutter' },
    { title: 'Motion', category: 'Styles', href: '/styles/motion' },
    { title: 'Motion physics system', category: 'Styles', href: '/styles/motion/overview' },
    { title: 'Color', category: 'Styles', href: '/styles/color' },
    { title: 'Color system', category: 'Styles', href: '/styles/color/system' },
    { title: 'Color roles', category: 'Styles', href: '/styles/color/roles' },
    { title: 'Color schemes', category: 'Styles', href: '/' },
    { title: 'Color resources', category: 'Styles', href: '/styles/color/resources' },
    { title: 'Style guide', category: 'Foundations', href: '/foundations/content-design/style-guide' },
  ];

  get isArticlePage(): boolean {
    return this.articleKey !== null;
  }

  get currentFoundationArticle(): FoundationArticlePage {
    return this.foundationArticles[this.articleKey ?? 'principles'];
  }

  private foundationArticleKeyForPath(path: string): FoundationArticleKey | null {
    const normalized = path.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
    if (normalized === '/foundations/overview' || normalized === '/foundations/overview/principles') {
      return 'principles';
    }
    if (normalized === '/foundations/overview/assistive-technology') {
      return 'assistive-technology';
    }
    return null;
  }

  get visibleSearchSuggestions(): SearchSuggestion[] {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (!query) return [];
    const stem = query.endsWith('s') ? query.slice(0, -1) : query;
    const componentQuery = query === 'component' || query === 'components';
    const pick = (titles: string[], hrefOverrides: Record<string, string> = {}): SearchSuggestion[] => titles
      .map((title) => this.searchSuggestions.find((suggestion) => suggestion.title === title && (!hrefOverrides[title] || suggestion.href === hrefOverrides[title])))
      .filter((suggestion): suggestion is SearchSuggestion => !!suggestion);
    if (query === 'a') {
      const shortQueryOrder = [
        'Foundations', 'Foundations overview', 'Accessibility', 'Writing and text',
        'Building for all', 'Android', 'Android Views', 'Jetpack Compose',
      ];
      return pick(shortQueryOrder);
    }
    if (query === 'b') {
      return pick(['App bars', 'Badges', 'Buttons', 'Accessibility', 'Building for all', 'Global writing', 'Breakpoints', 'Bidirectionality & RTL', 'Usability', 'Web']);
    }
    if (query === 'bu') {
      const firstButtons = this.searchSuggestions.find((suggestion) => suggestion.title === 'Buttons' && suggestion.href === '/components');
      const styledButtons = this.searchSuggestions.find((suggestion) => suggestion.title === 'Buttons' && suggestion.href === '/components/buttons');
      return [
        firstButtons,
        ...pick(['All buttons', 'Button groups']),
        styledButtons,
        ...pick(['Icon buttons', 'Segmented buttons', 'Split button', 'Radio button', 'Building for all']),
      ].filter((suggestion): suggestion is SearchSuggestion => !!suggestion);
    }
    if (query === 'buttons') {
      return pick(['Buttons', 'All buttons', 'Buttons', 'Icon buttons', 'Segmented buttons'], {
        Buttons: '/components/buttons',
      }).map((suggestion, index) => index === 0 ? this.searchSuggestions.find((item) => item.title === 'Buttons' && item.href === '/components')! : suggestion);
    }
    if (query === 'button' || query === 'but') {
      return this.searchSuggestions.filter((suggestion) => suggestion.category === 'Components' && suggestion.title.toLocaleLowerCase().includes('button'));
    }
    if (query === 'x') {
      return pick(['Extended FABs', 'Checkbox', 'Text fields', 'Writing and text', 'Alt text', 'XR', 'Canonical examples']);
    }
    if (query === 'all') {
      // The source search groups the component result before the Foundations
      // result for this exact query, even though the index is otherwise
      // ordered by navigation section.
      return pick(['All buttons', 'Building for all']);
    }
    if (query === 'f') {
      return pick([
        'Extended FABs', 'FAB menu', 'FABs', 'Text fields',
        'Foundations', 'Foundations overview', 'Building for all',
        'Notifications', 'Scaffold', 'Flutter',
      ]);
    }
    if (query === 'fo') {
      return pick(['Foundations', 'Foundations overview', 'Building for all', 'Scaffold']);
    }
    if (query === 'motion') {
      return pick(['Motion', 'Motion physics system']);
    }
    if (query === 'color') {
      return pick(['Color', 'Color system', 'Color roles', 'Color schemes', 'Color resources']);
    }
    if (query === 'style') {
      return pick(['Styles', 'Styles overview', 'Style guide']);
    }
    if (query === 'android') {
      return pick(['Android', 'Android Views']);
    }
    if (query === 'text') {
      return pick(['Text fields', 'Writing and text', 'Alt text']);
    }
    if (query === 'get') {
      return [];
    }
    return this.searchSuggestions.filter((suggestion) => {
      const title = suggestion.title.toLocaleLowerCase();
      if (componentQuery) {
        return suggestion.category === 'Components' && (title === 'components' || title === 'components overview');
      }
      // The source groups results by their visible title; category labels and
      // URLs should not make unrelated entries match a short query.
      return title.includes(query) || (stem.length > 2 && title.includes(stem));
    });
  }

  get searchSuggestionCategory(): string {
    return this.visibleSearchSuggestions[0]?.category ?? '';
  }

  get visibleSearchGroups(): Array<{ category: string; suggestions: SearchSuggestion[] }> {
    const groups: Array<{ category: string; suggestions: SearchSuggestion[] }> = [];
    for (const suggestion of this.visibleSearchSuggestions) {
      let group = groups.find((candidate) => candidate.category === suggestion.category);
      if (!group) {
        group = { category: suggestion.category, suggestions: [] };
        groups.push(group);
      }
      group.suggestions.push(suggestion);
    }
    return groups;
  }

  /** Links to other sites open in a new tab, matching the source navigation. */
  isExternalLink(href: string): boolean {
    return /^https?:\/\/(?!m3\.material\.io(?:\/|$))/i.test(href);
  }

  get searchSuggestionHeight(): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (query && !this.visibleSearchSuggestions.length) return 60;
    const heights: Record<string, number> = {
      b: 782,
      bu: 672,
      but: 562,
      button: 562,
      buttons: 394,
      com: 336,
      component: 226,
      components: 226,
      x: 560,
      material: 226,
      design: 282,
      a: 616,
    };
    if (heights[query] !== undefined) return heights[query];
    const groups = this.visibleSearchGroups;
    if (!groups.length) return 0;
    // Each source result row is 44px tall with a 12px inter-row gap.  The
    // result wrapper adds a fixed title/list breathing room and 54px for each
    // additional category.  Computing this for uncatalogued queries keeps
    // short searches from inheriting the eight-row (562px) footprint.
    const rowCount = groups.reduce((total, group) => total + group.suggestions.length, 0);
    return 56 * rowCount + 114 + 54 * (groups.length - 1);
  }

  get searchSuggestionWidth(): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    const widths: Record<string, number> = {
      com: 288.12,
      component: 288.11,
      components: 288.11,
      x: 201.89,
      material: 270.75,
      design: 207.52,
      a: 280.64,
    };
    return widths[query] ?? 255.17;
  }

  get searchGroupGap(): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (query === 'a') return 12;
    if (query === 'com') return 36;
    return 24;
  }

  searchSuggestionWidthFor(category: string): number {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (query === 'a' && category === 'Foundations') return 280.64;
    if (query === 'a' && category === 'Develop') return 240.23;
    if (query === 'b' && category === 'Components') return 137.53;
    if (query === 'b' && category === 'Foundations') return 269.33;
    if (query === 'b' && category === 'Develop') return 88.56;
    if (query === 'bu' && category === 'Foundations') return 192.98;
    if (query === 'com' && category === 'Components') return 288.12;
    if (query === 'com' && category === 'Develop') return 240.23;
    if (query === 'component' || query === 'components') return 288.11;
    if (query === 'x' && category === 'Components') return 201.89;
    if (query === 'x' && category === 'Foundations') return 257.61;
    return this.searchSuggestionWidth;
  }

  /** The source search field paints a faint completion behind a partial query. */
  get searchAutocorrect(): string {
    const query = this.searchQuery.trim().toLocaleLowerCase();
    if (!query) return '';
    if (query === 'b' || query === 'bu') return 'building for all';
    if (query === 'but' || query === 'button') return 'buttons';
    if (query === 'com' || query === 'component') return 'components';
    if (query === 'x') return 'xR';
    if (query === 'material') return 'material A-Z';
    if (query === 'design') return 'designing';
    if (query === 'a') return 'accessibility';
    if (query === 'f') return 'flutter';
    if (query === 'fo') return 'foundations';
    if (query === 'access') return 'accessibility';
    if (query === 'build') return 'building for all';
    if (query === 'motion' || query === 'color' || query === 'android') return '';
    if (query === 'style') return 'style guide';
    if (query === 'text') return 'text fields';
    if (query === 'get') return 'get started';
    const completion = this.searchSuggestions
      .map((suggestion) => suggestion.title)
      .find((title) => title.toLocaleLowerCase().startsWith(query) && title.length > query.length);
    return completion ?? '';
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    this.isSearchPage = window.location.pathname.endsWith('/search.html');
    this.articleKey = this.foundationArticleKeyForPath(window.location.pathname);
    this.isDark = window.localStorage.getItem('current_mode') === 'dark';
    this.animationsPaused = window.localStorage.getItem('current_animation') === 'pause';
    // Keep the hero control's accessible label in sync on the first render.
    // With OnPush change detection, assigning this only from ngAfterViewInit
    // can leave a restored paused preference showing "Pause Video" briefly.
    this.isVideoPaused = this.animationsPaused || this.isSearchPage || this.isArticlePage;
    this.syncBodyTheme();
    this.updateDocumentTitle();
  }

  ngAfterViewInit(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) {
      return;
    }

    // The source page explicitly starts the muted montage from script. Doing
    // the same here keeps autoplay reliable in headless and mobile browsers.
    video.muted = true;
    video.defaultMuted = true;
    if (this.isSearchPage || this.isArticlePage || this.animationsPaused) {
      video.pause();
      this.isVideoPaused = true;
    } else {
      void video.play().catch(() => {
        // A browser may still reject autoplay; the visible control remains
        // available so the user can start it explicitly.
      });
    }
  }

  /** Split a suggestion into muted and query-matching runs for the source-like result styling. */
  suggestionParts(title: string): Array<{ text: string; match: boolean }> {
    const query = this.searchQuery.trim();
    if (!query) return [{ text: title, match: false }];
    const lowerTitle = title.toLocaleLowerCase();
    const normalizedQuery = query.toLocaleLowerCase();
    const stem = normalizedQuery.endsWith('s') ? normalizedQuery.slice(0, -1) : normalizedQuery;
    const lowerQuery = lowerTitle.includes(normalizedQuery) ? normalizedQuery : stem;
    const start = lowerTitle.indexOf(lowerQuery);
    if (start < 0) return [{ text: title, match: false }];
    const end = start + query.length;
    return [
      ...(start ? [{ text: title.slice(0, start), match: false }] : []),
      { text: title.slice(start, end), match: true },
      ...(end < title.length ? [{ text: title.slice(end), match: false }] : []),
    ];
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('current_mode', this.isDark ? 'dark' : 'light');
    }
    this.syncBodyTheme();
  }

  toggleAnimations(): void {
    this.animationsPaused = !this.animationsPaused;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('current_animation', this.animationsPaused ? 'pause' : 'play');
    }
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    if (this.animationsPaused || this.isSearchPage || this.isArticlePage) {
      video.pause();
      this.isVideoPaused = true;
    } else {
      void video.play();
      this.isVideoPaused = false;
    }
  }

  toggleVideo(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    if (video.paused) {
      this.isVideoPaused = false;
      void video.play().catch(() => {
        this.isVideoPaused = true;
      });
    } else {
      video.pause();
      this.isVideoPaused = true;
    }
  }

  openSearch(event?: Event): void {
    event?.preventDefault();
    this.closeDesktopSubmenu(false);
    this.isMobileMenuOpen = false;
    this.mobileMenuSection = null;
    this.expandedMobileSubmenuItems = new Set();
    this.mobileMenuTrigger = undefined;
    this.mobileSubmenuTrigger = undefined;
    this.isSearchOpen = false;
    this.articleKey = null;
    // The source search route starts at the top even when the homepage was
    // scrolled.  Reset the shared scrolling shell before revealing it.
    this.pageContent?.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
    const video = this.heroVideo?.nativeElement;
    if (video) {
      video.pause();
      this.isVideoPaused = true;
    }
    this.isSearchPage = true;
    this.updateUrl('/search.html');
    this.updateDocumentTitle();
    // Let Angular render the route view before moving focus into its field.
    // A microtask can run before the view is inserted (especially in Chrome),
    // leaving focus on the clicked rail button.
    setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
  }

  /** Navigate between the local article tabs without a full page reload. */
  openArticle(event: Event, path: string): void {
    const articleKey = this.foundationArticleKeyForPath(path);
    if (!articleKey) return;
    event.preventDefault();
    this.closeDesktopSubmenu(false);
    this.closeMobileMenu();
    this.isSearchPage = false;
    this.isSearchOpen = false;
    this.searchQuery = '';
    this.articleKey = articleKey;
    this.activeArticleTocIndex = null;
    this.updateUrl(path);
    this.updateDocumentTitle();
    this.pageContent?.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
    const video = this.heroVideo?.nativeElement;
    if (video) {
      video.pause();
      this.isVideoPaused = true;
    }
    this.changeDetectorRef.detectChanges();
  }

  /** Handle previous/up-next links, keeping article routes inside the clone. */
  navigateArticleLink(event: Event, path: string): void {
    if (this.foundationArticleKeyForPath(path)) {
      this.openArticle(event, path);
    }
  }

  scrollArticleTo(event: Event, targetId: string): void {
    event.preventDefault();
    const target = document.getElementById(targetId);
    const scrollContainer = this.pageContent?.nativeElement;
    if (!target || !scrollContainer) return;
    const tocIndex = this.currentFoundationArticle.toc.findIndex((entry) => entry.target === targetId);
    this.activeArticleTocIndex = tocIndex < 0 ? null : tocIndex;
    const scrollTop = target.getBoundingClientRect().top
      - scrollContainer.getBoundingClientRect().top
      + scrollContainer.scrollTop;
    scrollContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
    target.focus({ preventScroll: true });
    this.changeDetectorRef.markForCheck();
  }

  /** Keep the source-style TOC indicator aligned with the section at the sticky reading line. */
  onPageContentScroll(): void {
    if (!this.isArticlePage || typeof document === 'undefined') return;
    const scrollContainer = this.pageContent?.nativeElement;
    if (!scrollContainer) return;

    const readingLine = scrollContainer.getBoundingClientRect().top + 136;
    let nextIndex: number | null = null;
    for (const [index, entry] of this.currentFoundationArticle.toc.entries()) {
      const section = document.getElementById(entry.target);
      if (section && section.getBoundingClientRect().top <= readingLine + 0.5) {
        nextIndex = index;
      }
    }

    if (nextIndex === this.activeArticleTocIndex) return;
    this.activeArticleTocIndex = nextIndex;
    this.changeDetectorRef.markForCheck();
  }

  copyArticleLink(event: Event, sectionId: string): void {
    event.preventDefault();
    const url = typeof window === 'undefined'
      ? `#${sectionId}`
      : `${window.location.origin}${window.location.pathname}#${sectionId}`;
    const copy = typeof navigator !== 'undefined' && navigator.clipboard
      ? navigator.clipboard.writeText(url)
      : Promise.resolve();
    void copy.catch(() => undefined);
    this.copiedArticleSection = sectionId;
    setTimeout(() => {
      if (this.copiedArticleSection === sectionId) this.copiedArticleSection = null;
      this.changeDetectorRef.detectChanges();
    }, 1400);
  }

  closeSearch(): void {
    this.isSearchOpen = false;
    this.searchQuery = '';
  }

  /**
   * Flatten the expanded desktop tree while retaining each item's depth. The
   * source drawer renders descendants inline, so a flat visible list keeps
   * the same geometry and lets nested sections (for example Color schemes)
   * expand without replacing the whole panel.
   */
  get visibleDesktopSubmenuItems(): VisibleMobileSubmenuItem[] {
    if (!this.desktopMenuSection) return [];
    const visible: VisibleMobileSubmenuItem[] = [];
    const walk = (items: MobileSubmenuItem[], depth: number): void => {
      items.forEach((item, index) => {
        visible.push({
          item,
          depth,
          childStart: depth > 0 && index === 0,
          childEnd: depth > 0 && index === items.length - 1,
        });
        if (item.children?.length && this.expandedDesktopSubmenuItems.has(item)) {
          walk(item.children, depth + 1);
        }
      });
    };
    walk(this.mobileSubmenus[this.desktopMenuSection] ?? [], 0);
    return visible;
  }

  isDesktopSubmenuItemExpanded(item: MobileSubmenuItem): boolean {
    return this.expandedDesktopSubmenuItems.has(item);
  }

  /**
   * Keep the official destination on every topic item.  The clone does not
   * ship the documentation pages themselves, so topic links intentionally
   * open the corresponding Material page just as the source site does.
   */
  desktopTopicHref(item: MobileSubmenuItem): string {
    return item.href;
  }

  /** Mark the topic that owns the current path when a documentation route is open. */
  isDesktopTopicActive(item: MobileSubmenuItem, depth: number): boolean {
    if (depth !== 0 || typeof window === 'undefined') return false;
    try {
      const topicPath = new URL(item.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      return currentPath === topicPath || (topicPath !== '/' && currentPath.startsWith(`${topicPath}/`));
    } catch {
      return false;
    }
  }

  /** Open a topic drawer from a click or keyboard activation. */
  openDesktopSubmenu(event: Event | undefined, item: NavItem): void {
    if (!item.expandable || !this.mobileSubmenus[item.label]) return;
    event?.preventDefault();
    if (event?.currentTarget instanceof HTMLElement) {
      this.desktopMenuTrigger = event.currentTarget;
    }
    this.cancelDesktopSubmenuClose();
    if (this.desktopOpenTimer !== undefined) {
      clearTimeout(this.desktopOpenTimer);
      this.desktopOpenTimer = undefined;
    }
    const wasOpen = this.desktopPanelOpen && !!this.desktopMenuSection;
    const changedSection = this.desktopMenuSection !== item.label;
    this.desktopMenuSection = item.label;
    if (changedSection) this.expandedDesktopSubmenuItems = new Set();

    // Keep an already-open panel in place when moving between rail topics;
    // only the first open gets the source-style slide/fade entrance.
    if (wasOpen) {
      this.desktopPanelOpen = true;
      return;
    }
    // Render the drawer in its translated state for one frame, then add the
    // open class.  This makes the source-style slide-in observable even in
    // browsers that do not implement CSS @starting-style for Angular views.
    this.desktopPanelOpen = false;
    this.desktopOpenTimer = setTimeout(() => {
      if (this.desktopMenuSection === item.label) {
        this.desktopPanelOpen = true;
      }
      this.desktopOpenTimer = undefined;
      this.changeDetectorRef.detectChanges();
    }, 0);
  }

  openDesktopSubmenuOnHover(item: NavItem): void {
    this.openDesktopSubmenu(undefined, item);
  }

  toggleDesktopSubmenuItem(event: Event, item: MobileSubmenuItem): void {
    if (!item.children?.length) {
      this.closeDesktopSubmenu(false);
      return;
    }
    event.preventDefault();
    this.cancelDesktopSubmenuClose();
    const expanded = new Set(this.expandedDesktopSubmenuItems);
    if (expanded.has(item)) {
      expanded.delete(item);
    } else {
      expanded.add(item);
    }
    this.expandedDesktopSubmenuItems = expanded;
  }

  onDesktopSubmenuKeydown(event: KeyboardEvent, item: MobileSubmenuItem): void {
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      this.toggleDesktopSubmenuItem(event, item);
    }
  }

  onDesktopSubmenuLeafClick(_event: Event): void {
    // Let the anchor perform its normal navigation while the drawer starts
    // its exit transition. The source follows the same route-level behavior.
    this.closeDesktopSubmenu(false);
  }

  onDesktopNavItemClick(event: Event, item: NavItem): void {
    if (item.expandable) {
      this.openDesktopSubmenu(event, item);
      return;
    }
    if (this.desktopMenuSection) this.closeDesktopSubmenu(false);
    if (item.active) this.scrollHome(event);
  }

  onDesktopNavItemKeydown(event: KeyboardEvent, item: NavItem): void {
    if (!item.expandable) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      this.openDesktopSubmenu(event, item);
    }
  }

  cancelDesktopSubmenuClose(): void {
    if (this.desktopCloseTimer !== undefined) {
      clearTimeout(this.desktopCloseTimer);
      this.desktopCloseTimer = undefined;
    }
    // If the pointer comes back while the dismissible drawer is sliding out,
    // reverse the transition instead of waiting for the panel to be removed.
    if (this.desktopMenuSection && !this.desktopPanelOpen) {
      this.desktopPanelOpen = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  scheduleDesktopSubmenuClose(): void {
    this.cancelDesktopSubmenuClose();
    if (!this.desktopMenuSection) return;
    // A short grace period lets the pointer cross from the 88px rail into
    // the adjacent drawer without causing a flicker.
    this.desktopCloseTimer = setTimeout(() => {
      this.desktopPanelOpen = false;
      this.changeDetectorRef.detectChanges();
      this.desktopCloseTimer = setTimeout(() => {
        if (!this.desktopPanelOpen) {
          this.desktopMenuSection = null;
          this.expandedDesktopSubmenuItems = new Set();
        }
        this.desktopCloseTimer = undefined;
        this.changeDetectorRef.detectChanges();
      }, 300);
    }, 140);
  }

  closeDesktopSubmenu(restoreFocus = true): void {
    if (!this.desktopMenuSection && !this.desktopPanelOpen) return;
    this.cancelDesktopSubmenuClose();
    if (this.desktopOpenTimer !== undefined) {
      clearTimeout(this.desktopOpenTimer);
      this.desktopOpenTimer = undefined;
    }
    this.desktopPanelOpen = false;
    const trigger = this.desktopMenuTrigger;
    this.desktopMenuTrigger = undefined;
    this.desktopCloseTimer = setTimeout(() => {
      if (!this.desktopPanelOpen) {
        this.desktopMenuSection = null;
        this.expandedDesktopSubmenuItems = new Set();
      }
      this.desktopCloseTimer = undefined;
      this.changeDetectorRef.detectChanges();
    }, 300);
    if (restoreFocus && trigger?.isConnected) {
      setTimeout(() => trigger.focus(), 0);
    }
  }

  /** The source dismissible drawer closes when the pointer lands in content. */
  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    if (!this.desktopMenuSection || !this.desktopPanelOpen || typeof Element === 'undefined') return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.nav-rail, .desktop-topic-drawer')) return;
    // Do not restore focus to the rail trigger here: the trigger's focus
    // handler intentionally opens a topic drawer, which would immediately
    // undo an outside-click dismissal.
    this.closeDesktopSubmenu(false);
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
      return;
    }
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      this.mobileMenuTrigger = document.activeElement;
    }
    this.isMobileMenuOpen = true;
    this.mobileMenuSection = null;
    this.expandedMobileSubmenuItems = new Set();
    setTimeout(() => {
      document.querySelector<HTMLElement>('.mobile-drawer .drawer-item')?.focus();
    }, 0);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.mobileMenuSection = null;
    this.expandedMobileSubmenuItems = new Set();
    this.mobileSubmenuTrigger = undefined;
    const trigger = this.mobileMenuTrigger;
    this.mobileMenuTrigger = undefined;
    if (trigger?.isConnected) {
      setTimeout(() => trigger.focus(), 0);
    }
  }

  openMobileSubmenu(event: Event, item: NavItem): void {
    if (!item.expandable || !this.mobileSubmenus[item.label]) return;
    event.preventDefault();
    this.mobileSubmenuTrigger = item.label;
    this.mobileMenuSection = item.label;
    this.expandedMobileSubmenuItems = new Set();
    setTimeout(() => document.querySelector<HTMLElement>('.drawer-back')?.focus(), 0);
  }

  closeMobileSubmenu(): void {
    const section = this.mobileSubmenuTrigger;
    this.mobileMenuSection = null;
    this.mobileSubmenuTrigger = undefined;
    this.expandedMobileSubmenuItems = new Set();
    // Restore focus to the topic that opened the submenu once the main menu
    // has been rendered again.
    if (section && typeof document !== 'undefined') {
      setTimeout(() => {
        const item = Array.from(document.querySelectorAll<HTMLElement>('.mobile-drawer .drawer-item'))
          .find((candidate) => candidate.getAttribute('aria-label') === section);
        item?.focus();
      }, 0);
    }
  }

  get visibleMobileSubmenuItems(): VisibleMobileSubmenuItem[] {
    if (!this.mobileMenuSection) return [];
    const visible: VisibleMobileSubmenuItem[] = [];
    const walk = (items: MobileSubmenuItem[], depth: number): void => {
      items.forEach((item, index) => {
        visible.push({
          item,
          depth,
          childStart: depth > 0 && index === 0,
          childEnd: depth > 0 && index === items.length - 1,
        });
        if (item.children?.length && this.expandedMobileSubmenuItems.has(item)) {
          walk(item.children, depth + 1);
        }
      });
    };
    walk(this.mobileSubmenus[this.mobileMenuSection] ?? [], 0);
    return visible;
  }

  isMobileSubmenuItemExpanded(item: MobileSubmenuItem): boolean {
    return this.expandedMobileSubmenuItems.has(item);
  }

  openMobileSubmenuItem(event: Event, item: MobileSubmenuItem): void {
    if (!item.children?.length) {
      this.closeMobileMenu();
      return;
    }
    event.preventDefault();
    const expanded = new Set(this.expandedMobileSubmenuItems);
    if (expanded.has(item)) {
      expanded.delete(item);
    } else {
      expanded.add(item);
    }
    this.expandedMobileSubmenuItems = expanded;
  }

  onDrawerItemClick(event: Event, item: NavItem): void {
    if (item.expandable) {
      this.openMobileSubmenu(event, item);
      return;
    }
    if (item.active) this.scrollHome(event);
    this.closeMobileMenu();
  }

  onDrawerItemKeydown(event: Event, item: NavItem): void {
    const key = (event as KeyboardEvent).key;
    if (key === ' ' || key === 'Spacebar') {
      if (item.expandable) this.onDrawerItemClick(event, item);
    }
  }

  updateSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  /** Accept the source-style ghost completion when the user tabs onward. */
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || !this.searchAutocorrect) return;
    // The source accepts the ghost completion while retaining focus in the
    // search field; prevent the browser from tabbing to the clear button.
    event.preventDefault();
    this.searchQuery = this.searchAutocorrect;
    const input = event.target as HTMLInputElement;
    input.value = this.searchQuery;
  }

  skipToTarget(event: Event): void {
    event.preventDefault();
    if (typeof document === 'undefined') return;
    const targetId = 'main_content';
    const target = document.getElementById(targetId) ?? document.getElementById('main-content');
    if (!target) return;
    if (typeof window !== 'undefined') {
      // Keep the deep-link hash in sync with the source site's skip link while
      // retaining the SPA's in-shell focus/scroll behavior.
      window.history.replaceState({}, '', `${window.location.pathname}#main_content`);
    }
    this.pageContent?.nativeElement.scrollTo({ top: target.offsetTop, behavior: 'auto' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  scrollHome(event: Event): void {
    event.preventDefault();
    this.closeDesktopSubmenu(false);
    if (this.isSearchPage || this.isArticlePage) {
      this.isSearchPage = false;
      this.articleKey = null;
      this.activeArticleTocIndex = null;
      this.isSearchOpen = false;
      this.searchQuery = '';
      this.updateUrl('/');
      this.updateDocumentTitle();
      this.pageContent?.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
      const video = this.heroVideo?.nativeElement;
      if (video && !this.animationsPaused) {
        this.isVideoPaused = false;
        void video.play().catch(() => {
          // Keep the control honest if autoplay is rejected after returning.
          this.isVideoPaused = true;
        });
      }
      return;
    }
    // Home is a route-level reset on the source page, so return immediately
    // instead of leaving the user partway through the animated scroll.
    this.pageContent?.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
  }

  clearSearch(): void {
    this.searchQuery = '';
    setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
  }

  private updateUrl(path: string): void {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
  }

  private updateDocumentTitle(): void {
    if (typeof document === 'undefined') return;
    document.title = this.isSearchPage
      ? 'Search — Material Design 3'
      : this.isArticlePage
        ? 'Accessibility overview – Material Design 3'
      : "Material Design 3 - Google's latest open source design system";
  }

  private syncBodyTheme(): void {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('dark-mode', this.isDark);
    document.documentElement.style.colorScheme = this.isDark ? 'dark' : 'light';
  }

  @HostListener('window:popstate')
  onPopState(): void {
    if (typeof window === 'undefined') return;
    this.isSearchPage = window.location.pathname.endsWith('/search.html');
    this.articleKey = this.foundationArticleKeyForPath(window.location.pathname);
    this.activeArticleTocIndex = null;
    this.isSearchOpen = false;
    this.closeDesktopSubmenu(false);
    this.closeMobileMenu();
    this.searchQuery = '';
    this.pageContent?.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
    this.updateDocumentTitle();
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    if (this.isSearchPage || this.isArticlePage || this.animationsPaused) {
      video.pause();
      this.isVideoPaused = true;
    } else {
      this.isVideoPaused = false;
      void video.play().catch(() => {
        this.isVideoPaused = true;
      });
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isSearchOpen) {
      this.closeSearch();
    }
    // The source drawer intentionally leaves its menu open on Escape (both
    // the main list and nested topic views), so do not dismiss it here.
  }
}
