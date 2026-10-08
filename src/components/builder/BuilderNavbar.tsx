'use client';

import React from 'react';
import Link from 'next/link';
import { useBuilder } from '@/context/BuilderContext';
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  Code2,
  LayoutGrid,
  Plus,
  Trash2,
  Sparkles,
  Dices,
} from 'lucide-react';

interface BuilderNavbarProps {
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onOpenNewPageModal: () => void;
}

export const BuilderNavbar: React.FC<BuilderNavbarProps> = ({
  onOpenTemplates,
  onOpenExport,
  onOpenNewPageModal,
}) => {
  const {
    template,
    activePage,
    viewport,
    setViewport,
    isLivePreview,
    setIsLivePreview,
    canUndo,
    canRedo,
    undo,
    redo,
    setActivePage,
    deletePage,
    randomizeTheme,
  } = useBuilder();

  return (
    <header className="h-14 border-b border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between text-zinc-100 select-none z-40">
      {/* Left: Project Brand & Template Info */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer" title="Go to Portfolioo Home">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">Portfolioo</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                Builder
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate max-w-[150px] sm:max-w-[200px]">
              {template.name} ({template.profession})
            </p>
          </div>
        </Link>

        <div className="h-5 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

        {/* Page Selector Tabs */}
        <div className="hidden sm:flex items-center gap-1 bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-lg">
          {template.pages.map((p) => {
            const isActive = p.id === activePage.id;
            return (
              <div key={p.id} className="relative group/tab flex items-center">
                <button
                  onClick={() => setActivePage(p.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                >
                  {p.name}
                </button>
                {template.pages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete page "${p.name}"?`)) {
                        deletePage(p.id);
                      }
                    }}
                    title="Delete page"
                    className="opacity-0 group-hover/tab:opacity-100 absolute right-1 p-0.5 text-zinc-500 hover:text-red-400 rounded transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          <button
            onClick={onOpenNewPageModal}
            title="Add New Page"
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center: Device Viewport Controls */}
      <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-lg">
        <button
          onClick={() => setViewport('desktop')}
          title="Desktop view"
          className={`p-1.5 rounded-md transition-colors ${
            viewport === 'desktop'
              ? 'bg-zinc-800 text-blue-400 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewport('tablet')}
          title="Tablet view (768px)"
          className={`p-1.5 rounded-md transition-colors ${
            viewport === 'tablet'
              ? 'bg-zinc-800 text-blue-400 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewport('mobile')}
          title="Mobile view (390px)"
          className={`p-1.5 rounded-md transition-colors ${
            viewport === 'mobile'
              ? 'bg-zinc-800 text-blue-400 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Actions, Undo/Redo, Templates, Export */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
            className={`p-1.5 rounded-md transition-colors ${
              canUndo
                ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                : 'text-zinc-600 cursor-not-allowed'
            }`}
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
            className={`p-1.5 rounded-md transition-colors ${
              canRedo
                ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                : 'text-zinc-600 cursor-not-allowed'
            }`}
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <div className="h-5 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

        {/* Quick Theme Randomizer */}
        <button
          onClick={() => randomizeTheme()}
          title="Randomize Theme (Color Theory Generator)"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/50 rounded-lg transition-all shadow-sm group"
        >
          <Dices className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span>Shuffle Theme</span>
        </button>

        {/* Templates Picker Trigger */}
        <button
          onClick={onOpenTemplates}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
          <span>Presets</span>
        </button>

        {/* Export / JSON Inspector */}
        <button
          onClick={onOpenExport}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline">Schema / Code</span>
        </button>

        {/* Live Preview Toggle */}
        <button
          onClick={() => setIsLivePreview(!isLivePreview)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            isLivePreview
              ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
          }`}
        >
          {isLivePreview ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Exit Preview</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
