import { ComponentNode, SectionNode, ComponentType, SectionType } from '@/types/builder';

export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

export interface ComponentMeta {
  type: ComponentType;
  label: string;
  category: 'Typography' | 'Media' | 'Action' | 'Data & Bio' | 'Layout';
  description: string;
  iconName: string;
  createDefault: () => ComponentNode;
}

export interface SectionMeta {
  type: SectionType;
  label: string;
  description: string;
  iconName: string;
  createDefault: () => SectionNode;
}

export const ATOMIC_COMPONENTS: ComponentMeta[] = [
  {
    type: 'heading',
    label: 'Heading',
    category: 'Typography',
    description: 'Title or section header with customizable level & gradient',
    iconName: 'Heading',
    createDefault: () => ({
      id: generateId('comp_heading'),
      type: 'heading',
      props: {
        text: 'Crafting Digital Experiences',
        level: 'h1',
        gradient: false,
      },
      styles: {
        fontSize: '3rem',
        fontWeight: '700',
        textAlign: 'left',
      },
    }),
  },
  {
    type: 'paragraph',
    label: 'Paragraph',
    category: 'Typography',
    description: 'Body copy, bios, and descriptions',
    iconName: 'AlignLeft',
    createDefault: () => ({
      id: generateId('comp_p'),
      type: 'paragraph',
      props: {
        text: 'I specialize in high-performance web applications, distributed systems, and delightful user interfaces. Currently leading core architecture initiatives.',
      },
      styles: {
        fontSize: '1.125rem',
        textAlign: 'left',
      },
    }),
  },
  {
    type: 'button',
    label: 'Action Button',
    category: 'Action',
    description: 'Call-to-action button with customizable variants and links',
    iconName: 'MousePointerClick',
    createDefault: () => ({
      id: generateId('comp_btn'),
      type: 'button',
      props: {
        label: 'View Projects',
        url: '#projects',
        variant: 'primary',
        size: 'md',
        targetBlank: false,
      },
    }),
  },
  {
    type: 'badge',
    label: 'Status / Badge',
    category: 'Action',
    description: 'Eyebrow pill or availability status indicator',
    iconName: 'Tag',
    createDefault: () => ({
      id: generateId('comp_badge'),
      type: 'badge',
      props: {
        label: '✨ Available for Q2 Projects',
        variant: 'glow',
      },
    }),
  },
  {
    type: 'avatar',
    label: 'Avatar / Profile',
    category: 'Media',
    description: 'Profile photo with optional online status badge',
    iconName: 'UserCircle',
    createDefault: () => ({
      id: generateId('comp_avatar'),
      type: 'avatar',
      props: {
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        altText: 'Profile Avatar',
        name: 'Alex Rivera',
        statusBadge: 'Open to Work',
        size: 'xl',
      },
    }),
  },
  {
    type: 'image',
    label: 'Showcase Image',
    category: 'Media',
    description: 'High-res image preview, illustration, or design mockup',
    iconName: 'Image',
    createDefault: () => ({
      id: generateId('comp_img'),
      type: 'image',
      props: {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        alt: 'Project Showcase',
        caption: 'Analytics Dashboard Platform',
        aspectRatio: 'video',
        rounded: 'xl',
        shadow: true,
      },
    }),
  },
  {
    type: 'socialLinks',
    label: 'Social Links',
    category: 'Action',
    description: 'Row of social media links (GitHub, LinkedIn, Twitter, etc.)',
    iconName: 'Share2',
    createDefault: () => ({
      id: generateId('comp_social'),
      type: 'socialLinks',
      props: {
        links: [
          { platform: 'github', url: 'https://github.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'twitter', url: 'https://x.com' },
          { platform: 'email', url: 'mailto:contact@example.com' },
        ],
        variant: 'pills',
      },
    }),
  },
  {
    type: 'statCard',
    label: 'Metric / Stat Card',
    category: 'Data & Bio',
    description: 'Highlight key career accomplishments or metrics',
    iconName: 'TrendingUp',
    createDefault: () => ({
      id: generateId('comp_stat'),
      type: 'statCard',
      props: {
        value: '7+',
        label: 'Years of Experience',
        trend: 'Delivering production systems',
        suffix: 'yrs',
      },
    }),
  },
  {
    type: 'skillPills',
    label: 'Skill Cloud / Matrix',
    category: 'Data & Bio',
    description: 'List of technologies, frameworks, or competencies',
    iconName: 'Layers',
    createDefault: () => ({
      id: generateId('comp_skills'),
      type: 'skillPills',
      props: {
        category: 'Core Technologies',
        skills: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS'],
        colored: true,
      },
    }),
  },
  {
    type: 'projectCard',
    label: 'Project Card',
    category: 'Data & Bio',
    description: 'Portfolio piece showcase card with tags and live URLs',
    iconName: 'FolderGit2',
    createDefault: () => ({
      id: generateId('comp_project'),
      type: 'projectCard',
      props: {
        title: 'Nexus Cloud Analytics',
        description: 'Real-time telemetry and metrics ingestion pipeline processing over 10M events daily with sub-second latency dashboards.',
        tags: ['Next.js 16', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Redis'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        demoUrl: 'https://example.com/demo',
        githubUrl: 'https://github.com/example/nexus',
        featured: true,
      },
    }),
  },
  {
    type: 'experienceItem',
    label: 'Experience Timeline Node',
    category: 'Data & Bio',
    description: 'Work history or education timeline item',
    iconName: 'Briefcase',
    createDefault: () => ({
      id: generateId('comp_exp'),
      type: 'experienceItem',
      props: {
        role: 'Staff Software Engineer',
        company: 'Vercel / Cloud Infrastructure',
        period: '2023 - Present',
        description: 'Led architecture for edge caching layer, resulting in 42% reduction in cold starts and improved global CDN performance.',
        technologies: ['Rust', 'TypeScript', 'Turbopack', 'Distributed Systems'],
        current: true,
      },
    }),
  },
  {
    type: 'testimonialCard',
    label: 'Testimonial / Endorsement',
    category: 'Data & Bio',
    description: 'Quote card with author attribution and role',
    iconName: 'Quote',
    createDefault: () => ({
      id: generateId('comp_testi'),
      type: 'testimonialCard',
      props: {
        quote: 'Alex is an exceptional engineer who bridges the gap between deep technical architecture and intuitive product design. Any team would be lucky to have them.',
        author: 'Sarah Chen',
        role: 'VP of Product',
        company: 'Stripe',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
    }),
  },
  {
    type: 'divider',
    label: 'Divider',
    category: 'Layout',
    description: 'Visual separation line or gradient rule',
    iconName: 'Minus',
    createDefault: () => ({
      id: generateId('comp_div'),
      type: 'divider',
      props: {
        style: 'gradient',
        thickness: '1',
      },
    }),
  },
];

export const PREBUILT_SECTIONS: SectionMeta[] = [
  {
    type: 'hero',
    label: 'Hero Header',
    description: 'High impact introduction with badge, heading, bio, and dual action buttons',
    iconName: 'Sparkles',
    createDefault: () => ({
      id: generateId('sec_hero'),
      type: 'hero',
      title: 'Hero Section',
      subtitle: 'Primary landing area',
      styles: {
        paddingY: 'xl',
        containerWidth: 'boxed',
      },
      components: [
        {
          id: generateId('c_badge'),
          type: 'badge',
          props: { label: '🟢 Available for select contracts & full-time roles', variant: 'glow' },
        },
        {
          id: generateId('c_h1'),
          type: 'heading',
          props: { text: "Hi, I'm Alex. I engineer scalable web platforms and refined digital tools.", level: 'h1', gradient: true },
          styles: { fontSize: '3.75rem', fontWeight: '800' },
        },
        {
          id: generateId('c_p'),
          type: 'paragraph',
          props: { text: 'Senior Full-Stack Engineer with 8+ years crafting resilient systems and high-converting web apps. Obsessed with performance, clean code, and delightful developer experiences.' },
          styles: { fontSize: '1.25rem' },
        },
        {
          id: generateId('c_actions'),
          type: 'container',
          props: { layout: 'horizontal', gap: 'md' },
          children: [
            {
              id: generateId('c_btn_1'),
              type: 'button',
              props: { label: 'Explore Featured Work', url: '#projects', variant: 'primary', size: 'lg' },
            },
            {
              id: generateId('c_btn_2'),
              type: 'button',
              props: { label: 'Book a Strategy Chat', url: '#contact', variant: 'outline', size: 'lg' },
            },
          ],
        },
        {
          id: generateId('c_socials'),
          type: 'socialLinks',
          props: {
            links: [
              { platform: 'github', url: 'https://github.com' },
              { platform: 'linkedin', url: 'https://linkedin.com' },
              { platform: 'twitter', url: 'https://x.com' },
            ],
            variant: 'icons',
          },
        },
      ],
    }),
  },
  {
    type: 'about',
    label: 'About & Metrics',
    description: 'Biography accompanied by key achievements and stat counters',
    iconName: 'User',
    createDefault: () => ({
      id: generateId('sec_about'),
      type: 'about',
      title: 'About Me',
      subtitle: 'Background & Approach',
      styles: {
        paddingY: 'lg',
        containerWidth: 'boxed',
      },
      components: [
        {
          id: generateId('c_about_h'),
          type: 'heading',
          props: { text: 'About Me', level: 'h2' },
          styles: { fontSize: '2.25rem', fontWeight: '700' },
        },
        {
          id: generateId('c_about_p'),
          type: 'paragraph',
          props: { text: "Over the last decade, I've worked across fast-growing startups and enterprise platforms. My philosophy centers on building software that is not just functionally robust, but deeply empathetic to the human on the other side of the screen." },
        },
        {
          id: generateId('c_stats_grid'),
          type: 'container',
          props: { layout: 'grid-3', gap: 'md' },
          children: [
            {
              id: generateId('stat_1'),
              type: 'statCard',
              props: { value: '8+', label: 'Years in Industry', suffix: 'yrs' },
            },
            {
              id: generateId('stat_2'),
              type: 'statCard',
              props: { value: '140k', label: 'Monthly Active Users Served', suffix: '+' },
            },
            {
              id: generateId('stat_3'),
              type: 'statCard',
              props: { value: '99.99%', label: 'Production Uptime Maintained' },
            },
          ],
        },
      ],
    }),
  },
  {
    type: 'projects',
    label: 'Featured Projects Grid',
    description: 'Curated showcase of high-impact portfolio pieces with tags & links',
    iconName: 'Briefcase',
    createDefault: () => ({
      id: generateId('sec_proj'),
      type: 'projects',
      title: 'Selected Work',
      subtitle: 'Projects that made a measurable impact',
      styles: {
        paddingY: 'lg',
        containerWidth: 'boxed',
      },
      components: [
        {
          id: generateId('c_p_h2'),
          type: 'heading',
          props: { text: 'Selected Projects', level: 'h2' },
          styles: { fontSize: '2.5rem', fontWeight: '700' },
        },
        {
          id: generateId('c_p_sub'),
          type: 'paragraph',
          props: { text: 'A collection of recent applications, open-source libraries, and client deliverables.' },
        },
        {
          id: generateId('c_proj_grid'),
          type: 'container',
          props: { layout: 'grid-2', gap: 'lg' },
          children: [
            {
              id: generateId('p1'),
              type: 'projectCard',
              props: {
                title: 'Pulse Analytics Engine',
                description: 'Real-time telemetry infrastructure supporting million-event burst traffic with real-time web socket charts.',
                tags: ['Next.js', 'TypeScript', 'Tailwind', 'Go', 'ClickHouse'],
                imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                demoUrl: 'https://example.com',
                githubUrl: 'https://github.com',
                featured: true,
              },
            },
            {
              id: generateId('p2'),
              type: 'projectCard',
              props: {
                title: 'Aura Design System',
                description: 'Accessible, token-driven component architecture adopted across 14 enterprise frontend microservices.',
                tags: ['React', 'Figma API', 'Radix UI', 'CSS Modules'],
                imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                demoUrl: 'https://example.com',
                githubUrl: 'https://github.com',
                featured: false,
              },
            },
          ],
        },
      ],
    }),
  },
  {
    type: 'skills',
    label: 'Skills & Tech Stack',
    description: 'Categorized badges or interactive skill clusters',
    iconName: 'Cpu',
    createDefault: () => ({
      id: generateId('sec_skills'),
      type: 'skills',
      title: 'Skills & Capabilities',
      subtitle: 'Technical toolkit and domains',
      styles: {
        paddingY: 'lg',
        containerWidth: 'boxed',
      },
      components: [
        {
          id: generateId('c_sk_h2'),
          type: 'heading',
          props: { text: 'Technical Expertise', level: 'h2' },
          styles: { fontSize: '2.25rem', fontWeight: '700' },
        },
        {
          id: generateId('c_sk_1'),
          type: 'skillPills',
          props: {
            category: 'Frontend & Architecture',
            skills: ['TypeScript', 'React 19', 'Next.js 16', 'Tailwind CSS', 'Turbopack', 'GraphQL', 'State Machines'],
            colored: true,
          },
        },
        {
          id: generateId('c_sk_2'),
          type: 'skillPills',
          props: {
            category: 'Backend & Cloud Infra',
            skills: ['Node.js', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'AWS Lambda', 'Neon DB'],
            colored: true,
          },
        },
      ],
    }),
  },
  {
    type: 'experience',
    label: 'Career Experience',
    description: 'Chronological timeline of roles, companies, and achievements',
    iconName: 'Clock',
    createDefault: () => ({
      id: generateId('sec_exp'),
      type: 'experience',
      title: 'Experience',
      subtitle: 'Where I have worked',
      styles: {
        paddingY: 'lg',
        containerWidth: 'boxed',
      },
      components: [
        {
          id: generateId('c_exp_h2'),
          type: 'heading',
          props: { text: 'Work Experience', level: 'h2' },
          styles: { fontSize: '2.25rem', fontWeight: '700' },
        },
        {
          id: generateId('exp_1'),
          type: 'experienceItem',
          props: {
            role: 'Lead Full-Stack Architect',
            company: 'Starlight Labs',
            period: '2023 - Present',
            description: 'Directing the architecture of our multi-tenant SaaS. Scaled daily query volume by 300% without increasing database server footprint.',
            technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Docker'],
            current: true,
          },
        },
        {
          id: generateId('exp_2'),
          type: 'experienceItem',
          props: {
            role: 'Senior Software Engineer',
            company: 'Vanguard Digital',
            period: '2020 - 2023',
            description: 'Engineered high-frequency payment processing pipelines and created automated developer testing tooling.',
            technologies: ['React', 'Node.js', 'Redis', 'Jest'],
            current: false,
          },
        },
      ],
    }),
  },
  {
    type: 'testimonials',
    label: 'Client Testimonials',
    description: 'Quotes and praise from collaborators, managers, or clients',
    iconName: 'MessageSquareQuote',
    createDefault: () => ({
      id: generateId('sec_testi'),
      type: 'testimonials',
      title: 'Testimonials',
      subtitle: 'Kind words from colleagues and clients',
      styles: {
        paddingY: 'lg',
        containerWidth: 'boxed',
      },
      components: [
        {
          id: generateId('c_testi_h'),
          type: 'heading',
          props: { text: 'What People Say', level: 'h2' },
          styles: { fontSize: '2.25rem', fontWeight: '700' },
        },
        {
          id: generateId('c_testi_grid'),
          type: 'container',
          props: { layout: 'grid-2', gap: 'md' },
          children: [
            {
              id: generateId('testi_1'),
              type: 'testimonialCard',
              props: {
                quote: 'Alex delivered our customer platform ahead of schedule with unbelievable attention to detail. Our speed to market doubled.',
                author: 'Elena Rostova',
                role: 'Chief Technology Officer',
                company: 'HyperFlow',
                rating: 5,
              },
            },
            {
              id: generateId('testi_2'),
              type: 'testimonialCard',
              props: {
                quote: 'One of the sharpest engineers I have ever worked with. Great communicator, proactive problem solver, and an absolute pleasure to have on the team.',
                author: 'Marcus Vance',
                role: 'VP of Engineering',
                company: 'Aether Cloud',
                rating: 5,
              },
            },
          ],
        },
      ],
    }),
  },
  {
    type: 'contact',
    label: 'Contact & Hire CTA',
    description: 'Direct contact section with email, calendar booking, and social touchpoints',
    iconName: 'Mail',
    createDefault: () => ({
      id: generateId('sec_contact'),
      type: 'contact',
      title: 'Get In Touch',
      subtitle: 'Start a conversation',
      styles: {
        paddingY: 'xl',
        containerWidth: 'boxed',
      },
      components: [
        {
          id: generateId('c_con_badge'),
          type: 'badge',
          props: { label: "Let's Connect", variant: 'default' },
        },
        {
          id: generateId('c_con_h2'),
          type: 'heading',
          props: { text: "Have a project in mind or want to collaborate? Let's talk.", level: 'h2' },
          styles: { fontSize: '2.5rem', fontWeight: '700' },
        },
        {
          id: generateId('c_con_p'),
          type: 'paragraph',
          props: { text: 'Whether you have a specific opening, contract opportunity, or just want to discuss software craftsmanship, my inbox is always open.' },
        },
        {
          id: generateId('c_con_actions'),
          type: 'container',
          props: { layout: 'horizontal', gap: 'md' },
          children: [
            {
              id: generateId('c_con_btn1'),
              type: 'button',
              props: { label: 'Send an Email', url: 'mailto:alex@example.com', variant: 'primary', size: 'lg' },
            },
            {
              id: generateId('c_con_btn2'),
              type: 'button',
              props: { label: 'Schedule 15m Chat', url: 'https://calendly.com', variant: 'secondary', size: 'lg' },
            },
          ],
        },
        {
          id: generateId('c_con_socials'),
          type: 'socialLinks',
          props: {
            links: [
              { platform: 'github', url: 'https://github.com' },
              { platform: 'linkedin', url: 'https://linkedin.com' },
              { platform: 'twitter', url: 'https://x.com' },
            ],
            variant: 'pills',
          },
        },
      ],
    }),
  },
];
