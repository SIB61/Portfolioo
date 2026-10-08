'use client';

import React from 'react';
import { PageNode, PortfolioTemplate } from '@/types/builder';
import { SectionRenderer } from './SectionRenderer';
import { Plus } from 'lucide-react';

interface PageRendererProps {
  page: PageNode;
  template: PortfolioTemplate;
  isBuilderMode?: boolean;
  selectedSectionId?: string | null;
  selectedComponentId?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onSelectComponent?: (sectionId: string, componentId: string) => void;
  onMoveSection?: (sectionId: string, direction: 'up' | 'down') => void;
  onDuplicateSection?: (sectionId: string) => void;
  onDeleteSection?: (sectionId: string) => void;
  onAddSectionAtIndex?: (index: number) => void;
  onNavigatePage?: (pageId: string) => void;
  onOpenComponentPickerForSection?: (sectionId: string) => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  template,
  isBuilderMode = false,
  selectedSectionId,
  selectedComponentId,
  onSelectSection,
  onSelectComponent,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
  onAddSectionAtIndex,
  onNavigatePage,
  onOpenComponentPickerForSection,
}) => {
  const { theme } = template;

  return (
    <div
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        fontFamily: theme.typography.bodyFont,
      }}
      className="min-h-full flex flex-col transition-colors duration-200"
    >
      {/* Portfolio Header / Navigation Bar */}
      <header
        style={{
          backgroundColor: `${theme.palette.background}dd`,
          borderColor: theme.palette.border,
        }}
        className="sticky top-0 z-30 backdrop-blur-md border-b px-4 sm:px-8 py-3.5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
            }}
            className="w-8 h-8 rounded-lg font-bold flex items-center justify-center text-sm shadow-md"
          >
            {template.name.charAt(0)}
          </div>
          <span style={{ color: theme.palette.text }} className="font-bold text-sm tracking-tight">
            {template.name}
          </span>
          <span
            style={{
              backgroundColor: theme.palette.surfaceAlt,
              color: theme.palette.textMuted,
            }}
            className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded font-medium"
          >
            {template.profession}
          </span>
        </div>

        {/* Navigation Links for Template Pages */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {template.pages.map((p) => {
            const isActive = p.id === page.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  if (onNavigatePage) onNavigatePage(p.id);
                }}
                style={{
                  backgroundColor: isActive ? theme.palette.surfaceAlt : 'transparent',
                  color: isActive ? theme.palette.text : theme.palette.textMuted,
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  isActive ? 'shadow-sm font-semibold' : 'hover:text-white'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Page Sections */}
      <main className="flex-1">
        {page.sections.length === 0 ? (
          <div className="py-24 px-6 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700 mx-auto flex items-center justify-center text-zinc-400 mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2">This page has no sections yet</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Start building by adding sections from the left toolbox or inserting a pre-built hero.
            </p>
            {isBuilderMode && onAddSectionAtIndex && (
              <button
                onClick={() => onAddSectionAtIndex(0)}
                className="px-5 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/25 transition-all"
              >
                + Add First Section
              </button>
            )}
          </div>
        ) : (
          page.sections.map((section, idx) => (
            <React.Fragment key={section.id}>
              {/* In-between section insert button in builder mode */}
              {isBuilderMode && onAddSectionAtIndex && (
                <div className="relative group/divider h-4 -my-2 z-10 flex items-center justify-center">
                  <div className="w-full border-t border-transparent group-hover/divider:border-blue-500/50 transition-colors" />
                  <button
                    onClick={() => onAddSectionAtIndex(idx)}
                    title="Insert section here"
                    className="absolute opacity-0 group-hover/divider:opacity-100 flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-blue-600 text-white rounded-full shadow-lg transition-all scale-90 group-hover/divider:scale-100"
                  >
                    <Plus className="w-3 h-3" /> Insert Section
                  </button>
                </div>
              )}

              <SectionRenderer
                section={section}
                theme={theme}
                isBuilderMode={isBuilderMode}
                isSelected={selectedSectionId === section.id}
                selectedComponentId={
                  selectedSectionId === section.id ? selectedComponentId : null
                }
                onSelectSection={() => onSelectSection && onSelectSection(section.id)}
                onSelectComponent={(compId) =>
                  onSelectComponent && onSelectComponent(section.id, compId)
                }
                onMoveUp={() => onMoveSection && onMoveSection(section.id, 'up')}
                onMoveDown={() => onMoveSection && onMoveSection(section.id, 'down')}
                onDuplicate={() => onDuplicateSection && onDuplicateSection(section.id)}
                onDelete={() => onDeleteSection && onDeleteSection(section.id)}
                onOpenComponentPicker={() =>
                  onOpenComponentPickerForSection &&
                  onOpenComponentPickerForSection(section.id)
                }
              />
            </React.Fragment>
          ))
        )}

        {/* Bottom add section button in builder mode */}
        {isBuilderMode && page.sections.length > 0 && onAddSectionAtIndex && (
          <div className="py-8 flex justify-center border-t border-dashed border-zinc-800">
            <button
              onClick={() => onAddSectionAtIndex(page.sections.length)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 rounded-lg shadow-sm transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>Add New Section to Page</span>
            </button>
          </div>
        )}
      </main>

      {/* Portfolio Footer */}
      <footer
        style={{
          borderColor: theme.palette.border,
          backgroundColor: theme.palette.surface,
          color: theme.palette.textMuted,
        }}
        className="border-t py-8 px-6 text-center text-xs"
      >
        <p>
          &copy; 2026 {template.name}. Built with Generic Portfolio Builder.
        </p>
      </footer>
    </div>
  );
};
