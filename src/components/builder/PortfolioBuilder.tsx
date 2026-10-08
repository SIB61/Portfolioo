'use client';

import React, { useState, useEffect } from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { BuilderNavbar } from './BuilderNavbar';
import { BuilderSidebar } from './BuilderSidebar';
import { BuilderCanvas } from './BuilderCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { TemplateSelectorModal } from './modals/TemplateSelectorModal';
import { CodeExportModal } from './modals/CodeExportModal';
import { SectionPickerModal } from './modals/SectionPickerModal';
import { NewPageModal } from './modals/NewPageModal';

export const PortfolioBuilder: React.FC = () => {
  const { isLivePreview, undo, redo, clearSelection } = useBuilder();

  // Modals state
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isNewPageOpen, setIsNewPageOpen] = useState(false);
  const [sectionPickerIndex, setSectionPickerIndex] = useState<number | null>(null);

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if focused in input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Undo: Cmd+Z or Ctrl+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Cmd+Shift+Z or Ctrl+Shift+Z or Ctrl+Y
      else if (
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') ||
        ((e.metaKey || e.ctrlKey) && e.key === 'y')
      ) {
        e.preventDefault();
        redo();
      }
      // Escape: clear selection
      else if (e.key === 'Escape') {
        clearSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, clearSelection]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 font-sans text-zinc-100 overflow-hidden">
      {/* Top Navbar */}
      <BuilderNavbar
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenNewPageModal={() => setIsNewPageOpen(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (hidden in live preview mode) */}
        {!isLivePreview && <BuilderSidebar />}

        {/* Center Visual Canvas */}
        <BuilderCanvas
          onOpenSectionPickerForIndex={(idx) => setSectionPickerIndex(idx)}
        />

        {/* Right Inspector Panel (hidden in live preview mode) */}
        {!isLivePreview && <PropertiesPanel />}
      </div>

      {/* Modals */}
      <TemplateSelectorModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
      />

      <CodeExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <NewPageModal
        isOpen={isNewPageOpen}
        onClose={() => setIsNewPageOpen(false)}
      />

      <SectionPickerModal
        isOpen={sectionPickerIndex !== null}
        insertIndex={sectionPickerIndex}
        onClose={() => setSectionPickerIndex(null)}
      />
    </div>
  );
};
