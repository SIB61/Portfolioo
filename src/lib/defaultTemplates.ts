import { PortfolioTemplate, ThemeConfig } from '@/types/builder';
import { PREBUILT_SECTIONS, generateId } from './componentLibrary';

export const THEME_PRESETS: Record<string, ThemeConfig> = {
  modernDark: {
    name: 'Modern Dark',
    mode: 'dark',
    palette: {
      primary: '#3b82f6', // Bright blue
      secondary: '#6366f1', // Indigo
      background: '#09090b', // Deep zinc
      surface: '#18181b', // Zinc 900
      surfaceAlt: '#27272a', // Zinc 800
      text: '#fafafa', // White
      textMuted: '#a1a1aa', // Zinc 400
      border: '#27272a', // Zinc 800
      accent: '#38bdf8', // Sky
    },
    typography: {
      headingFont: 'var(--font-geist-sans), sans-serif',
      bodyFont: 'var(--font-geist-sans), sans-serif',
    },
    borderRadius: 'lg',
  },
  emeraldTech: {
    name: 'Cyber Emerald',
    mode: 'dark',
    palette: {
      primary: '#10b981', // Emerald
      secondary: '#059669', // Dark Emerald
      background: '#060d0b', // Deep Emerald Black
      surface: '#0f1f1a', // Dark Teal
      surfaceAlt: '#162e27',
      text: '#f0fdf4',
      textMuted: '#86efac',
      border: '#1f4137',
      accent: '#34d399',
    },
    typography: {
      headingFont: 'var(--font-geist-sans), sans-serif',
      bodyFont: 'var(--font-geist-sans), sans-serif',
    },
    borderRadius: 'md',
  },
  minimalClean: {
    name: 'Minimal Light',
    mode: 'light',
    palette: {
      primary: '#18181b', // Zinc 900
      secondary: '#3f3f46',
      background: '#ffffff',
      surface: '#f4f4f5',
      surfaceAlt: '#e4e4e7',
      text: '#09090b',
      textMuted: '#71717a',
      border: '#e4e4e7',
      accent: '#2563eb',
    },
    typography: {
      headingFont: 'var(--font-geist-sans), sans-serif',
      bodyFont: 'var(--font-geist-sans), sans-serif',
    },
    borderRadius: 'md',
  },
  editorialWarm: {
    name: 'Warm Studio',
    mode: 'dark',
    palette: {
      primary: '#f97316', // Orange
      secondary: '#ea580c',
      background: '#0c0a09', // Warm stone
      surface: '#1c1917',
      surfaceAlt: '#292524',
      text: '#fafaf9',
      textMuted: '#a8a29e',
      border: '#292524',
      accent: '#fb923c',
    },
    typography: {
      headingFont: 'var(--font-geist-sans), sans-serif',
      bodyFont: 'var(--font-geist-sans), sans-serif',
    },
    borderRadius: 'xl',
  },
  violetLuxe: {
    name: 'Violet Luxe',
    mode: 'dark',
    palette: {
      primary: '#8b5cf6', // Violet
      secondary: '#a855f7', // Purple
      background: '#090514',
      surface: '#130d24',
      surfaceAlt: '#1e1438',
      text: '#f5f3ff',
      textMuted: '#c4b5fd',
      border: '#2a1e4c',
      accent: '#c084fc',
    },
    typography: {
      headingFont: 'var(--font-geist-sans), sans-serif',
      bodyFont: 'var(--font-geist-sans), sans-serif',
    },
    borderRadius: 'lg',
  },
};

export const DEFAULT_DEVELOPER_TEMPLATE: PortfolioTemplate = {
  id: 'template_software_engineer',
  name: 'DevCraft Pro',
  profession: 'Senior Software Engineer',
  description: 'Clean, high-performance portfolio tailored for software engineers, tech leads, and distributed systems developers.',
  thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  theme: THEME_PRESETS.modernDark,
  activePageId: 'page_home',
  pages: [
    {
      id: 'page_home',
      name: 'Home',
      slug: '/',
      seo: {
        title: 'Alex Rivera — Senior Software Engineer',
        description: 'Portfolio of Alex Rivera, building resilient cloud platforms and high performance web apps.',
      },
      sections: [
        PREBUILT_SECTIONS[0].createDefault(), // Hero
        PREBUILT_SECTIONS[1].createDefault(), // About
        PREBUILT_SECTIONS[2].createDefault(), // Projects
        PREBUILT_SECTIONS[3].createDefault(), // Skills
        PREBUILT_SECTIONS[4].createDefault(), // Experience
        PREBUILT_SECTIONS[5].createDefault(), // Testimonials
        PREBUILT_SECTIONS[6].createDefault(), // Contact
      ],
    },
    {
      id: 'page_projects',
      name: 'Projects',
      slug: '/projects',
      seo: {
        title: 'All Projects — Alex Rivera',
        description: 'Complete archive of open source and commercial projects.',
      },
      sections: [
        {
          id: generateId('sec_p_head'),
          type: 'hero',
          title: 'Project Archive',
          subtitle: 'Open-source and enterprise builds',
          styles: { paddingY: 'lg', containerWidth: 'boxed' },
          components: [
            {
              id: generateId('c_ph1'),
              type: 'heading',
              props: { text: 'Engineering Work & Open Source', level: 'h1', gradient: true },
              styles: { fontSize: '3rem', fontWeight: '800' },
            },
            {
              id: generateId('c_pp1'),
              type: 'paragraph',
              props: { text: 'A deep dive into platforms I have engineered, libraries I maintain, and technical architecture experiments.' },
            },
          ],
        },
        PREBUILT_SECTIONS[2].createDefault(),
      ],
    },
    {
      id: 'page_contact',
      name: 'Contact',
      slug: '/contact',
      seo: {
        title: 'Contact — Alex Rivera',
        description: 'Get in touch for consulting, technical advisory, or engineering leadership opportunities.',
      },
      sections: [
        PREBUILT_SECTIONS[6].createDefault(),
      ],
    },
  ],
};

