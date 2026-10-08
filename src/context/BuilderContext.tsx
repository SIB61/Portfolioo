'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import {
  PortfolioTemplate,
  PageNode,
  SectionNode,
  ComponentNode,
  ThemeConfig,
  DeviceViewport,
} from '@/types/builder';
import { DEFAULT_DEVELOPER_TEMPLATE, THEME_PRESETS, ALL_TEMPLATES } from '@/lib/defaultTemplates';
import { generateId } from '@/lib/componentLibrary';
import { generateRandomTheme, RandomThemeOptions } from '@/lib/themeGenerator';

export type SidebarTab = 'sections' | 'components' | 'pages' | 'theme' | 'templates';

interface BuilderContextType {
  // State
  template: PortfolioTemplate;
  activePage: PageNode;
  activePageId: string;
  selectedSectionId: string | null;
  selectedComponentId: string | null;
  selectedSection: SectionNode | null;
  selectedComponent: ComponentNode | null;
  viewport: DeviceViewport;
  isLivePreview: boolean;
  activeSidebarTab: SidebarTab;
  canUndo: boolean;
  canRedo: boolean;

  // Selection
  selectSection: (sectionId: string | null) => void;
  selectComponent: (sectionId: string | null, componentId: string | null) => void;
  clearSelection: () => void;

  // Section Operations
  addSection: (section: SectionNode, insertIndex?: number) => void;
  updateSection: (sectionId: string, updates: Partial<SectionNode>) => void;
  removeSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  moveSection: (sectionId: string, direction: 'up' | 'down') => void;

  // Component Operations
  addComponentToSection: (sectionId: string, component: ComponentNode, index?: number) => void;
  updateComponent: (sectionId: string, componentId: string, updates: Partial<ComponentNode>) => void;
  removeComponent: (sectionId: string, componentId: string) => void;
  moveComponent: (sectionId: string, componentId: string, direction: 'up' | 'down') => void;

  // Page Operations
  setActivePage: (pageId: string) => void;
  addPage: (name: string, slug: string) => void;
  updatePage: (pageId: string, updates: Partial<PageNode>) => void;
  deletePage: (pageId: string) => void;

  // Theme & Template
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  loadTemplate: (newTemplate: PortfolioTemplate) => void;
  setThemePreset: (presetKey: string) => void;
  randomizeTheme: (options?: RandomThemeOptions) => void;
  resetToDefault: () => void;

  // UI state
  setViewport: (viewport: DeviceViewport) => void;
  setIsLivePreview: (live: boolean) => void;
  setActiveSidebarTab: (tab: SidebarTab) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;

