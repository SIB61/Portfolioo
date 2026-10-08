'use client';

import React from 'react';
import { SectionNode, ThemeConfig } from '@/types/builder';
import { ComponentRenderer } from './ComponentRenderer';
import {
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  Settings,
  PlusCircle,
} from 'lucide-react';

interface SectionRendererProps {
  section: SectionNode;
  theme: ThemeConfig;
  isBuilderMode?: boolean;
  isSelected?: boolean;
  selectedComponentId?: string | null;
  onSelectSection?: () => void;
  onSelectComponent?: (componentId: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onOpenComponentPicker?: () => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  theme,
  isBuilderMode = false,
  isSelected = false,
  selectedComponentId,
  onSelectSection,
  onSelectComponent,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onOpenComponentPicker,
}) => {
  const { styles = {}, components = [] } = section;

  // Compute container width
  const getContainerWidth = () => {
    switch (styles.containerWidth) {
      case 'full':
        return 'w-full px-4 sm:px-8';
      case 'wide':
        return 'max-w-7xl mx-auto px-4 sm:px-8';
      case 'boxed':
      default:
        return 'max-w-5xl mx-auto px-4 sm:px-6';
    }
  };

  // Compute vertical padding
  const getPaddingY = () => {
    switch (styles.paddingY) {
      case 'none':
        return 'py-0';
      case 'sm':
        return 'py-8';
      case 'md':
        return 'py-14';
      case 'xl':
        return 'py-28';
      case 'lg':
      default:
        return 'py-20';
    }
  };

  const sectionBgStyle: React.CSSProperties = {
    backgroundColor: styles.backgroundColor || 'transparent',
    color: styles.textColor || theme.palette.text,
  };

  if (!isBuilderMode) {
    return (
      <section style={sectionBgStyle} className={`${getPaddingY()} relative transition-colors`}>
        <div className={getContainerWidth()}>
          <div className="space-y-8">
            {components.map((comp) => (
              <ComponentRenderer
                key={comp.id}
                component={comp}
                theme={theme}
                isBuilderMode={false}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      onClick={(e) => {
        // Prevent click bubbling
        if (e.target === e.currentTarget && onSelectSection) {
          onSelectSection();
        }
      }}
      style={sectionBgStyle}
      className={`relative group/sec transition-all duration-200 ${getPaddingY()} ${
        isSelected
          ? 'ring-2 ring-blue-500 shadow-xl'
          : 'hover:ring-1 hover:ring-zinc-600'
      }`}
    >
      {/* Floating Section Toolbar for Builder */}
      <div className="absolute top-2 right-4 z-20 flex items-center gap-1.5 opacity-0 group-hover/sec:opacity-100 transition-opacity bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 px-2.5 py-1.5 rounded-lg shadow-2xl">
        <span className="text-[11px] font-semibold text-zinc-300 mr-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {section.title || section.type}
        </span>

        {onMoveUp && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            title="Move Section Up"
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}

        {onMoveDown && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            title="Move Section Down"
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {onDuplicate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            title="Duplicate Section"
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}

        {onSelectSection && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectSection();
            }}
            title="Section Settings"
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete Section"
            className="p-1 hover:bg-red-500/20 rounded text-zinc-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className={getContainerWidth()}>
        <div className="space-y-8">
          {components.map((comp) => (
            <ComponentRenderer
              key={comp.id}
              component={comp}
              theme={theme}
              isBuilderMode={true}
              isSelected={selectedComponentId === comp.id}
              onSelect={(e) => {
                e.stopPropagation();
                if (onSelectComponent) onSelectComponent(comp.id);
              }}
            />
          ))}

          {components.length === 0 && (
            <div className="py-12 border-2 border-dashed border-zinc-700/60 rounded-xl text-center">
              <p className="text-sm text-zinc-400">Empty section. Add components below.</p>
            </div>
          )}
        </div>

        {/* Quick Add Component button inside section */}
        {onOpenComponentPicker && (
          <div className="mt-8 pt-4 border-t border-dashed border-zinc-800/80 flex justify-center opacity-0 group-hover/sec:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenComponentPicker();
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-full border border-zinc-700 shadow-sm transition-all hover:scale-105"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Add Component into this Section</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
