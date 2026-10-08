import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Blocks,
  Component as ComponentIcon,
  Layers,
  Palette,
  Dices,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Code2,
  CheckCircle2,
  ChevronRight,
  Briefcase,
  FolderGit2,
  UserCheck,
  Zap,
  ShieldCheck,
  Eye,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. TOP NAVIGATION */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Portfolioo
            </span>
            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
              Builder
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <a href="#architecture" className="hover:text-zinc-100 transition-colors">
            Architecture
          </a>
          <a href="#features" className="hover:text-zinc-100 transition-colors">
            Features
          </a>
          <a href="#archetypes" className="hover:text-zinc-100 transition-colors">
            Profession Templates
          </a>
          <Link href="/preview" className="hover:text-zinc-100 transition-colors flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/preview"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all"
          >
            <span>Preview Portfolio</span>
          </Link>

          <Link
            href="/build"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <span>Launch Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold shadow-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Generic Portfolio Builder for Different Professionals</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Build custom portfolios from{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              atomic blocks
            </span>{' '}
            to full templates.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed">
            Atomic components form sections. Sections form multi-page sites. Multi-page sites form
            tailored profession templates. Customize every detail, randomize harmonious color palettes,
            and export clean JSON.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/build"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Open Visual Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/preview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 rounded-xl transition-all"
            >
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Explore Live Preview</span>
            </Link>

            <a
              href="#archetypes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              <span>See Archetypes</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-medium text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Customizable</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Color Theory Randomizer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Multi-Device Viewport Frames</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Undo & Redo History</span>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE BUILDER STUDIO PREVIEW MOCKUP */}
        <div className="mt-14 max-w-6xl mx-auto px-2 sm:px-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Mockup Topbar */}
            <div className="h-11 bg-zinc-950 border-b border-zinc-800 px-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-zinc-400 text-[11px]">
                  portfolioo.studio/build
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md text-[11px] text-zinc-300">
                <Monitor className="w-3.5 h-3.5 text-blue-400" />
                <span>Desktop (100%)</span>
              </div>

              <Link
                href="/build"
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-semibold flex items-center gap-1"
              >
                <span>Live Interactive Studio</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Mockup Workspace Layout */}
            <div className="grid grid-cols-12 min-h-[380px] sm:min-h-[460px]">
              {/* Left Toolbox */}
              <div className="hidden md:block col-span-3 border-r border-zinc-800 bg-zinc-950/60 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <span className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">
                    Toolbox Presets
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px]">
                    12 Blocks
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-zinc-200">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-medium">Hero Header</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-zinc-200">
                    <FolderGit2 className="w-3.5 h-3.5 text-rose-400" />
                    <span className="font-medium">Project Showcase Grid</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-zinc-200">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-medium">Experience Timeline</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-zinc-200">
                    <Blocks className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-medium">Skills & Capabilities</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80">
                  <div className="p-3 bg-gradient-to-br from-indigo-950/40 to-blue-950/40 border border-indigo-500/30 rounded-xl">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                      <Dices className="w-3.5 h-3.5 animate-spin" />
                      <span>Theme Randomizer</span>
                    </div>
                    <p className="mt-1 text-[10px] text-zinc-400">
                      Roll harmonious palettes & typography in 1-click
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Canvas Preview */}
              <div className="col-span-12 md:col-span-6 bg-zinc-950 p-6 flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    🟢 Available for select roles
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Hi, I&apos;m Alex Rivera. I engineer resilient platforms.
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md">
                    Staff Full-Stack Engineer with 8+ years crafting cloud architectures and high-impact web apps.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow">
                    View Work
                  </span>
                  <span className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300">
                    Get in Touch
                  </span>
                </div>

                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                    <p className="text-lg font-bold text-white">8+ yrs</p>
                    <p className="text-[10px] text-zinc-500">Industry Experience</p>
                  </div>
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                    <p className="text-lg font-bold text-white">99.99%</p>
                    <p className="text-[10px] text-zinc-500">Uptime Maintained</p>
                  </div>
                </div>
              </div>

              {/* Right Properties Panel */}
              <div className="hidden md:block col-span-3 border-l border-zinc-800 bg-zinc-950/60 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <span className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">
                    Active Inspector
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono text-[9px]">
                    HERO
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Padding</label>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 text-[11px]">
                      Large (py-20)
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Width</label>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 text-[11px]">
                      Boxed (Max 1024px)
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Border Radius</label>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 text-[11px]">
                      Large (rounded-lg)
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/80">
                  <Link
                    href="/build"
                    className="w-full py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-lg text-center block font-semibold transition-colors text-[11px]"
                  >
                    Launch Interactive Studio &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4-TIER HIERARCHY SECTION */}
      <section id="architecture" className="py-20 border-t border-zinc-900 bg-zinc-950/50 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              The Modular System
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Atomic Blocks to Multi-Page Templates
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every portfolio in Portfolioo is structured according to a composable mental model
              ensuring granular customization and design integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Level 1 */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800/90 rounded-2xl flex flex-col justify-between hover:border-blue-500/50 transition-all hover:shadow-xl group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <ComponentIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Tier 1
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Atomic Blocks</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Headings, buttons, badges, avatars, showcase images, skill pills, stat counters, and social icons.
                </p>
              </div>
              <span className="mt-6 text-[11px] font-mono text-zinc-500">ComponentNode</span>
            </div>

            {/* Level 2 */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800/90 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition-all hover:shadow-xl group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  <Blocks className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Tier 2
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Sections</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Hero banners, about bios, portfolio grids, tech matrices, career timelines, and contact CTAs.
                </p>
              </div>
              <span className="mt-6 text-[11px] font-mono text-zinc-500">SectionNode</span>
            </div>

            {/* Level 3 */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800/90 rounded-2xl flex flex-col justify-between hover:border-purple-500/50 transition-all hover:shadow-xl group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                  Tier 3
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Pages</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Home (/), Projects (/projects), About (/about), and Contact (/contact) with dedicated SEO metadata.
                </p>
              </div>
              <span className="mt-6 text-[11px] font-mono text-zinc-500">PageNode</span>
            </div>

            {/* Level 4 */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800/90 rounded-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:shadow-xl group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Tier 4
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Full Templates</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Profession-tailored templates with complete styling tokens, fonts, and responsive layouts.
                </p>
              </div>
              <span className="mt-6 text-[11px] font-mono text-zinc-500">PortfolioTemplate</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE FEATURES GRID */}
      <section id="features" className="py-20 border-t border-zinc-900 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Builder Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for Speed & Precision
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Everything you need to design, test, customize, and export professional web portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl w-fit">
                <Dices className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Harmonious Theme Randomizer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Color theory engine with 8 mood archetypes (Cyber Neon, Warm Editorial, Oceanic Nordic, Forest Emerald) ensuring accessible contrast ratios.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl w-fit">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Responsive Viewport Modes</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Live device frames for Desktop (full width), Tablet (768px), and Mobile (390px) to verify layouts across all screen form factors.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Context-Aware Inspector</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Select any component to edit copy, links, images, or alignment. Select a section to modify container width, padding, and background color.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-3">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl w-fit">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Multi-Page Architecture</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Add dedicated pages for Case Studies, Resumes, or Writings with customizable route slugs and SEO metadata.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl w-fit">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">JSON Portability & Export</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Complete portfolio templates export as serializable JSON, ready to save to Postgres, download as backup, or import across environments.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-3">
              <div className="p-2.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Full History & Shortcuts</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Enjoy complete undo/redo support with standard keyboard shortcuts (Ctrl+Z / Cmd+Z) so you can experiment fearlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROFESSION ARCHETYPES SHOWCASE */}
      <section id="archetypes" className="py-20 border-t border-zinc-900 bg-zinc-950/50 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Profession Archetypes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pre-Tuned for Your Career
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Explore out-of-the-box archetypes crafted specifically for engineers, designers, and consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Engineer */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Software Engineering
                </span>
                <h3 className="text-xl font-bold text-white mt-1">DevCraft Pro</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Engineered for software developers and architects. Features GitHub integrations, interactive tech stack matrices, live demo previews, and career timelines.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">3 Pages included</span>
                <Link
                  href="/build"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  <span>Build with this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Designer */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Product & UI/UX
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Studio Minimal</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Editorial serif aesthetics with focus on case study cards, high-res visual mockups, client endorsements, and design philosophy quotes.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">2 Pages included</span>
                <Link
                  href="/build"
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                >
                  <span>Build with this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Consultant */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Advisory & Leadership
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Apex Advisory</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Authority-driven layout for consultants and fractional CTOs. Emphasizes executive value propositions, metric counters, and consultation bookings.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">1 Page included</span>
                <Link
                  href="/build"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                >
                  <span>Build with this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-20 border-t border-zinc-900 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-zinc-950 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-500/25">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to design your signature portfolio?
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Start right now inside the visual studio. Add sections, customize components, shuffle
            themes, and preview your brand in seconds.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/build"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Launch Portfolioo Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/preview"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl transition-all"
            >
              <span>View Standalone Preview</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 px-4 sm:px-8 py-8 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
            P
          </div>
          <span className="font-bold text-zinc-300">Portfolioo</span>
          <span>&copy; 2026. Generic Portfolio Builder.</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/build" className="hover:text-zinc-300 transition-colors">
            Builder Studio
          </Link>
          <Link href="/preview" className="hover:text-zinc-300 transition-colors">
            Live Preview
          </Link>
          <a href="#architecture" className="hover:text-zinc-300 transition-colors">
            Architecture
          </a>
          <a href="#features" className="hover:text-zinc-300 transition-colors">
            Features
          </a>
        </div>
      </footer>
    </div>
  );
}
