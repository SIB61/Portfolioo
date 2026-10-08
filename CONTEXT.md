# Portfolioo — Project Context & Architecture Knowledge Base

> **Quick Handoff Note for LLM / Developer**:  
> Read this document to resume development of **Portfolioo** with full context on architecture, data models, state management, route structure, and the planned roadmap.

---

## 1. Project Overview & Vision
**Portfolioo** is a modular, generic portfolio builder designed to create custom, high-converting portfolios for professionals across different domains (e.g. Software Engineers, Product/UIUX Designers, Strategic Consultants, Creative Artists).

The architecture strictly follows a **4-tier composability hierarchy**:
1. **Atomic Components** (`ComponentNode`): Fundamental building blocks (Headings, Paragraphs, Buttons, Badges, Avatars, Showcase Images, Social Links, Stat Cards, Skill Clouds, Project Cards, Experience Items, Testimonial Cards, Dividers, Layout Containers).
2. **Sections** (`SectionNode`): Purpose-built compositions of atomic components (Hero Header, About & Metrics, Project Showcase, Skills Matrix, Experience Timeline, Testimonials, Contact CTA, Custom Container) with section-level layout, padding, and background styling.
3. **Pages** (`PageNode`): Multi-page routing (e.g. `/` Home, `/projects` Projects, `/about` About, `/contact` Contact, `/resume` Resume) with individual SEO metadata (title, description).
4. **Full Templates** (`PortfolioTemplate`): Complete multi-page archetypes bundled with a global theme configuration (color palette, typography pairings, border radius tokens).

---

## 2. Technology Stack & Environment
- **Framework**: Next.js 16.4.0 (Turbopack, App Router, React 19)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`), Geist font family
- **Icons**: `lucide-react` + embedded SVG brand icons (GitHub, LinkedIn, Twitter/X, YouTube, Dribbble)
- **Database / ORM**: Prisma ORM v7 with Neon Serverless PostgreSQL adapter (`prisma/schema.prisma`, `src/lib/prisma.ts`)
- **Object Storage**: AWS S3 client with presigned URL upload support (`src/lib/s3.ts`)
- **State Management**: React Context + Hooks with immutable history stack (Undo / Redo), local storage persistence, and JSON portability

---

## 3. Directory & File Structure

```
portfolioo/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global HTML shell & Portfolioo metadata
│   │   ├── globals.css           # Tailwind CSS v4 setup & root variables
│   │   ├── page.tsx              # Public Landing Page for Portfolioo
│   │   ├── build/
│   │   │   └── page.tsx          # Visual Portfolio Builder Studio
│   │   └── preview/
│   │       └── page.tsx          # Standalone full-screen portfolio live preview
│   ├── types/
│   │   └── builder.ts            # Core TypeScript schemas (ComponentNode, SectionNode, PageNode, PortfolioTemplate, ThemeConfig)
│   ├── lib/
│   │   ├── componentLibrary.ts   # Catalog of atomic components and pre-built sections with factory defaults
│   │   ├── defaultTemplates.ts   # Handcrafted archetypes (DevCraft Pro, Studio Minimal, Apex Advisory) & curated themes
│   │   ├── themeGenerator.ts     # Color harmony engine, 8 mood archetypes, contrast math, and theme randomizer
│   │   ├── prisma.ts             # Prisma client singleton (Neon Postgres)
│   │   └── s3.ts                 # AWS S3 presigned URL helpers
│   ├── context/
│   │   └── BuilderContext.tsx    # Global builder store: selection, CRUD, undo/redo, theme randomizer, local storage sync
│   └── components/
│       ├── renderer/
│       │   ├── ComponentRenderer.tsx  # Recursive atomic block renderer with builder selection overlay
│       │   ├── SectionRenderer.tsx    # Section container renderer with floating action toolbar
│       │   └── PageRenderer.tsx       # Full page renderer with sticky header, section iterates, and footer
│       └── builder/
│           ├── PortfolioBuilder.tsx   # Master studio layout with keyboard shortcuts
│           ├── BuilderNavbar.tsx      # Top bar: viewports, undo/redo, shuffle theme, page tabs, live preview toggle
│           ├── BuilderSidebar.tsx     # Left toolbox: Sections, Atomic elements, Page tree, Theme Studio, Archetypes
│           ├── BuilderCanvas.tsx      # Interactive workspace with Desktop, Tablet, and Mobile device frames
│           ├── PropertiesPanel.tsx    # Right inspector: context-aware property & style editing
│           └── modals/
│               ├── TemplateSelectorModal.tsx  # Browse and switch profession templates
│               ├── CodeExportModal.tsx        # Inspect, copy, download, or import JSON schema
│               ├── SectionPickerModal.tsx     # Modal to insert new sections at specific canvas positions
│               └── NewPageModal.tsx           # Create new pages with name and URL slug
├── prisma/
│   └── schema.prisma             # Database schema (Neon Postgres)
├── package.json
└── CONTEXT.md                    # This context knowledge file
```

---

## 4. Active Routes

| Route | Purpose | File |
| :--- | :--- | :--- |
| **`/`** | **Landing Page**: Value proposition, 4-tier hierarchy diagram, features grid, profession archetype cards, and CTAs. | [`src/app/page.tsx`](file:///home/sabit/antigravity_projects/portfolioo/src/app/page.tsx) |
| **`/build`** | **Visual Builder Studio**: Full interactive studio with viewport frames, toolbox, canvas, properties inspector, theme randomizer, and modals. | [`src/app/build/page.tsx`](file:///home/sabit/antigravity_projects/portfolioo/src/app/build/page.tsx) |
| **`/preview`** | **Live Portfolio Preview**: Clean presentation of the active portfolio without builder chrome, with floating return button. | [`src/app/preview/page.tsx`](file:///home/sabit/antigravity_projects/portfolioo/src/app/preview/page.tsx) |

---

## 5. Core Data Contracts (`src/types/builder.ts`)

```typescript
// 1. Atomic Component
export interface ComponentNode {
  id: string;
  type: ComponentType; // 'heading' | 'paragraph' | 'button' | 'badge' | 'avatar' | 'image' | 'socialLinks' | 'statCard' | 'skillPills' | 'projectCard' | 'experienceItem' | 'testimonialCard' | 'divider' | 'container'
  props: AnyComponentProps;
  styles?: ComponentStyles;
  children?: ComponentNode[]; // For container layout
}