export const DEFAULT_DESIGNER_TEMPLATE: PortfolioTemplate = {
  id: 'template_product_designer',
  name: 'Studio Minimal',
  profession: 'Product & UI/UX Designer',
  description: 'Editorial aesthetic with focus on case studies, visual hierarchy, typography, and interaction craft.',
  thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
  theme: THEME_PRESETS.editorialWarm,
  activePageId: 'page_home',
  pages: [
    {
      id: 'page_home',
      name: 'Home',
      slug: '/',
      seo: {
        title: 'Maya Lin — Staff Product Designer',
        description: 'Portfolio of Maya Lin, crafting systemic interfaces and delightful digital products.',
      },
      sections: [
        {
          id: generateId('sec_d_hero'),
          type: 'hero',
          title: 'Design Hero',
          styles: { paddingY: 'xl', containerWidth: 'boxed' },
          components: [
            {
              id: generateId('c_d_badge'),
              type: 'badge',
              props: { label: 'Product Designer @ FinScale', variant: 'glow' },
            },
            {
              id: generateId('c_d_h1'),
              type: 'heading',
              props: { text: 'Designing clarity for complex software systems.', level: 'h1', gradient: false },
              styles: { fontSize: '4rem', fontWeight: '800' },
            },
            {
              id: generateId('c_d_p'),
              type: 'paragraph',
              props: { text: 'I partner with forward-thinking teams to design intuitive digital products, scalable design systems, and cohesive cross-platform experiences.' },
              styles: { fontSize: '1.25rem' },
            },
            {
              id: generateId('c_d_actions'),
              type: 'container',
              props: { layout: 'horizontal', gap: 'md' },
              children: [
                {
                  id: generateId('c_d_b1'),
                  type: 'button',
                  props: { label: 'View Case Studies', url: '#work', variant: 'primary', size: 'lg' },
                },
                {
                  id: generateId('c_d_b2'),
                  type: 'button',
                  props: { label: 'Get in Touch', url: '#contact', variant: 'outline', size: 'lg' },
                },
              ],
            },
          ],
        },
        PREBUILT_SECTIONS[2].createDefault(), // Projects / Case studies
        PREBUILT_SECTIONS[5].createDefault(), // Testimonials
        PREBUILT_SECTIONS[6].createDefault(), // Contact
      ],
    },
    {
      id: 'page_about',
      name: 'About',
      slug: '/about',
      seo: {
        title: 'About Maya Lin — Design Philosophy',
        description: 'My background, awards, and design process.',
      },
      sections: [
        PREBUILT_SECTIONS[1].createDefault(),
        PREBUILT_SECTIONS[4].createDefault(),
      ],
    },
  ],
};

export const DEFAULT_CONSULTANT_TEMPLATE: PortfolioTemplate = {
  id: 'template_consultant',
  name: 'Apex Advisory',
  profession: 'Strategy Consultant & Tech Advisor',
  description: 'Authority-focused portfolio for consultants, fraction CTOs, and executive advisors.',
  thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  theme: THEME_PRESETS.emeraldTech,
  activePageId: 'page_home',
  pages: [
    {
      id: 'page_home',
      name: 'Home',
      slug: '/',
      seo: {
        title: 'David Vance — Fractional CTO & Tech Advisor',
        description: 'Advising Series A-C tech startups on cloud infrastructure, scalability, and engineering management.',
      },
      sections: [
        {
          id: generateId('sec_c_hero'),
          type: 'hero',
          title: 'Consultant Hero',
          styles: { paddingY: 'xl', containerWidth: 'boxed' },
          components: [
            {
              id: generateId('c_c_badge'),
              type: 'badge',
              props: { label: 'Fractional CTO & Executive Advisor', variant: 'accent' },
            },
            {
              id: generateId('c_c_h1'),
              type: 'heading',
              props: { text: 'Scale your engineering organization without the costly missteps.', level: 'h1', gradient: true },
              styles: { fontSize: '3.5rem', fontWeight: '800' },
            },
            {
              id: generateId('c_c_p'),
              type: 'paragraph',
              props: { text: 'I guide high-growth tech ventures through infrastructure modernizations, team restructuring, and technical due diligence.' },
              styles: { fontSize: '1.25rem' },
            },
            {
              id: generateId('c_c_actions'),
              type: 'container',
              props: { layout: 'horizontal', gap: 'md' },
              children: [
                {
                  id: generateId('c_c_b1'),
                  type: 'button',
                  props: { label: 'Request Advisory Consultation', url: '#contact', variant: 'primary', size: 'lg' },
                },
                {
                  id: generateId('c_c_b2'),
                  type: 'button',
                  props: { label: 'Client Case Studies', url: '#projects', variant: 'secondary', size: 'lg' },
                },
              ],
            },
          ],
        },
        PREBUILT_SECTIONS[1].createDefault(), // Stats & Bio
        PREBUILT_SECTIONS[5].createDefault(), // Testimonials
        PREBUILT_SECTIONS[6].createDefault(), // Contact
      ],
    },
  ],
};

export const ALL_TEMPLATES: PortfolioTemplate[] = [
  DEFAULT_DEVELOPER_TEMPLATE,
  DEFAULT_DESIGNER_TEMPLATE,
  DEFAULT_CONSULTANT_TEMPLATE,
];
