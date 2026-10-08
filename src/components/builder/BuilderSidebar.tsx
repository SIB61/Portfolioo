'use client';

import React, { useState } from 'react';
import { useBuilder, SidebarTab } from '@/context/BuilderContext';
import {
  PREBUILT_SECTIONS,
  ATOMIC_COMPONENTS,
} from '@/lib/componentLibrary';
import { THEME_PRESETS, ALL_TEMPLATES } from '@/lib/defaultTemplates';
import {
  Blocks,
  Component,
  Layers,
  Palette,
  FolderOpen,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Heading,
  AlignLeft,
  MousePointerClick,
  Tag,
  UserCircle,
  Image as ImageIcon,
  Share2,
  TrendingUp,
  FolderGit2,
  Briefcase,
  Quote,
  Minus,
  Grid,
  Dices,
  Wand2,
  Sun,
  Moon,
  Lock,
  Unlock,
} from 'lucide-react';
import { MoodArchetype, FONT_PAIRINGS } from '@/lib/themeGenerator';

export const BuilderSidebar: React.FC = () => {
  const {
    activeSidebarTab,
    setActiveSidebarTab,
    activePage,
    selectedSectionId,
    template,
    addSection,
    removeSection,
    moveSection,
    selectSection,
    addComponentToSection,
    updateTheme,
    setThemePreset,
    randomizeTheme,
    loadTemplate,
    addPage,
  } = useBuilder();

  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [showAddPageForm, setShowAddPageForm] = useState(false);

  // Theme generator state
  const [generatorMood, setGeneratorMood] = useState<MoodArchetype>('any');
  const [generatorMode, setGeneratorMode] = useState<'dark' | 'light' | 'random'>('dark');
  const [lockRadius, setLockRadius] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Helper to map icon names to Lucide icons
  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'heading':
        return <Heading className="w-4 h-4 text-blue-400" />;
      case 'paragraph':
        return <AlignLeft className="w-4 h-4 text-zinc-400" />;
      case 'button':
        return <MousePointerClick className="w-4 h-4 text-emerald-400" />;
      case 'badge':
        return <Tag className="w-4 h-4 text-amber-400" />;
      case 'avatar':
        return <UserCircle className="w-4 h-4 text-purple-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-indigo-400" />;
      case 'socialLinks':
        return <Share2 className="w-4 h-4 text-sky-400" />;
      case 'statCard':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'skillPills':
        return <Blocks className="w-4 h-4 text-yellow-400" />;
      case 'projectCard':
        return <FolderGit2 className="w-4 h-4 text-rose-400" />;
      case 'experienceItem':
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'testimonialCard':
        return <Quote className="w-4 h-4 text-amber-300" />;
      case 'divider':
        return <Minus className="w-4 h-4 text-zinc-500" />;
      default:
        return <Component className="w-4 h-4 text-zinc-400" />;
    }
  };

  const tabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
    { id: 'sections', label: 'Sections', icon: <Blocks className="w-4 h-4" /> },
    { id: 'components', label: 'Atomic', icon: <Component className="w-4 h-4" /> },
    { id: 'pages', label: 'Outline', icon: <Layers className="w-4 h-4" /> },
    { id: 'theme', label: 'Theme', icon: <Palette className="w-4 h-4" /> },
    { id: 'templates', label: 'Templates', icon: <FolderOpen className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-80 h-[calc(100vh-3.5rem)] flex flex-col bg-zinc-950 border-r border-zinc-800 text-zinc-200 select-none">
      {/* Top Tab Bar */}
      <div className="flex border-b border-zinc-800 bg-zinc-900/50 p-1 gap-1">
        {tabs.map((tab) => {
          const isActive = activeSidebarTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSidebarTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-md text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-zinc-800 text-white shadow font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              {tab.icon}
              <span className="mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: PREBUILT SECTIONS */}
        {activeSidebarTab === 'sections' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Section Library
                </h3>
                <p className="text-[11px] text-zinc-500">
                  Pre-assembled sections ready to insert
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {PREBUILT_SECTIONS.map((secMeta) => (
                <div
                  key={secMeta.type}
                  className="p-3 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        {secMeta.label}
                      </h4>
                      <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2">
                        {secMeta.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newSec = secMeta.createDefault();
                      addSection(newSec);
                    }}
                    className="mt-3 w-full py-1.5 px-3 bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-300 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Page</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ATOMIC COMPONENTS */}
        {activeSidebarTab === 'components' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Atomic Elements
              </h3>
              <p className="text-[11px] text-zinc-500">
                Click to add to currently selected section
              </p>
            </div>

            {selectedSectionId ? (
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[11px] text-blue-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Target: {activePage.sections.find((s) => s.id === selectedSectionId)?.title}
              </div>
            ) : (
              <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[11px] text-zinc-400">
                💡 Tip: Click any section on canvas first, or new element will be appended to top section.
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {ATOMIC_COMPONENTS.map((compMeta) => (
                <button
                  key={compMeta.type}
                  onClick={() => {
                    const comp = compMeta.createDefault();
                    const targetSecId = selectedSectionId || activePage.sections[0]?.id;
                    if (!targetSecId) {
                      alert('Please add a section first!');
                      return;
                    }
                    addComponentToSection(targetSecId, comp);
                  }}
                  className="p-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 hover:border-zinc-700 rounded-xl flex flex-col items-start text-left transition-all hover:scale-[1.02] group"
                >
                  <div className="p-1.5 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                    {getComponentIcon(compMeta.type)}
                  </div>
                  <span className="mt-2 text-xs font-semibold text-zinc-200">
                    {compMeta.label}
                  </span>
                  <span className="text-[10px] text-zinc-500 line-clamp-1">
                    {compMeta.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PAGES & OUTLINE */}
        {activeSidebarTab === 'pages' && (
          <div className="space-y-6">
            {/* Pages Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Pages ({template.pages.length})
                </h3>
                <button
                  onClick={() => setShowAddPageForm(!showAddPageForm)}
                  className="p-1 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {showAddPageForm && (
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl mb-3 space-y-2">
                  <input
                    type="text"
                    placeholder="Page Name (e.g. Resume)"
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-white"
                  />
                  <input
                    type="text"
                    placeholder="URL Slug (e.g. /resume)"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddPageForm(false)}
                      className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!newPageName.trim()) return;
                        addPage(newPageName, newPageSlug || `/${newPageName.toLowerCase()}`);
                        setNewPageName('');
                        setNewPageSlug('');
                        setShowAddPageForm(false);
                      }}
                      className="px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded"
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                {template.pages.map((p) => {
                  const isActive = p.id === activePage.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => selectSection(null)}
                      className={`px-3 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-blue-600/10 border border-blue-500/30 text-blue-300 font-semibold'
                          : 'bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/60 text-zinc-300'
                      }`}
                    >
                      <div>
                        <span>{p.name}</span>
                        <span className="ml-2 text-[10px] font-mono text-zinc-500">{p.slug}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">
                        {p.sections.length} sections
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sections Hierarchy of Active Page */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Active Page Sections ({activePage.sections.length})
              </h3>

              {activePage.sections.length === 0 ? (
                <p className="text-xs text-zinc-500 italic">No sections on this page yet.</p>
              ) : (
                <div className="space-y-1.5">
                  {activePage.sections.map((sec, idx) => {
                    const isSelected = selectedSectionId === sec.id;
                    return (
                      <div
                        key={sec.id}
                        onClick={() => selectSection(sec.id)}
                        className={`p-2.5 rounded-lg border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-zinc-800 border-blue-500 text-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] font-mono text-zinc-500 w-4">
                            #{idx + 1}
                          </span>
                          <span className="truncate font-medium">{sec.title || sec.type}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveSection(sec.id, 'up');
                            }}
                            disabled={idx === 0}
                            className="p-1 hover:bg-zinc-700 text-zinc-400 hover:text-white disabled:opacity-30 rounded"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveSection(sec.id, 'down');
                            }}
                            disabled={idx === activePage.sections.length - 1}
                            className="p-1 hover:bg-zinc-700 text-zinc-400 hover:text-white disabled:opacity-30 rounded"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSection(sec.id);
                            }}
                            className="p-1 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: THEME STUDIO & GENERATOR */}
        {activeSidebarTab === 'theme' && (
          <div className="space-y-6">
            {/* THEME GENERATOR / RANDOMIZER CARD */}
            <div className="p-4 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-blue-500/30 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Theme Generator
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Harmonious color theory randomizer
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">
                  {template.theme.mode}
                </span>
              </div>

              {/* Current Palette Swatch Strip */}
              <div className="my-3 p-2 bg-zinc-950/80 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                <div className="truncate mr-2">
                  <p className="text-xs font-bold text-zinc-200 truncate">
                    {template.theme.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    {template.theme.palette.primary} • {template.theme.borderRadius}
                  </p>
                </div>

                <div className="flex items-center -space-x-1.5 shrink-0">
                  <span
                    title="Primary"
                    className="w-5 h-5 rounded-full border-2 border-zinc-900 shadow"
                    style={{ backgroundColor: template.theme.palette.primary }}
                  />
                  <span
                    title="Secondary"
                    className="w-5 h-5 rounded-full border-2 border-zinc-900 shadow"
                    style={{ backgroundColor: template.theme.palette.secondary }}
                  />
                  <span
                    title="Accent"
                    className="w-5 h-5 rounded-full border-2 border-zinc-900 shadow"
                    style={{ backgroundColor: template.theme.palette.accent }}
                  />
                  <span
                    title="Surface"
                    className="w-5 h-5 rounded-full border-2 border-zinc-900 shadow"
                    style={{ backgroundColor: template.theme.palette.surface }}
                  />
                  <span
                    title="Background"
                    className="w-5 h-5 rounded-full border-2 border-zinc-900 shadow"
                    style={{ backgroundColor: template.theme.palette.background }}
                  />
                </div>
              </div>

              {/* Big Randomize Button */}
              <button
                onClick={() => {
                  setIsSpinning(true);
                  randomizeTheme({
                    mood: generatorMood,
                    mode: generatorMode,
                    preserveRadius: lockRadius,
                  });
                  setTimeout(() => setIsSpinning(false), 500);
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 group"
              >
                <Dices
                  className={`w-4 h-4 text-amber-300 transition-transform ${
                    isSpinning ? 'rotate-180 scale-125' : 'group-hover:rotate-45'
                  }`}
                />
                <span>Randomize Theme</span>
              </button>

              {/* Generator Options */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
                    Mood / Style Archetype
                  </label>
                  <select
                    value={generatorMood}
                    onChange={(e) => setGeneratorMood(e.target.value as MoodArchetype)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200"
                  >
                    <option value="any">🎲 Surprise Me (Any Style)</option>
                    <option value="cyber-neon">⚡ Cyber Neon (High-Tech)</option>
                    <option value="editorial-warm">☕ Warm Editorial (Stone & Copper)</option>
                    <option value="oceanic-nordic">🌊 Oceanic Nordic (Deep Sea)</option>
                    <option value="forest-emerald">🌲 Forest Emerald (Cyber Jade)</option>
                    <option value="creative-vibrant">🎨 Creative Vibrant (Pop Magenta)</option>
                    <option value="minimal-mono">🖤 Minimalist Mono (Sharp Slate)</option>
                    <option value="clean-light">☀️ Clean Light (Agency Minimal)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
                      Mode
                    </label>
                    <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        onClick={() => setGeneratorMode('dark')}
                        className={`flex-1 py-1 text-[11px] font-medium rounded flex items-center justify-center gap-1 transition-colors ${
                          generatorMode === 'dark'
                            ? 'bg-zinc-800 text-white shadow'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Moon className="w-3 h-3" />
                        <span>Dark</span>
                      </button>
                      <button
                        onClick={() => setGeneratorMode('light')}
                        className={`flex-1 py-1 text-[11px] font-medium rounded flex items-center justify-center gap-1 transition-colors ${
                          generatorMode === 'light'
                            ? 'bg-zinc-800 text-white shadow'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Sun className="w-3 h-3" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => setGeneratorMode('random')}
                        className={`flex-1 py-1 text-[11px] font-medium rounded flex items-center justify-center gap-1 transition-colors ${
                          generatorMode === 'random'
                            ? 'bg-zinc-800 text-white shadow'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span>Any</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setLockRadius(!lockRadius)}
                      title={lockRadius ? 'Corner radius is locked' : 'Corner radius randomizes'}
                      className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                        lockRadius
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {lockRadius ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">Radius</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CURATED PRESETS */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Handcrafted Presets
              </h3>
              <div className="space-y-2">
                {Object.entries(THEME_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => setThemePreset(key)}
                    className="w-full p-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-xl flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-zinc-200">{preset.name}</p>
                      <p className="text-[10px] text-zinc-500 capitalize">{preset.mode} Mode</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: preset.palette.primary }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: preset.palette.background }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: preset.palette.accent }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* TYPOGRAPHY PAIRINGS */}
            <div className="pt-3 border-t border-zinc-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Typography System
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {FONT_PAIRINGS.map((font) => {
                  const isCurrent = template.theme.typography.headingFont === font.heading;
                  return (
                    <button
                      key={font.name}
                      onClick={() =>
                        updateTheme({
                          typography: {
                            headingFont: font.heading,
                            bodyFont: font.body,
                          },
                        })
                      }
                      className={`p-2.5 rounded-xl border text-left text-xs transition-colors ${
                        isCurrent
                          ? 'bg-blue-600/15 border-blue-500 text-blue-200 font-semibold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <p className="font-semibold text-zinc-200">{font.name}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
                        Heading + Body
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MANUAL PALETTE OVERRIDES */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Custom Palette Adjustments
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Primary Accent</span>
                  <input
                    type="color"
                    value={template.theme.palette.primary}
                    onChange={(e) =>
                      updateTheme({
                        palette: { ...template.theme.palette, primary: e.target.value },
                      })
                    }
                    className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Background</span>
                  <input
                    type="color"
                    value={template.theme.palette.background}
                    onChange={(e) =>
                      updateTheme({
                        palette: { ...template.theme.palette, background: e.target.value },
                      })
                    }
                    className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Surface / Card</span>
                  <input
                    type="color"
                    value={template.theme.palette.surface}
                    onChange={(e) =>
                      updateTheme({
                        palette: { ...template.theme.palette, surface: e.target.value },
                      })
                    }
                    className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Text Primary</span>
                  <input
                    type="color"
                    value={template.theme.palette.text}
                    onChange={(e) =>
                      updateTheme({
                        palette: { ...template.theme.palette, text: e.target.value },
                      })
                    }
                    className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* CORNER RADIUS */}
            <div className="space-y-2 pt-3 border-t border-zinc-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Border Radius
              </h3>
              <div className="grid grid-cols-3 gap-1.5">
                {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((rad) => (
                  <button
                    key={rad}
                    onClick={() => updateTheme({ borderRadius: rad })}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border capitalize transition-colors ${
                      template.theme.borderRadius === rad
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {rad}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TEMPLATES */}
        {activeSidebarTab === 'templates' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Profession Templates
              </h3>
              <p className="text-[11px] text-zinc-500">
                Full-page portfolio archetypes tailored for different careers
              </p>
            </div>

            <div className="space-y-3">
              {ALL_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className={`p-3 bg-zinc-900 border rounded-xl transition-all ${
                    template.id === tmpl.id
                      ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{tmpl.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                      {tmpl.pages.length} Pages
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-blue-400 mt-0.5">
                    {tmpl.profession}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    {tmpl.description}
                  </p>
                  <button
                    onClick={() => {
                      if (confirm(`Load "${tmpl.name}"? Current unsaved edits will be replaced.`)) {
                        loadTemplate(tmpl);
                      }
                    }}
                    className={`mt-3 w-full py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      template.id === tmpl.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    {template.id === tmpl.id ? 'Active Template' : 'Load Template'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