// 2. Composed Section
export interface SectionNode {
  id: string;
  type: SectionType; // 'hero' | 'about' | 'projects' | 'skills' | 'experience' | 'services' | 'testimonials' | 'contact' | 'custom'
  title: string;
  subtitle?: string;
  components: ComponentNode[];
  styles: SectionStyles; // paddingY, containerWidth ('boxed'|'wide'|'full'), backgroundColor
  visible?: boolean;
}

// 3. Multi-Page Node
export interface PageNode {
  id: string;
  name: string;
  slug: string; // e.g. '/', '/projects', '/about', '/contact'
  sections: SectionNode[];
  seo: {
    title: string;
    description: string;
  };
}

// 4. Global Theme Tokens
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

// 5. Complete Template
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
```

---

## 6. Key Features & How They Work

### Theme Generator & Color Theory Randomizer (`src/lib/themeGenerator.ts`)
- Accessible color generation based on HSL color harmony (Monochromatic, Analogous, Complementary, Triadic).
- **8 Mood Archetypes**:
  - `cyber-neon` (Electric cyan, lime, magenta, dark teal)
  - `editorial-warm` (Terracotta, warm amber, copper, espresso stone)
  - `oceanic-nordic` (Deep sea navy, icy blue, glacial teal)
  - `forest-emerald` (Deep moss, cyber jade, sage)
  - `creative-vibrant` (Pop purple, electric blue, coral)
  - `minimal-mono` (Clean monochrome slate with crisp accents)
  - `clean-light` (Agency high-end light style with jewel accents)
  - `any` (Surprise me!)
- **Contrast Guarantees**: Dark mode maintains $<7\%$ background lightness and $>94\%$ text lightness; light mode maintains $>97\%$ background and $<12\%$ text.
- **Controls in Studio**:
  - "🎲 Randomize Theme" action button with spin animation.
  - Quick "Shuffle Theme" button in the top navbar.
  - Archetype filter dropdown and Dark/Light/Any mode switcher.
  - "Radius Lock" toggle to preserve corner radius while shuffling colors and fonts.

### Visual Canvas & Responsive Viewports
- Viewport toggle in top bar: **Desktop** (full width), **Tablet** (768px frame), **Mobile** (390px iPhone frame with dynamic island).
- Section hover toolbar: Move Up, Move Down, Duplicate, Delete, Settings.
- Divider insert triggers (`+ Insert Section`) between any two sections.
- Quick `+ Add Component` action within each section.

### History, Portability & Persistence
- **Undo / Redo**: 30-level history stack via `BuilderContext`.
- **Keyboard Shortcuts**: `Cmd+Z` / `Ctrl+Z` (Undo), `Cmd+Shift+Z` / `Ctrl+Shift+Z` / `Ctrl+Y` (Redo), `Escape` (Clear selection).
- **Local Storage**: Automatically syncs the user's active template state under `portfolio_builder_state_v1`.
- **JSON Portability**: Code modal at `/build` exports clean JSON and allows pasting to import any template.

---

## 7. Next Steps & Development Roadmap
When continuing development from another session or account, consider the following prioritized enhancements:

1. **Backend Persistence with Prisma & Neon**:
   - Add a `Portfolio` model in `prisma/schema.prisma` linking to user accounts or slugs (e.g. `slug`, `title`, `data Json`, `isPublished Boolean`).
   - Create Next.js API route / Server Actions (`/api/portfolios`, `savePortfolioAction`, `getPortfolioBySlug`).
2. **S3 Image Upload Integration**:
   - Wire the presigned URL generator in `src/lib/s3.ts` to avatar and project image uploaders in `PropertiesPanel.tsx`.
3. **Public Published Portfolio Route**:
   - Create dynamic route `/p/[slug]` (or custom subdomains) to render published portfolios using `PageRenderer.tsx` directly from the database.
4. **Drag-and-Drop Reordering**:
   - Optional enhancement to add `@dnd-kit` or HTML5 drag-and-drop for sections and components in the sidebar and canvas.
5. **Authentication**:
   - Integrate Auth (NextAuth/Auth.js or Clerk) to save portfolios per authenticated user.

---

## 8. Development Commands
- Start dev server: `npm run dev` (Runs on http://localhost:3000)
- Production build: `npm run build`
- Run linting: `npm run lint`
- Prisma studio: `npx prisma studio`