  // Export / Import
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

const MAX_HISTORY = 30;
const STORAGE_KEY = 'portfolio_builder_state_v1';

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplate] = useState<PortfolioTemplate>(DEFAULT_DEVELOPER_TEMPLATE);
  const [activePageId, setActivePageId] = useState<string>('page_home');
  const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<DeviceViewport>('desktop');
  const [isLivePreview, setIsLivePreview] = useState<boolean>(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('sections');

  // History stacks
  const [history, setHistory] = useState<PortfolioTemplate[]>([]);
  const [future, setFuture] = useState<PortfolioTemplate[]>([]);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.pages) && parsed.theme) {
          setTemplate(parsed);
          setActivePageId(parsed.activePageId || parsed.pages[0]?.id || 'page_home');
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoadedFromStorage(true);
    }
  }, []);

  // Persist to local storage after initial hydration
  useEffect(() => {
    if (!isLoadedFromStorage) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(template));
    } catch {
      // quota or private browsing
    }
  }, [template, isLoadedFromStorage]);

  // Push new state with history tracking
  const pushTemplateState = useCallback((newTemplate: PortfolioTemplate) => {
    setHistory((prev) => [...prev.slice(-(MAX_HISTORY - 1)), template]);
    setFuture([]);
    setTemplate(newTemplate);
  }, [template]);

  // Derived active page
  const activePage = useMemo(() => {
    const found = template.pages.find((p) => p.id === activePageId);
    return found || template.pages[0];
  }, [template.pages, activePageId]);

  // Derived selected section and component
  const selectedSection = useMemo(() => {
    if (!selectedSectionId) return null;
    return activePage?.sections.find((s) => s.id === selectedSectionId) || null;
  }, [activePage, selectedSectionId]);

  const findComponentRecursive = (
    components: ComponentNode[],
    id: string
  ): ComponentNode | null => {
    for (const c of components) {
      if (c.id === id) return c;
      if (c.children && c.children.length > 0) {
        const found = findComponentRecursive(c.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedComponent = useMemo(() => {
    if (!selectedComponentId || !selectedSection) return null;
    return findComponentRecursive(selectedSection.components, selectedComponentId);
  }, [selectedSection, selectedComponentId]);

  // Selection handlers
  const selectSection = useCallback((sectionId: string | null) => {
    setSelectedSectionId(sectionId);
    setSelectedComponentId(null);
  }, []);

  const selectComponent = useCallback((sectionId: string | null, componentId: string | null) => {
    setSelectedSectionId(sectionId);
    setSelectedComponentId(componentId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSectionId(null);
    setSelectedComponentId(null);
  }, []);

  // Section operations
  const addSection = useCallback(
    (section: SectionNode, insertIndex?: number) => {
      const updatedPages = template.pages.map((page) => {
        if (page.id !== activePage.id) return page;
        const newSections = [...page.sections];
        if (typeof insertIndex === 'number' && insertIndex >= 0) {
          newSections.splice(insertIndex, 0, section);
        } else {
          newSections.push(section);
        }
        return { ...page, sections: newSections };
      });

      pushTemplateState({ ...template, pages: updatedPages });
      setSelectedSectionId(section.id);
      setSelectedComponentId(null);
    },
    [template, activePage.id, pushTemplateState]
  );

  const updateSection = useCallback(
    (sectionId: string, updates: Partial<SectionNode>) => {
      const updatedPages = template.pages.map((page) => {
        if (page.id !== activePage.id) return page;
        const updatedSections = page.sections.map((sec) =>
          sec.id === sectionId ? { ...sec, ...updates } : sec
        );
        return { ...page, sections: updatedSections };
      });
      pushTemplateState({ ...template, pages: updatedPages });
    },
    [template, activePage.id, pushTemplateState]
  );

  const removeSection = useCallback(
    (sectionId: string) => {
      const updatedPages = template.pages.map((page) => {
        if (page.id !== activePage.id) return page;
        return {
          ...page,
          sections: page.sections.filter((s) => s.id !== sectionId),
        };
      });

      pushTemplateState({ ...template, pages: updatedPages });
      if (selectedSectionId === sectionId) {
        clearSelection();
      }
    },
    [template, activePage.id, selectedSectionId, clearSelection, pushTemplateState]
  );

  const duplicateSection = useCallback(
    (sectionId: string) => {
      const targetSec = activePage.sections.find((s) => s.id === sectionId);
      if (!targetSec) return;

      const cloneDeep = (node: ComponentNode): ComponentNode => ({
        ...node,
        id: generateId('comp_clone'),
        children: node.children ? node.children.map(cloneDeep) : undefined,
      });

      const duplicated: SectionNode = {
        ...targetSec,
        id: generateId('sec_clone'),
        title: `${targetSec.title} (Copy)`,
        components: targetSec.components.map(cloneDeep),
      };

      const secIndex = activePage.sections.findIndex((s) => s.id === sectionId);
      addSection(duplicated, secIndex + 1);
    },
    [activePage.sections, addSection]
  );

  const moveSection = useCallback(
    (sectionId: string, direction: 'up' | 'down') => {
      const idx = activePage.sections.findIndex((s) => s.id === sectionId);
      if (idx === -1) return;
      if (direction === 'up' && idx === 0) return;
      if (direction === 'down' && idx === activePage.sections.length - 1) return;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const newSections = [...activePage.sections];
      const [removed] = newSections.splice(idx, 1);
      newSections.splice(targetIdx, 0, removed);

      const updatedPages = template.pages.map((page) =>
        page.id === activePage.id ? { ...page, sections: newSections } : page
      );
      pushTemplateState({ ...template, pages: updatedPages });
    },
    [activePage, template, pushTemplateState]
  );

  // Component operations
  const updateComponentHelper = (
    components: ComponentNode[],
    id: string,
    updates: Partial<ComponentNode>
  ): ComponentNode[] => {
    return components.map((comp) => {
      if (comp.id === id) {
        return {
          ...comp,
          ...updates,
          props: { ...comp.props, ...updates.props },
          styles: { ...comp.styles, ...updates.styles },
        };
      }
      if (comp.children && comp.children.length > 0) {
        return {
          ...comp,
          children: updateComponentHelper(comp.children, id, updates),
        };
      }
      return comp;
    });
  };

  const updateComponent = useCallback(
    (sectionId: string, componentId: string, updates: Partial<ComponentNode>) => {
      const updatedPages = template.pages.map((page) => {
        if (page.id !== activePage.id) return page;
        const updatedSections = page.sections.map((sec) => {
          if (sec.id !== sectionId) return sec;
          return {
            ...sec,
            components: updateComponentHelper(sec.components, componentId, updates),
          };
        });
        return { ...page, sections: updatedSections };
      });

      pushTemplateState({ ...template, pages: updatedPages });
    },
    [template, activePage.id, pushTemplateState]
  );

  const addComponentToSection = useCallback(
    (sectionId: string, component: ComponentNode, index?: number) => {
      const updatedPages = template.pages.map((page) => {
        if (page.id !== activePage.id) return page;
        const updatedSections = page.sections.map((sec) => {
          if (sec.id !== sectionId) return sec;
          const newComps = [...sec.components];
          if (typeof index === 'number' && index >= 0) {
            newComps.splice(index, 0, component);
          } else {
            newComps.push(component);
          }
          return { ...sec, components: newComps };
        });
        return { ...page, sections: updatedSections };
      });

      pushTemplateState({ ...template, pages: updatedPages });
      setSelectedSectionId(sectionId);
      setSelectedComponentId(component.id);
    },
    [template, activePage.id, pushTemplateState]
  );

  const removeComponentHelper = (
    components: ComponentNode[],
    id: string
  ): ComponentNode[] => {
    return components
      .filter((c) => c.id !== id)
      .map((c) => ({
        ...c,
        children: c.children ? removeComponentHelper(c.children, id) : undefined,
      }));
  };

  const removeComponent = useCallback(
    (sectionId: string, componentId: string) => {
      const updatedPages = template.pages.map((page) => {
        if (page.id !== activePage.id) return page;
        const updatedSections = page.sections.map((sec) => {
          if (sec.id !== sectionId) return sec;
          return {
            ...sec,
            components: removeComponentHelper(sec.components, componentId),
          };
        });
        return { ...page, sections: updatedSections };
      });

      pushTemplateState({ ...template, pages: updatedPages });
      if (selectedComponentId === componentId) {
        setSelectedComponentId(null);
      }
    },
    [template, activePage.id, selectedComponentId, pushTemplateState]
  );

  const moveComponent = useCallback(
    (sectionId: string, componentId: string, direction: 'up' | 'down') => {
      const sec = activePage.sections.find((s) => s.id === sectionId);
      if (!sec) return;

      const idx = sec.components.findIndex((c) => c.id === componentId);
      if (idx === -1) return;
      if (direction === 'up' && idx === 0) return;
      if (direction === 'down' && idx === sec.components.length - 1) return;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const newComps = [...sec.components];
      const [removed] = newComps.splice(idx, 1);
      newComps.splice(targetIdx, 0, removed);

      const updatedPages = template.pages.map((page) => {
        if (page.id !== activePage.id) return page;
        const updatedSections = page.sections.map((s) =>
          s.id === sectionId ? { ...s, components: newComps } : s
        );
        return { ...page, sections: updatedSections };
      });

      pushTemplateState({ ...template, pages: updatedPages });
    },
    [activePage, template, pushTemplateState]
  );

  // Page operations
  const setActivePage = useCallback((pageId: string) => {
    setActivePageId(pageId);
    clearSelection();
  }, [clearSelection]);

  const addPage = useCallback(
    (name: string, slug: string) => {
      const newPage: PageNode = {
        id: generateId('page'),
        name,
        slug: slug.startsWith('/') ? slug : `/${slug}`,
        seo: {
          title: `${name} — ${template.name}`,
          description: `${name} page for ${template.name}`,
        },
        sections: [],
      };

      const updated = {
        ...template,
        pages: [...template.pages, newPage],
      };
      pushTemplateState(updated);
      setActivePageId(newPage.id);
      clearSelection();
    },
    [template, clearSelection, pushTemplateState]
  );

  const updatePage = useCallback(
    (pageId: string, updates: Partial<PageNode>) => {
      const updatedPages = template.pages.map((p) =>
        p.id === pageId ? { ...p, ...updates } : p
      );
      pushTemplateState({ ...template, pages: updatedPages });
    },
    [template, pushTemplateState]
  );

  const deletePage = useCallback(
    (pageId: string) => {
      if (template.pages.length <= 1) {
        alert('You must keep at least one page in your portfolio template.');
        return;
      }
      const updatedPages = template.pages.filter((p) => p.id !== pageId);
      const nextActiveId =
        activePageId === pageId ? updatedPages[0].id : activePageId;

      pushTemplateState({ ...template, pages: updatedPages });
      setActivePageId(nextActiveId);
      clearSelection();
    },
    [template, activePageId, clearSelection, pushTemplateState]
  );

  // Theme & template operations
  const updateTheme = useCallback(
    (updates: Partial<ThemeConfig>) => {
      const updatedTheme = {
        ...template.theme,
        ...updates,
        palette: {
          ...template.theme.palette,
          ...(updates.palette || {}),
        },
        typography: {
          ...template.theme.typography,
          ...(updates.typography || {}),
        },
      };
      pushTemplateState({ ...template, theme: updatedTheme });
    },
    [template, pushTemplateState]
  );

  const setThemePreset = useCallback(
    (presetKey: string) => {
      const found = THEME_PRESETS[presetKey];
      if (found) {
        updateTheme(found);
      }
    },
    [updateTheme]
  );

  const loadTemplate = useCallback(
    (newTemplate: PortfolioTemplate) => {
      pushTemplateState(newTemplate);
      setActivePageId(newTemplate.pages[0]?.id || 'page_home');
      clearSelection();
    },
    [clearSelection, pushTemplateState]
  );

  const resetToDefault = useCallback(() => {
    pushTemplateState(DEFAULT_DEVELOPER_TEMPLATE);
    setActivePageId(DEFAULT_DEVELOPER_TEMPLATE.pages[0].id);
    clearSelection();
  }, [clearSelection, pushTemplateState]);

  const randomizeTheme = useCallback(
    (options?: RandomThemeOptions) => {
      const newTheme = generateRandomTheme(options, template.theme.borderRadius);
      pushTemplateState({
        ...template,
        theme: newTheme,
      });
    },
    [template, pushTemplateState]
  );

  // Undo / Redo
  const undo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((prevStack) => prevStack.slice(0, -1));
    setFuture((nextStack) => [template, ...nextStack]);
    setTemplate(prev);
    // ensure activePageId still exists
    if (!prev.pages.some((p) => p.id === activePageId)) {
      setActivePageId(prev.pages[0]?.id || 'page_home');
    }
    clearSelection();
  }, [history, template, activePageId, clearSelection]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((nextStack) => nextStack.slice(1));
    setHistory((prevStack) => [...prevStack, template]);
    setTemplate(next);
    if (!next.pages.some((p) => p.id === activePageId)) {
      setActivePageId(next.pages[0]?.id || 'page_home');
    }
    clearSelection();
  }, [future, template, activePageId, clearSelection]);

  // Import / Export
  const exportJSON = useCallback(() => {
    return JSON.stringify(template, null, 2);
  }, [template]);

  const importJSON = useCallback(
    (jsonStr: string): boolean => {
      try {
        const parsed = JSON.parse(jsonStr) as PortfolioTemplate;
        if (!parsed.id || !Array.isArray(parsed.pages) || parsed.pages.length === 0) {
          throw new Error('Invalid template schema');
        }
        pushTemplateState(parsed);
        setActivePageId(parsed.pages[0].id);
        clearSelection();
        return true;
      } catch (e) {
        console.error('Failed to import JSON', e);
        return false;
      }
    },
    [clearSelection, pushTemplateState]
  );

  const value = useMemo(
    () => ({
      template,
      activePage,
      activePageId,
      selectedSectionId,
      selectedComponentId,
      selectedSection,
      selectedComponent,
      viewport,
      isLivePreview,
      activeSidebarTab,
      canUndo: history.length > 0,
      canRedo: future.length > 0,
      selectSection,
      selectComponent,
      clearSelection,
      addSection,
      updateSection,
      removeSection,
      duplicateSection,
      moveSection,
      addComponentToSection,
      updateComponent,
      removeComponent,
      moveComponent,
      setActivePage,
      addPage,
      updatePage,
      deletePage,
      updateTheme,
      loadTemplate,
      setThemePreset,
      randomizeTheme,
      resetToDefault,
      setViewport,
      setIsLivePreview,
      setActiveSidebarTab,
      undo,
      redo,
      exportJSON,
      importJSON,
    }),
    [
      template,
      activePage,
      activePageId,
      selectedSectionId,
      selectedComponentId,
      selectedSection,
      selectedComponent,
      viewport,
      isLivePreview,
      activeSidebarTab,
      history.length,
      future.length,
      selectSection,
      selectComponent,
      clearSelection,
      addSection,
      updateSection,
      removeSection,
      duplicateSection,
      moveSection,
      addComponentToSection,
      updateComponent,
      removeComponent,
      moveComponent,
      setActivePage,
      addPage,
      updatePage,
      deletePage,
      updateTheme,
      loadTemplate,
      setThemePreset,
      randomizeTheme,
      resetToDefault,
      setViewport,
      setIsLivePreview,
      setActiveSidebarTab,
      undo,
      redo,
      exportJSON,
      importJSON,
    ]
  );

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
