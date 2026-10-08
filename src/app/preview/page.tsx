'use client';

import React from 'react';
import Link from 'next/link';
import { BuilderProvider, useBuilder } from '@/context/BuilderContext';
import { PageRenderer } from '@/components/renderer/PageRenderer';
import { ArrowLeft, Sparkles } from 'lucide-react';

function StandalonePreviewInner() {
  const { activePage, template, setActivePage } = useBuilder();

  return (
    <div className="relative min-h-screen">
      {/* Floating Back to Builder Pill */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/build"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/80 rounded-full shadow-2xl backdrop-blur-md transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400" />
          <span>Back to Portfolioo Builder</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </Link>
      </div>

      <PageRenderer
        page={activePage}
        template={template}
        isBuilderMode={false}
        onNavigatePage={setActivePage}
      />
    </div>
  );
}

export default function StandalonePreviewPage() {
  return (
    <BuilderProvider>
      <StandalonePreviewInner />
    </BuilderProvider>
  );
}
