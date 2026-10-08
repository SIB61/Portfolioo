'use client';

import React from 'react';
import { useBuilder } from '@/context/BuilderContext';
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Copy,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Layers,
  Settings,
  X,
  Plus,
} from 'lucide-react';
import {
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
} from '@/types/builder';

export const PropertiesPanel: React.FC = () => {
  const {
    activePage,
    selectedSectionId,
    selectedComponentId,
    selectedSection,
    selectedComponent,
    clearSelection,
    updateComponent,
    removeComponent,
    updateSection,
    removeSection,
    duplicateSection,
    moveSection,
    updatePage,
  } = useBuilder();

  // 1. COMPONENT INSPECTOR
  if (selectedComponent && selectedSectionId) {
    const { type, props, styles = {} } = selectedComponent;

    const handlePropChange = (key: string, value: any) => {
      updateComponent(selectedSectionId, selectedComponent.id, {
        props: { ...props, [key]: value },
      });
    };

    const handleStyleChange = (key: string, value: any) => {
      updateComponent(selectedSectionId, selectedComponent.id, {
        styles: { ...styles, [key]: value },
      });
    };

    return (
      <aside className="w-80 h-[calc(100vh-3.5rem)] bg-zinc-950 border-l border-zinc-800 text-zinc-200 p-4 flex flex-col select-none overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded uppercase font-mono">
              {type}
            </span>
            <span className="text-xs font-semibold text-zinc-300">Properties</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => removeComponent(selectedSectionId, selectedComponent.id)}
              title="Delete Component"
              className="p-1 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={clearSelection}
              title="Close Panel"
              className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Controls based on Type */}
        <div className="py-4 space-y-4 flex-1">
          {/* HEADING */}
          {type === 'heading' && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
                  Heading Text
                </label>
                <textarea
                  rows={3}
                  value={(props as HeadingProps).text || ''}
                  onChange={(e) => handlePropChange('text', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Level</label>
                  <select
                    value={(props as HeadingProps).level || 'h2'}
                    onChange={(e) => handlePropChange('level', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="h1">H1 (Hero Title)</option>
                    <option value="h2">H2 (Section)</option>
                    <option value="h3">H3 (Card / Sub)</option>
                    <option value="h4">H4 (Minor)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 py-1.5">
                    <input
                      type="checkbox"
                      checked={Boolean((props as HeadingProps).gradient)}
                      onChange={(e) => handlePropChange('gradient', e.target.checked)}
                      className="rounded bg-zinc-900 border-zinc-700 text-blue-600"
                    />
                    <span>Gradient Text</span>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* PARAGRAPH */}
          {type === 'paragraph' && (
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
                Paragraph Content
              </label>
              <textarea
                rows={5}
                value={(props as ParagraphProps).text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white resize-y"
              />
            </div>
          )}

          {/* BUTTON */}
          {type === 'button' && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Label</label>
                <input
                  type="text"
                  value={(props as ButtonProps).label || ''}
                  onChange={(e) => handlePropChange('label', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Target URL</label>
                <input
                  type="text"
                  value={(props as ButtonProps).url || ''}
                  onChange={(e) => handlePropChange('url', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Style</label>
                  <select
                    value={(props as ButtonProps).variant || 'primary'}
                    onChange={(e) => handlePropChange('variant', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                    <option value="glow">Glow</option>
                    <option value="ghost">Ghost</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Size</label>
                  <select
                    value={(props as ButtonProps).size || 'md'}
                    onChange={(e) => handlePropChange('size', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* BADGE */}
          {type === 'badge' && (
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Badge Text</label>
              <input
                type="text"
                value={(props as BadgeProps).label || ''}
                onChange={(e) => handlePropChange('label', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
              />
            </div>
          )}

          {/* AVATAR */}
          {type === 'avatar' && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Photo URL</label>
                <input
                  type="text"
                  value={(props as AvatarProps).imageUrl || ''}
                  onChange={(e) => handlePropChange('imageUrl', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Status Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Open to work"
                  value={(props as AvatarProps).statusBadge || ''}
                  onChange={(e) => handlePropChange('statusBadge', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>
            </>
          )}

          {/* IMAGE */}
          {type === 'image' && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Image URL</label>
                <input
                  type="text"
                  value={(props as ImageProps).url || ''}
                  onChange={(e) => handlePropChange('url', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Caption</label>
                <input
                  type="text"
                  value={(props as ImageProps).caption || ''}
                  onChange={(e) => handlePropChange('caption', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>
            </>
          )}

          {/* STAT CARD */}
          {type === 'statCard' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Metric Value</label>
                  <input
                    type="text"
                    value={(props as StatCardProps).value || ''}
                    onChange={(e) => handlePropChange('value', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Suffix</label>
                  <input
                    type="text"
                    value={(props as StatCardProps).suffix || ''}
                    onChange={(e) => handlePropChange('suffix', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Label</label>
                <input
                  type="text"
                  value={(props as StatCardProps).label || ''}
                  onChange={(e) => handlePropChange('label', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>
            </>
          )}

          {/* SKILL PILLS */}
          {type === 'skillPills' && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Category</label>
                <input
                  type="text"
                  value={(props as SkillPillsProps).category || ''}
                  onChange={(e) => handlePropChange('category', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
                  Skills (comma separated)
                </label>
                <textarea
                  rows={4}
                  value={((props as SkillPillsProps).skills || []).join(', ')}
                  onChange={(e) =>
                    handlePropChange(
                      'skills',
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>
            </>
          )}

          {/* PROJECT CARD */}
          {type === 'projectCard' && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Title</label>
                <input
                  type="text"
                  value={(props as ProjectCardProps).title || ''}
                  onChange={(e) => handlePropChange('title', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Description</label>
                <textarea
                  rows={3}
                  value={(props as ProjectCardProps).description || ''}
                  onChange={(e) => handlePropChange('description', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={((props as ProjectCardProps).tags || []).join(', ')}
                  onChange={(e) =>
                    handlePropChange(
                      'tags',
                      e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Image URL</label>
                <input
                  type="text"
                  value={(props as ProjectCardProps).imageUrl || ''}
                  onChange={(e) => handlePropChange('imageUrl', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Demo URL</label>
                  <input
                    type="text"
                    value={(props as ProjectCardProps).demoUrl || ''}
                    onChange={(e) => handlePropChange('demoUrl', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">GitHub URL</label>
                  <input
                    type="text"
                    value={(props as ProjectCardProps).githubUrl || ''}
                    onChange={(e) => handlePropChange('githubUrl', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
              </div>
            </>
          )}

          {/* Common Style / Alignment Controls */}
          <div className="pt-4 border-t border-zinc-800">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Alignment & Styling
            </h4>
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => handleStyleChange('textAlign', 'left')}
                className={`flex-1 p-1 rounded flex justify-center ${
                  styles.textAlign === 'left' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStyleChange('textAlign', 'center')}
                className={`flex-1 p-1 rounded flex justify-center ${
                  styles.textAlign === 'center' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStyleChange('textAlign', 'right')}
                className={`flex-1 p-1 rounded flex justify-center ${
                  styles.textAlign === 'right' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // 2. SECTION INSPECTOR
  if (selectedSection) {
    const { styles = {} } = selectedSection;

    return (
      <aside className="w-80 h-[calc(100vh-3.5rem)] bg-zinc-950 border-l border-zinc-800 text-zinc-200 p-4 flex flex-col select-none overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 text-white rounded uppercase font-mono">
              SECTION
            </span>
            <span className="text-xs font-semibold text-zinc-300">Settings</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => duplicateSection(selectedSection.id)}
              title="Duplicate Section"
              className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => removeSection(selectedSection.id)}
              title="Delete Section"
              className="p-1 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={clearSelection}
              title="Close Panel"
              className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="py-4 space-y-4 flex-1">
          <div>
            <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
              Section Title
            </label>
            <input
              type="text"
              value={selectedSection.title || ''}
              onChange={(e) => updateSection(selectedSection.id, { title: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
              Vertical Padding
            </label>
            <select
              value={styles.paddingY || 'lg'}
              onChange={(e) =>
                updateSection(selectedSection.id, {
                  styles: { ...styles, paddingY: e.target.value as any },
                })
              }
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            >
              <option value="none">None (0px)</option>
              <option value="sm">Small (py-8)</option>
              <option value="md">Medium (py-14)</option>
              <option value="lg">Large (py-20)</option>
              <option value="xl">Extra Large (py-28)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
              Container Width
            </label>
            <select
              value={styles.containerWidth || 'boxed'}
              onChange={(e) =>
                updateSection(selectedSection.id, {
                  styles: { ...styles, containerWidth: e.target.value as any },
                })
              }
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            >
              <option value="boxed">Boxed (Max 1024px)</option>
              <option value="wide">Wide (Max 1280px)</option>
              <option value="full">Full Screen (100%)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
              Section Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={styles.backgroundColor || '#000000'}
                onChange={(e) =>
                  updateSection(selectedSection.id, {
                    styles: { ...styles, backgroundColor: e.target.value },
                  })
                }
                className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
              />
              <button
                onClick={() =>
                  updateSection(selectedSection.id, {
                    styles: { ...styles, backgroundColor: undefined },
                  })
                }
                className="text-[11px] text-zinc-500 hover:text-white"
              >
                Reset to Transparent
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <label className="text-[11px] font-semibold text-zinc-400 mb-2 block">
              Section Hierarchy
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => moveSection(selectedSection.id, 'up')}
                className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs flex items-center justify-center gap-1.5 text-zinc-300"
              >
                <ChevronUp className="w-3.5 h-3.5" /> Move Up
              </button>
              <button
                onClick={() => moveSection(selectedSection.id, 'down')}
                className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs flex items-center justify-center gap-1.5 text-zinc-300"
              >
                <ChevronDown className="w-3.5 h-3.5" /> Move Down
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // 3. PAGE SETTINGS (When nothing selected)
  return (
    <aside className="w-80 h-[calc(100vh-3.5rem)] bg-zinc-950 border-l border-zinc-800 text-zinc-200 p-4 flex flex-col select-none overflow-y-auto">
      <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
        <Sliders className="w-4 h-4 text-zinc-400" />
        <span className="text-xs font-semibold text-zinc-300">Page Settings</span>
      </div>

      <div className="py-4 space-y-4 flex-1">
        <div>
          <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Page Name</label>
          <input
            type="text"
            value={activePage.name}
            onChange={(e) => updatePage(activePage.id, { name: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">URL Slug</label>
          <input
            type="text"
            value={activePage.slug}
            onChange={(e) => updatePage(activePage.id, { slug: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
          />
        </div>

        <div className="pt-3 border-t border-zinc-800">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2 block">
            SEO & Social Graph
          </label>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">Meta Title</label>
              <input
                type="text"
                value={activePage.seo?.title || ''}
                onChange={(e) =>
                  updatePage(activePage.id, {
                    seo: { ...activePage.seo, title: e.target.value },
                  })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-400 mb-1 block">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={activePage.seo?.description || ''}
                onChange={(e) =>
                  updatePage(activePage.id, {
                    seo: { ...activePage.seo, description: e.target.value },
                  })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white resize-y"
              />
            </div>
          </div>
        </div>

        <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl mt-4">
          <p className="text-xs font-semibold text-zinc-300">Quick Guide</p>
          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
            Click any section or element on the canvas to open its specific visual controls, text editor, and layout options.
          </p>
        </div>
      </div>
    </aside>
  );
};
