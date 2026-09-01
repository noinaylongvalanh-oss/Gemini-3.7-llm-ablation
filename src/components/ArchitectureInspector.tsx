import React, { useState } from 'react';
import { ModelProfile, ArchitectureSuite, TargetTensorMapping } from '../types';
import { SOTA_MODELS_REGISTRY } from '../data/models_registry';
import { Cpu, ShieldCheck, ShieldAlert, Layers, Search, Check, Sparkles, AlertTriangle, Eye } from 'lucide-react';

interface ArchitectureInspectorProps {
  currentModel: ModelProfile;
  onSelectModel: (model: ModelProfile) => void;
}

export const ArchitectureInspector: React.FC<ArchitectureInspectorProps> = ({
  currentModel,
  onSelectModel
}) => {
  const [activeSuiteFilter, setActiveSuiteFilter] = useState<ArchitectureSuite | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredModels = SOTA_MODELS_REGISTRY.filter((m) => {
    const matchesSuite = activeSuiteFilter === 'all' || m.suite === activeSuiteFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.hfRepo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.architectureType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSuite && matchesSearch;
  });

  const suites: { id: ArchitectureSuite | 'all'; label: string }[] = [
    { id: 'all', label: 'All Architectures' },
    { id: 'gpt-oss', label: 'OpenAI GPT-OSS Suite' },
    { id: 'gemma', label: 'Google Gemma 4 / 3 / 2 Suite' },
    { id: 'muse-nvidia', label: 'Meta Muse & NVIDIA Suite' },
    { id: 'reasoning-frontier', label: 'Reasoning & Frontier Giants' }
  ];

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#010409]">
      {/* Top Banner */}
      <div className="p-5 bg-slate-900/40 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              MODULE 03
            </span>
            <h2 className="text-base font-mono font-bold text-white uppercase">
              SOTA Multi-Architecture Registry & Target Tensor Path Inspector
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Automatic architecture recognition, tensor path routing, and intelligence protection guards across Frontier models.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-lg border border-white/10 w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search model, repo, architecture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Suite Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
        {suites.map((suite) => (
          <button
            key={suite.id}
            onClick={() => setActiveSuiteFilter(suite.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
              activeSuiteFilter === suite.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white bg-slate-900/40'
            }`}
          >
            {suite.label}
          </button>
        ))}
      </div>

      {/* Model Grid & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Card Selection List */}
        <div className="lg:col-span-5 flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
          {filteredModels.map((model) => {
            const isSelected = currentModel.id === model.id;
            return (
              <div
                key={model.id}
                onClick={() => onSelectModel(model)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-900/30 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">
                      {model.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block truncate max-w-[260px]">
                      {model.hfRepo}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                    model.supportsColabT4 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {model.supportsColabT4 ? 'Colab T4 (16GB)' : `${model.vramFp16Gb}GB VRAM`}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-white/5">
                  <span>{model.layerCount} Layers</span>
                  <span>{model.parameterCount}</span>
                  <span className="text-cyan-400">{model.architectureType}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Model Deep Inspector */}
        <div className="lg:col-span-7 p-6 border border-white/10 rounded-xl bg-slate-900/30 flex flex-col gap-5">
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-mono font-bold text-white">
                  {currentModel.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  {currentModel.architectureType}
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                HF Repo: {currentModel.hfRepo}
              </span>
            </div>

            <div className="text-right font-mono text-xs text-slate-400">
              <div>Layers: <span className="text-white font-bold">{currentModel.layerCount}</span></div>
              <div>Hidden Dim: <span className="text-white font-bold">{currentModel.hiddenDimension}</span></div>
            </div>
          </div>

          {/* Architecture Special Features */}
          <div>
            <h4 className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-2">
              Architectural Invariants & Special Hooks
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentModel.specialFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-white/5 text-xs font-mono text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Tensors & Protection Mappings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                Target Tensor Surgery vs Intelligence Protection Routing
              </h4>
              <span className="text-[10px] font-mono text-emerald-400">
                Guarded components prevent MMLU & Reasoning loss
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {currentModel.targetTensors.map((tensor, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-2 ${
                    tensor.guardedForIntelligence
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-cyan-950/20 border-cyan-500/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${tensor.guardedForIntelligence ? 'bg-rose-400' : 'bg-cyan-400'}`} />
                      <span className="font-bold text-slate-100">{tensor.tensorName}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5 pl-4">
                      {tensor.description} (Dim: {tensor.dimension})
                    </span>
                  </div>

                  <div className="pl-4 md:pl-0 shrink-0">
                    {tensor.guardedForIntelligence ? (
                      <span className="px-2 py-0.5 rounded bg-rose-900/60 text-rose-300 text-[10px] font-bold border border-rose-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        GUARDED (NO TOUCH)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        SURGERY TARGET
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
