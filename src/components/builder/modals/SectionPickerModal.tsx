'use client';

import React from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { PREBUILT_SECTIONS } from '@/lib/componentLibrary';
import { X, Sparkles, Plus } from 'lucide-react';

interface SectionPickerModalProps {
  isOpen: boolean;
  insertIndex: number | null;
  onClose: () => void;
}

export const SectionPickerModal: React.FC<SectionPickerModalProps> = ({
  isOpen,
  insertIndex,
  onClose,
}) => {
  const { addSection } = useBuilder();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Insert New Section
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Choose a section block to insert at position #{insertIndex !== null ? insertIndex + 1 : 'end'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-2.5">
          {PREBUILT_SECTIONS.map((secMeta) => (
            <div
              key={secMeta.type}
              onClick={() => {
                const newSec = secMeta.createDefault();
                addSection(newSec, insertIndex ?? undefined);
                onClose();
              }}
              className="p-3.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 hover:border-blue-500/50 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
            >
              <div>
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {secMeta.label}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">{secMeta.description}</p>
              </div>

              <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-blue-600 text-zinc-300 group-hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
