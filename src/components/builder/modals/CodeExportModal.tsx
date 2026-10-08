'use client';

import React, { useState } from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { X, Copy, Check, Download, Upload, AlertCircle } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const { exportJSON, importJSON, template } = useBuilder();
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const jsonContent = exportJSON();

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportError(null);
    if (!importText.trim()) {
      setImportError('Please paste a JSON template string.');
      return;
    }
    const success = importJSON(importText);
    if (success) {
      alert('Portfolio template successfully imported!');
      onClose();
    } else {
      setImportError('Invalid JSON structure. Please check the schema.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">Schema & Portability</h2>
            <div className="flex bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
              <button
                onClick={() => setActiveTab('export')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  activeTab === 'export'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Export JSON
              </button>
              <button
                onClick={() => setActiveTab('import')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  activeTab === 'import'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Import JSON
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-400">
                  This serializable JSON captures all pages, sections, components, props, styles, and themes.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg border border-zinc-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 overflow-x-auto max-h-[420px] select-text">
                  {jsonContent}
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400">
                Paste an exported JSON portfolio object below to restore or migrate templates.
              </p>

              {importError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              <textarea
                rows={12}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste portfolio JSON here..."
                className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 resize-y"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleImport}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import & Apply</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
