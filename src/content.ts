// Single source of truth for all page copy. Swap values here; no component edits needed.
// ponytail: replace the placeholder identity, links, and project art before publishing.

export const portfolio = {
  name: 'Your Name',
  role: 'Frontend Developer',
  intro:
    'I build modern, scalable web applications with clean, maintainable code, thoughtful UI/UX and a strong emphasis on performance, accessibility, and real-world usability.',
  email: 'hello@example.com',
  scheduleUrl: '#contact',
  githubUsername: 'adjiewikus214',
  socials: [
    { label: 'GITHUB', href: '', icon: 'github' },
    { label: 'LINKEDIN', href: '', icon: 'linkedin' },
    { label: 'INSTAGRAM', href: '', icon: 'instagram' },
    { label: 'TWITTER', href: '', icon: 'twitter' },
  ],
  projectsIntro: 'Selected digital works focusing on performance and user experience.',
  projects: [
    {
      title: 'Project One',
      status: 'Completed',
      description:
        'A centralized platform to manage records and availability in real time, built so teams stop coordinating over spreadsheets.',
      tags: ['React', 'Node.js', 'Express'],
      art: 'dashboard',
      duration: '2 Months',
      href: '',
    },
    {
      title: 'Project Two',
      status: 'Completed',
      description:
        'A web platform for managing students, companies, and opportunities, with role-based views for each audience.',
      tags: ['React', 'Node.js', 'Express'],
      art: 'editor',
      duration: '2 Months',
      href: '',
    },
    {
      title: 'Project Three',
      status: 'Published',
      description:
        'A lightweight, highly customizable notification library for modern, tactile web interfaces.',
      tags: ['React', 'TypeScript', 'CSS Modules'],
      art: 'library',
      duration: 'Ongoing',
      href: '',
    },
  ],
  experience: [
    {
      label: 'Current Role',
      title: 'Your Company',
      meta: 'Web Dev Intern • 2026 — Present',
      kind: 'Internship',
      lines: [
        'Architecting responsive interfaces and UI refinements.',
        'Engineering automated data workflows.',
        'Contributing to production-ready frontend experiences.',
      ],
    },
    {
      label: 'Achievement',
      title: 'Your Competition',
      meta: 'University Selection • 2025',
      kind: 'Hackathon',
      lines: [
        'Selected at university level for national screening.',
        'Worked on scalable solution architecture with a small team.',
      ],
    },
  ],
  articleFilters: ['ALL', 'FULL-STACK WEB APPLICATION', 'ENGINEERING'],
  articles: [
    {
      category: 'FULL-STACK WEB APPLICATION',
      date: 'FEBRUARY 8, 2026',
      readTime: '5 min',
      title: 'How I Designed a Record Management Platform',
      description:
        'A full-stack write-up on eliminating coordination gaps between the people who supply data and the people who need it.',
      art: 'article-one',
      href: '',
    },
    {
      category: 'ENGINEERING',
      date: 'JANUARY 24, 2025',
      readTime: '15 min',
      title: 'Behind This Portfolio',
      description:
        'Design decisions, architecture choices, and lessons learned while growing as a web developer.',
      art: 'article-two',
      href: '',
    },
  ],
  about: {
    paragraphs: [
      'I build interfaces that stay fast and legible as they grow: clear structure, honest states, and no decoration that hides the work.',
      'I care about maintainable code and real-world usability — the parts a user notices only when they are missing.',
    ],
    facts: [
      { label: 'BACKGROUND', value: 'Your education or experience' },
      { label: 'FOCUS', value: 'Clean, accessible interfaces' },
      { label: 'CURRENTLY', value: 'Learning and building' },
    ],
  },
  stackIntro: 'A practical toolset for building and shipping maintainable products.',
  stack: [
    {
      group: 'Frontend & Backend',
      items: ['JavaScript', 'React', 'TypeScript', 'CSS', 'Node.js', 'Express', 'Framer Motion', 'Tailwind'],
    },
    {
      group: 'Database & Tools',
      items: ['MongoDB', 'SQL', 'Git', 'Figma', 'Canva'],
    },
  ],
  faqs: [
    {
      question: 'WHAT TECH STACK DO YOU USE?',
      answer:
        'React and TypeScript on the front end, Node.js and Express on the back end, with MongoDB or SQL depending on the problem.',
    },
    {
      question: 'ARE YOU OPEN TO NEW PROJECTS?',
      answer:
        'Yes. Send a short description of the problem, the timeline, and who owns it, and I will reply with next steps.',
    },
    {
      question: 'FRONTEND OR BACKEND?',
      answer:
        'Primarily frontend, with enough backend work to connect an interface to real data end to end.',
    },
    {
      question: 'HOW CAN SOMEONE CONTACT YOU?',
      answer: 'Use the email button below, or reach out on any of the social links listed above.',
    },
  ],
  collaborate: {
    title: "Let's collaborate",
    body: 'Currently available for new projects. Tell me what you are building and when you need it live.',
    action: 'Send Email',
  },
} as const