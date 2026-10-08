'use client';

import React from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { ALL_TEMPLATES } from '@/lib/defaultTemplates';
import { PortfolioTemplate } from '@/types/builder';
import { X, Check, Sparkles } from 'lucide-react';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { template, loadTemplate } = useBuilder();

  if (!isOpen) return null;

  const handleSelect = (tmpl: PortfolioTemplate) => {
    loadTemplate(tmpl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Choose Profession Template
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Select an archetype optimized for your profession. Everything remains 100% customizable.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALL_TEMPLATES.map((tmpl) => {
            const isCurrent = template.id === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className={`bg-zinc-900 border rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:border-zinc-600 hover:shadow-xl ${
                  isCurrent ? 'ring-2 ring-blue-500 border-blue-500' : 'border-zinc-800'
                }`}
              >
                <div>
                  {tmpl.thumbnail && (
                    <div className="aspect-video w-full overflow-hidden bg-zinc-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tmpl.thumbnail}
                        alt={tmpl.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                        {tmpl.profession}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                        {tmpl.pages.length} Pages
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{tmpl.name}</h3>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {tmpl.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-semibold text-zinc-300">Pages:</span>
                      {tmpl.pages.map((p) => p.name).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleSelect(tmpl)}
                    className={`w-full py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <Check className="w-4 h-4" /> Active Template
                      </>
                    ) : (
                      'Load This Template'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
