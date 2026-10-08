'use client';

import React from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { PageRenderer } from '@/components/renderer/PageRenderer';
import { PREBUILT_SECTIONS } from '@/lib/componentLibrary';

interface BuilderCanvasProps {
  onOpenSectionPickerForIndex?: (index: number) => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  onOpenSectionPickerForIndex,
}) => {
  const {
    activePage,
    template,
    viewport,
    isLivePreview,
    selectedSectionId,
    selectedComponentId,
    selectSection,
    selectComponent,
    moveSection,
    duplicateSection,
    removeSection,
    addSection,
    setActivePage,
    setActiveSidebarTab,
  } = useBuilder();

  // If live preview, render page directly without canvas framing or toolbars
  if (isLivePreview) {
    return (
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto bg-black">
        <PageRenderer
          page={activePage}
          template={template}
          isBuilderMode={false}
          onNavigatePage={setActivePage}
        />
      </div>
    );
  }

  // Viewport container sizing
  const getViewportContainerClasses = () => {
    switch (viewport) {
      case 'mobile':
        return 'w-[390px] min-h-[844px] my-6 rounded-[40px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-zinc-700/50';
      case 'tablet':
        return 'w-[768px] min-h-[1024px] my-6 rounded-[24px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-zinc-700/50';
      case 'desktop':
      default:
        return 'w-full min-h-full border-x border-zinc-900 shadow-xl';
    }
  };

  const handleAddSectionAtIndex = (index: number) => {
    if (onOpenSectionPickerForIndex) {
      onOpenSectionPickerForIndex(index);
    } else {
      // Default: insert hero or projects
      const newSec = PREBUILT_SECTIONS[0].createDefault();
      addSection(newSec, index);
    }
  };

  const handleOpenComponentPicker = (sectionId: string) => {
    selectSection(sectionId);
    setActiveSidebarTab('components');
  };

  return (
    <div
      onClick={(e) => {
        // If clicking canvas background, unselect
        if (e.target === e.currentTarget) {
          selectSection(null);
        }
      }}
      className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto bg-zinc-900/60 p-2 sm:p-6 flex justify-center items-start select-text"
    >
      <div className={`${getViewportContainerClasses()} transition-all duration-300 bg-black`}>
        {/* Device frame decoration for mobile */}
        {viewport === 'mobile' && (
          <div className="h-6 bg-zinc-800 flex justify-center items-center">
            <div className="w-24 h-3.5 bg-black rounded-full" />
          </div>
        )}

        <PageRenderer
          page={activePage}
          template={template}
          isBuilderMode={true}
          selectedSectionId={selectedSectionId}
          selectedComponentId={selectedComponentId}
          onSelectSection={selectSection}
          onSelectComponent={selectComponent}
          onMoveSection={moveSection}
          onDuplicateSection={duplicateSection}
          onDeleteSection={removeSection}
          onAddSectionAtIndex={handleAddSectionAtIndex}
          onNavigatePage={setActivePage}
          onOpenComponentPickerForSection={handleOpenComponentPicker}
        />
      </div>
    </div>
  );
};
