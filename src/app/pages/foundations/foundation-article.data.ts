import { FoundationArticleKey, FoundationArticlePage } from './foundation-article.models';

/** Content shared by the local accessibility overview routes. */
export const FOUNDATION_ARTICLES: Record<FoundationArticleKey, FoundationArticlePage> = {
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
