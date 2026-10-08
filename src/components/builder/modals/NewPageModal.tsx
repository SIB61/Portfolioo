'use client';

import React, { useState } from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { X, Plus, FileText } from 'lucide-react';

interface NewPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPageModal: React.FC<NewPageModalProps> = ({ isOpen, onClose }) => {
  const { addPage } = useBuilder();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const computedSlug = slug.trim()
      ? slug.trim()
      : `/${name.trim().toLowerCase().replace(/\s+/g, '-')}`;
    addPage(name.trim(), computedSlug);
    setName('');
    setSlug('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="text-base font-bold text-white">Add New Page</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 mb-1 block">
              Page Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Case Studies, Resume, Blog"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug || slug === `/${name.toLowerCase().replace(/\s+/g, '-')}`) {
                  setSlug(`/${e.target.value.toLowerCase().replace(/\s+/g, '-')}`);
                }
              }}
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 mb-1 block">
              URL Slug Route
            </label>
            <input
              type="text"
              placeholder="/case-studies"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Page</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
