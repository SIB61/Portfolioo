'use client';

import React from 'react';
import {
  ComponentNode,
  HeadingProps,
  ParagraphProps,
  ButtonProps,
  BadgeProps,
  AvatarProps,
  ImageProps,
  SocialLinksProps,
  StatCardProps,
  SkillPillsProps,
  ProjectCardProps,
  ExperienceItemProps,
  TestimonialCardProps,
  DividerProps,
  ContainerProps,
  ThemeConfig,
} from '@/types/builder';
import {
  Mail,
  ExternalLink,
  Globe,
  Star,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const DribbbleIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
    <path d="M8.56 2.75c4.37 6 6 11.53 7.07 18.5" />
  </svg>
);

interface ComponentRendererProps {
  component: ComponentNode;
  theme: ThemeConfig;
  isBuilderMode?: boolean;
  isSelected?: boolean;
  onSelect?: (e: React.MouseEvent) => void;
  onDelete?: () => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  theme,
  isBuilderMode = false,
  isSelected = false,
  onSelect,
}) => {
  const { type, props, styles = {} } = component;

  // Helper for border radius class
  const getRadiusClass = (override?: string) => {
    if (override) return override;
    switch (theme.borderRadius) {
      case 'none':
        return 'rounded-none';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  // Render by component type
  const renderContent = () => {
    switch (type) {
      case 'heading': {
        const p = props as HeadingProps;
        const HeadingTag = p.level || 'h2';
        const isGradient = p.gradient;

        return (
          <HeadingTag
            style={{
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              textAlign: styles.textAlign,
              color: isGradient ? undefined : (styles.color || theme.palette.text),
            }}
            className={`tracking-tight transition-colors ${
              isGradient
                ? 'bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent'
                : ''
            }`}
          >
            {p.text}
          </HeadingTag>
        );
      }

      case 'paragraph': {
        const p = props as ParagraphProps;
        return (
          <p
            style={{
              fontSize: styles.fontSize,
              textAlign: styles.textAlign,
              color: styles.color || theme.palette.textMuted,
            }}
            className="leading-relaxed max-w-3xl"
          >
            {p.text}
          </p>
        );
      }

      case 'button': {
        const p = props as ButtonProps;
        const variant = p.variant || 'primary';
        const sizeClasses =
          p.size === 'sm'
            ? 'px-3.5 py-1.5 text-xs'
            : p.size === 'lg'
            ? 'px-6 py-3.5 text-base font-semibold'
            : 'px-5 py-2.5 text-sm font-medium';

        let variantStyle: React.CSSProperties = {};
        let extraClasses = '';

        if (variant === 'primary') {
          variantStyle = {
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
          };
          extraClasses = 'hover:opacity-90 shadow-md shadow-blue-500/20 active:scale-95';
        } else if (variant === 'secondary') {
          variantStyle = {
            backgroundColor: theme.palette.surfaceAlt,
            color: theme.palette.text,
            borderColor: theme.palette.border,
          };
          extraClasses = 'border hover:bg-opacity-80 active:scale-95';
        } else if (variant === 'outline') {
          variantStyle = {
            borderColor: theme.palette.border,
            color: theme.palette.text,
          };
          extraClasses = 'border hover:border-gray-400 dark:hover:border-gray-500 active:scale-95';
        } else if (variant === 'glow') {
          variantStyle = {
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            boxShadow: `0 0 20px ${theme.palette.primary}66`,
          };
          extraClasses = 'hover:opacity-95 active:scale-95';
        } else {
          // ghost
          variantStyle = { color: theme.palette.textMuted };
          extraClasses = 'hover:text-white hover:bg-white/5';
        }

        return (
          <a
            href={isBuilderMode ? undefined : (p.url || '#')}
            target={p.targetBlank ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={variantStyle}
            className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 ${sizeClasses} ${getRadiusClass() } ${extraClasses}`}
            onClick={(e) => {
              if (isBuilderMode) e.preventDefault();
            }}
          >
            <span>{p.label}</span>
            <ArrowUpRight className="w-4 h-4 opacity-75" />
          </a>
        );
      }

      case 'badge': {
        const p = props as BadgeProps;
        return (
          <span
            style={{
              borderColor: theme.palette.border,
              backgroundColor: theme.palette.surfaceAlt,
              color: theme.palette.text,
            }}
            className={`inline-flex items-center gap-2 px-3.5 py-1 text-xs font-medium border shadow-sm ${getRadiusClass(
              'rounded-full'
            )}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{p.label}</span>
          </span>
        );
      }

      case 'avatar': {
        const p = props as AvatarProps;
        const sizeDim =
          p.size === 'sm'
            ? 'w-10 h-10'
            : p.size === 'lg'
            ? 'w-20 h-20'
            : p.size === 'xl'
            ? 'w-28 h-28'
            : p.size === '2xl'
            ? 'w-36 h-36'
            : 'w-14 h-14';

        return (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.imageUrl}
              alt={p.altText || p.name}
              className={`${sizeDim} rounded-full object-cover ring-2 ring-blue-500/30 shadow-lg`}
            />
            {p.statusBadge && (
              <span className="absolute bottom-0 right-0 px-2 py-0.5 text-[10px] font-semibold bg-emerald-500 text-white rounded-full ring-2 ring-zinc-900 shadow">
                {p.statusBadge}
              </span>
            )}
          </div>
        );
      }

      case 'image': {
        const p = props as ImageProps;
        const aspectClass =
          p.aspectRatio === 'square'
            ? 'aspect-square'
            : p.aspectRatio === 'portrait'
            ? 'aspect-[3/4]'
            : 'aspect-video';

        return (
          <figure className="overflow-hidden w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              alt={p.alt}
              className={`w-full object-cover transition-transform duration-300 hover:scale-[1.02] ${aspectClass} ${
                p.rounded === 'xl'
                  ? 'rounded-2xl'
                  : p.rounded === 'md'
                  ? 'rounded-lg'
                  : 'rounded-none'
              } ${p.shadow ? 'shadow-2xl' : ''}`}
            />
            {p.caption && (
              <figcaption
                style={{ color: theme.palette.textMuted }}
                className="mt-2 text-xs text-center"
              >
                {p.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case 'socialLinks': {
        const p = props as SocialLinksProps;
        const getIcon = (platform: string) => {
          switch (platform) {
            case 'github':
              return <GithubIcon className="w-4 h-4" />;
            case 'linkedin':
              return <LinkedinIcon className="w-4 h-4" />;
            case 'twitter':
              return <TwitterIcon className="w-4 h-4" />;
            case 'email':
              return <Mail className="w-4 h-4" />;
            case 'youtube':
              return <YoutubeIcon className="w-4 h-4" />;
            case 'dribbble':
              return <DribbbleIcon className="w-4 h-4" />;
            default:
              return <Globe className="w-4 h-4" />;
          }
        };

        return (
          <div className="flex flex-wrap items-center gap-2.5">
            {p.links?.map((link, idx) => (
              <a
                key={idx}
                href={isBuilderMode ? undefined : link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: theme.palette.surfaceAlt,
                  color: theme.palette.text,
                  borderColor: theme.palette.border,
                }}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border transition-colors hover:border-blue-500/50 hover:text-blue-400 ${getRadiusClass()}`}
                onClick={(e) => {
                  if (isBuilderMode) e.preventDefault();
                }}
              >
                {getIcon(link.platform)}
                <span className="capitalize">{link.label || link.platform}</span>
              </a>
            ))}
          </div>
        );
      }

      case 'statCard': {
        const p = props as StatCardProps;
        return (
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderColor: theme.palette.border,
            }}
            className={`p-6 border transition-all hover:border-blue-500/40 ${getRadiusClass()}`}
          >
            <div className="flex items-baseline gap-1">
              <span
                style={{ color: theme.palette.text }}
                className="text-3xl font-extrabold tracking-tight"
              >
                {p.value}
              </span>
              {p.suffix && (
                <span style={{ color: theme.palette.primary }} className="text-xl font-bold">
                  {p.suffix}
                </span>
              )}
            </div>
            <p
              style={{ color: theme.palette.textMuted }}
              className="mt-1 text-sm font-medium"
            >
              {p.label}
            </p>
            {p.trend && (
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                {p.trend}
              </span>
            )}
          </div>
        );
      }

      case 'skillPills': {
        const p = props as SkillPillsProps;
        return (
          <div className="space-y-3">
            {p.category && (
              <h4
                style={{ color: theme.palette.text }}
                className="text-sm font-semibold tracking-wide uppercase text-zinc-400"
              >
                {p.category}
              </h4>
            )}
            <div className="flex flex-wrap gap-2">
              {p.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: theme.palette.surfaceAlt,
                    borderColor: theme.palette.border,
                    color: theme.palette.text,
                  }}
                  className={`px-3 py-1 text-xs font-medium border transition-all hover:border-blue-500 hover:scale-105 ${getRadiusClass()}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      }

      case 'projectCard': {
        const p = props as ProjectCardProps;
        return (
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderColor: theme.palette.border,
            }}
            className={`group overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-1 ${getRadiusClass()}`}
          >
            {p.imageUrl && (
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.featured && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 text-[11px] font-semibold bg-blue-600 text-white rounded-full shadow-lg">
                    Featured
                  </span>
                )}
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  style={{ color: theme.palette.text }}
                  className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors"
                >
                  {p.title}
                </h3>
                <p
                  style={{ color: theme.palette.textMuted }}
                  className="mt-2 text-sm leading-relaxed"
                >
                  {p.description}
                </p>
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: theme.palette.surfaceAlt,
                          color: theme.palette.textMuted,
                        }}
                        className="px-2 py-0.5 text-[11px] font-mono rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {(p.demoUrl || p.githubUrl) && (
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-4 text-xs font-semibold">
                  {p.demoUrl && (
                    <a
                      href={isBuilderMode ? undefined : p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Preview
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={isBuilderMode ? undefined : p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.palette.textMuted }}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> Source Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'experienceItem': {
        const p = props as ExperienceItemProps;
        return (
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderColor: theme.palette.border,
            }}
            className={`p-6 border transition-all hover:border-zinc-700 ${getRadiusClass()}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4
                  style={{ color: theme.palette.text }}
                  className="text-lg font-bold tracking-tight"
                >
                  {p.role}
                </h4>
                <p style={{ color: theme.palette.primary }} className="text-sm font-semibold">
                  {p.company}
                </p>
              </div>
              <span
                style={{
                  backgroundColor: theme.palette.surfaceAlt,
                  color: theme.palette.textMuted,
                }}
                className="px-2.5 py-1 text-xs font-mono rounded w-fit"
              >
                {p.period}
              </span>
            </div>
            <p
              style={{ color: theme.palette.textMuted }}
              className="mt-3 text-sm leading-relaxed"
            >
              {p.description}
            </p>
            {p.technologies && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: theme.palette.surfaceAlt,
                      color: theme.palette.textMuted,
                    }}
                    className="px-2 py-0.5 text-[10px] rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'testimonialCard': {
        const p = props as TestimonialCardProps;
        return (
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderColor: theme.palette.border,
            }}
            className={`p-6 border flex flex-col justify-between ${getRadiusClass()}`}
          >
            <div>
              {p.rating && (
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {Array.from({ length: p.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              )}
              <blockquote
                style={{ color: theme.palette.text }}
                className="text-sm italic leading-relaxed"
              >
                &ldquo;{p.quote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {p.avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.avatarUrl}
                  alt={p.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                />
              )}
              <div>
                <p style={{ color: theme.palette.text }} className="text-sm font-bold">
                  {p.author}
                </p>
                <p style={{ color: theme.palette.textMuted }} className="text-xs">
                  {p.role} {p.company ? `• ${p.company}` : ''}
                </p>
              </div>
            </div>
          </div>
        );
      }

      case 'divider': {
        const p = props as DividerProps;
        return (
          <div className="py-4 w-full">
            {p.style === 'gradient' ? (
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            ) : (
              <div
                style={{ borderColor: theme.palette.border }}
                className={`w-full border-t ${p.style === 'dashed' ? 'border-dashed' : ''}`}
              />
            )}
          </div>
        );
      }

      case 'container': {
        const p = props as ContainerProps;
        const layoutClass =
          p.layout === 'horizontal'
            ? 'flex flex-wrap items-center'
            : p.layout === 'grid-2'
            ? 'grid grid-cols-1 md:grid-cols-2'
            : p.layout === 'grid-3'
            ? 'grid grid-cols-1 md:grid-cols-3'
            : p.layout === 'grid-4'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
            : 'flex flex-col';

        const gapClass =
          p.gap === 'sm'
            ? 'gap-3'
            : p.gap === 'lg'
            ? 'gap-8'
            : p.gap === 'xl'
            ? 'gap-12'
            : 'gap-6';

        return (
          <div className={`${layoutClass} ${gapClass} w-full`}>
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                theme={theme}
                isBuilderMode={isBuilderMode}
              />
            ))}
          </div>
        );
      }

      default:
        return <div>Unknown Component</div>;
    }
  };

  if (!isBuilderMode) {
    return renderContent();
  }

  return (
    <div
      onClick={onSelect}
      className={`relative group/comp transition-all duration-150 ${
        isSelected
          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950 rounded-md'
          : 'hover:ring-1 hover:ring-blue-400/50 hover:ring-dashed rounded-md'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-6 left-0 z-30 px-2 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-t shadow">
          {component.type.toUpperCase()}
        </div>
      )}
      {renderContent()}
    </div>
  );
};
