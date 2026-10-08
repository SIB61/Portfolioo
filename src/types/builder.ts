export type ComponentType =
  | 'heading'
  | 'paragraph'
  | 'button'
  | 'badge'
  | 'avatar'
  | 'image'
  | 'socialLinks'
  | 'statCard'
  | 'skillPills'
  | 'projectCard'
  | 'experienceItem'
  | 'testimonialCard'
  | 'divider'
  | 'container';

export type Alignment = 'left' | 'center' | 'right';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ComponentStyles {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: Alignment;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  boxShadow?: string;
  opacity?: number;
  width?: string;
  maxWidth?: string;
}

export interface HeadingProps {
  text: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  gradient?: boolean;
}

export interface ParagraphProps {
  text: string;
}

export interface ButtonProps {
  label: string;
  url: string;
  variant: ButtonVariant;
  size: ComponentSize;
  icon?: string;
  targetBlank?: boolean;
}

export interface BadgeProps {
  label: string;
  variant: 'default' | 'outline' | 'glow' | 'accent';
  icon?: string;
}

export interface AvatarProps {
  imageUrl: string;
  altText: string;
  name: string;
  statusBadge?: string;
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface ImageProps {
  url: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  rounded?: 'none' | 'md' | 'xl' | 'full';
  shadow?: boolean;
}

export interface SocialLinkItem {
  platform: 'github' | 'linkedin' | 'twitter' | 'website' | 'email' | 'dribbble' | 'youtube' | 'medium';
  url: string;
  label?: string;
}

export interface SocialLinksProps {
  links: SocialLinkItem[];
  variant?: 'icons' | 'pills' | 'minimal';
}

export interface StatCardProps {
  value: string;
  label: string;
  trend?: string;
  prefix?: string;
  suffix?: string;
}

export interface SkillPillsProps {
  skills: string[];
  category?: string;
  colored?: boolean;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
  current?: boolean;
}

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
}

export interface DividerProps {
  style: 'solid' | 'dashed' | 'gradient';
  thickness?: '1' | '2' | '4';
}

export interface ContainerProps {
  layout: 'vertical' | 'horizontal' | 'grid-2' | 'grid-3' | 'grid-4';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between';
}

export type AnyComponentProps =
  | HeadingProps
  | ParagraphProps
  | ButtonProps
  | BadgeProps
  | AvatarProps
  | ImageProps
  | SocialLinksProps
  | StatCardProps
  | SkillPillsProps
  | ProjectCardProps
  | ExperienceItemProps
  | TestimonialCardProps
  | DividerProps
  | ContainerProps
  | Record<string, any>;

export interface ComponentNode {
  id: string;
  type: ComponentType;
  props: AnyComponentProps;
  styles?: ComponentStyles;
  children?: ComponentNode[]; // For container components
}

export type SectionType =
  | 'hero'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'services'
  | 'testimonials'
  | 'contact'
  | 'footer'
  | 'custom';

export interface SectionStyles {
  backgroundColor?: string;
  backgroundGradient?: string;
  textColor?: string;
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerWidth?: 'boxed' | 'wide' | 'full';
  borderTop?: boolean;
  borderBottom?: boolean;
}

export interface SectionNode {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  components: ComponentNode[];
  styles: SectionStyles;
  visible?: boolean;
}

export interface PageNode {
  id: string;
  name: string;
  slug: string;
  sections: SectionNode[];
  seo: {
    title: string;
    description: string;
  };
}

export interface ThemeConfig {
  name: string;
  mode: 'dark' | 'light';
  palette: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  profession: string;
  description: string;
  thumbnail?: string;
  theme: ThemeConfig;
  pages: PageNode[];
  activePageId: string;
}

export type DeviceViewport = 'desktop' | 'tablet' | 'mobile';
