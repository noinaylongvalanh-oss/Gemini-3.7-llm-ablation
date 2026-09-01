import React, { useState } from 'react';
import { ModelProfile, TuningConfig } from '../types';
import { generatePythonScript, generateJupyterNotebook } from '../utils/code_generators';
import { Copy, Download, Check, FileCode2, BookOpen, Sparkles, Terminal } from 'lucide-react';

interface CodeExporterProps {
  currentModel: ModelProfile;
  config: TuningConfig;
}

export const CodeExporter: React.FC<CodeExporterProps> = ({
  currentModel,
  config
}) => {
  const [activeExportFormat, setActiveExportFormat] = useState<'python' | 'notebook'>('python');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const pythonScript = generatePythonScript(currentModel, config);
  const notebookJson = generateJupyterNotebook(currentModel, config);

  const activeContent = activeExportFormat === 'python' ? pythonScript : notebookJson;
  const fileName = activeExportFormat === 'python'
    ? `abliterate_${currentModel.id}.py`
    : `abliterate_${currentModel.id}_colab.ipynb`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const mimeType = activeExportFormat === 'python' ? 'text/x-python' : 'application/json';
    const blob = new Blob([activeContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#010409]">
      {/* Header Banner */}
      <div className="p-5 bg-slate-900/40 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              MODULE 05
            </span>
            <h2 className="text-base font-mono font-bold text-white uppercase">
              1-Click Python Script & Google Colab Jupyter Notebook (.ipynb) Exporter
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Industrial PyTorch code with mathematical annotations, float16/bfloat16 tensor calculations, and Colab T4 1-Click execution.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-white/10 font-mono text-xs font-semibold transition-all"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {isCopied ? 'Copied to Clipboard!' : 'Copy Code'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <Download className="w-4 h-4" />
            Download {activeExportFormat === 'python' ? '.py Script' : '.ipynb Notebook'}
          </button>
        </div>
      </div>

      {/* Format Switcher & Info Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveExportFormat('python')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeExportFormat === 'python'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white bg-slate-900/40'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            Standalone PyTorch Script (.py)
          </button>

          <button
            onClick={() => setActiveExportFormat('notebook')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeExportFormat === 'notebook'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white bg-slate-900/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Google Colab / Kaggle Notebook (.ipynb)
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Target: <strong className="text-white">{currentModel.name}</strong></span>
          <span>Alpha: <strong className="text-cyan-400">{config.alphaRange[0]}</strong></span>
          <span>Layers: <strong className="text-cyan-400">L{config.layerRange[0]}-L{config.layerRange[1]}</strong></span>
        </div>
      </div>

      {/* Code Display Deck */}
      <div className="p-5 border border-white/10 rounded-xl bg-slate-950 flex flex-col gap-3 font-mono text-xs shadow-inner">
        <div className="flex items-center justify-between text-slate-500 text-[11px] pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300">{fileName}</span>
          </div>
          <span>Python 3.10+ / PyTorch 2.4+ / Accelerate / Safetensors</span>
        </div>

        <div className="overflow-x-auto max-h-[500px] overflow-y-auto pr-2 text-slate-300 leading-relaxed text-[11px] font-mono select-text whitespace-pre">
          {activeContent}
        </div>
      </div>
    </div>
  );
};
