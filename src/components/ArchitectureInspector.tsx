import React, { useState } from 'react';
import { ModelProfile, ArchitectureSuite } from '../types';
import { SOTA_MODELS_REGISTRY } from '../data/models_registry';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Sliders, 
  BrainCircuit, 
  Network, 
  Zap, 
  Activity, 
  Binary,
  Database,
  ArrowRight
} from 'lucide-react';

interface ArchitectureInspectorProps {
  currentModel: ModelProfile;
  onSelectModel: (model: ModelProfile) => void;
}

export const ArchitectureInspector: React.FC<ArchitectureInspectorProps> = ({
  currentModel,
  onSelectModel
}) => {
  const [showLaymanGuide, setShowLaymanGuide] = useState<boolean>(false);
  const [activeSuiteFilter, setActiveSuiteFilter] = useState<ArchitectureSuite | 'all'>('all');
  const [capabilityFilter, setCapabilityFilter] = useState<'all' | 'colab_t4' | 'cot_reasoning' | 'moe' | 'vision'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredModels = SOTA_MODELS_REGISTRY.filter((m) => {
    const matchesSuite = activeSuiteFilter === 'all' || m.suite === activeSuiteFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.hfRepo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.architectureType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.parameterCount.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCapability = true;
    if (capabilityFilter === 'colab_t4') matchesCapability = m.supportsColabT4;
    else if (capabilityFilter === 'cot_reasoning') matchesCapability = !!m.reasoningCoTTags && m.reasoningCoTTags.length > 0;
    else if (capabilityFilter === 'moe') matchesCapability = m.architectureType === 'Sparse MoE';
    else if (capabilityFilter === 'vision') matchesCapability = m.architectureType === 'Multimodal Vision-Language';

    return matchesSuite && matchesSearch && matchesCapability;
  });

  const suites: { id: ArchitectureSuite | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'Tất Cả Mô Hình', count: SOTA_MODELS_REGISTRY.length },
    { id: 'gpt-oss', label: 'OpenAI GPT-OSS Suite', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'gpt-oss').length },
    { id: 'deepseek', label: 'DeepSeek Frontier (R1/V3)', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'deepseek').length },
    { id: 'qwen', label: 'Alibaba Qwen 2.5 / QwQ', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'qwen').length },
    { id: 'llama', label: 'Meta Llama 3.3 / 3.1 / 3.2', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'llama').length },
    { id: 'mistral', label: 'Mistral & Mixtral MoE', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'mistral').length },
    { id: 'gemma', label: 'Google Gemma 4 / 3 / 2', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'gemma').length },
    { id: 'microsoft-phi', label: 'Microsoft Phi-4 & MoE', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'microsoft-phi').length },
    { id: 'muse-nvidia', label: 'NVIDIA Nemotron & Meta Muse', count: SOTA_MODELS_REGISTRY.filter(m => m.suite === 'muse-nvidia').length }
  ];

  return (
    <div className="flex-1 flex flex-col gap-5 p-6 overflow-y-auto bg-[#010409]">
      {/* Top Banner */}
      <div className="p-5 bg-slate-900/40 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              MODULE 03
            </span>
            <h2 className="text-base font-mono font-bold text-white uppercase">
              SOTA Multi-Architecture Registry ({SOTA_MODELS_REGISTRY.length} Frontier Models)
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Tự động nhận diện Tensor Routing, Ma trận Trọng số MLP/Attention, và Khóa Bảo Vệ Trí Tuệ (Guarded Subspaces) cho toàn bộ các dòng mô hình đỉnh cao nhất thế giới.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => setShowLaymanGuide(!showLaymanGuide)}
            className="text-[10px] px-3 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/60 transition-all font-mono flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {showLaymanGuide ? 'Ẩn Hướng Dẫn' : '💡 Giải Thích Cho Người Mới'}
          </button>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-lg border border-white/10 w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search model, repo, size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {showLaymanGuide && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 text-xs font-mono text-slate-300 space-y-2 animate-fadeIn">
          <div className="text-cyan-300 font-bold flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>💡 Giải Thích Chi Tiết Về Danh Mục Mô Hình & Tuyến Tensor Can Thiệp:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            • <strong>Cách Hoạt Động:</strong> Mỗi kiến trúc AI (Dense, MoE, Vision-Language) tổ chức các ma trận trọng số theo tên gọi khác nhau (ví dụ: Llama dùng <code>mlp.down_proj</code>, Mixtral dùng <code>block_sparse_moe.experts.w2</code>, DeepSeek-R1 dùng <code>mlp.experts.down_proj</code>). Hệ thống tự động ánh xạ đúng vị trí chuẩn xác 100% để bạn can thiệp.<br />
            • <strong>Tensor Màu Xanh (Surgery Target):</strong> Là nơi chứa thông điệp phản xạ từ chối, được can thiệp bằng phép chiếu SVD khử phương sai.<br />
            • <strong>Tensor Màu Đỏ (Guarded):</strong> Bộ định tuyến Router của mạng MoE và bộ giải mã hình ảnh Vision Adapter. Tuyệt đối được khóa bảo vệ để không làm suy giảm MMLU, GSM8K và giữ nguyên khả năng thị giác!
          </p>
        </div>
      )}

      {/* Suite Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10 scrollbar-thin">
        {suites.map((suite) => (
          <button
            key={suite.id}
            onClick={() => setActiveSuiteFilter(suite.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSuiteFilter === suite.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                : 'text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-900'
            }`}
          >
            <span>{suite.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded ${
              activeSuiteFilter === suite.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
            }`}>
              {suite.count}
            </span>
          </button>
        ))}
      </div>

      {/* Quick Capability Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mr-1">Bộ Lọc Tính Năng:</span>
        <button
          onClick={() => setCapabilityFilter('all')}
          className={`px-2.5 py-1 rounded text-[11px] transition-all ${
            capabilityFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200 bg-slate-950/40'
          }`}
        >
          Tất cả ({filteredModels.length})
        </button>
        <button
          onClick={() => setCapabilityFilter('colab_t4')}
          className={`px-2.5 py-1 rounded text-[11px] transition-all flex items-center gap-1 ${
            capabilityFilter === 'colab_t4' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:text-emerald-300 bg-slate-950/40'
          }`}
        >
          <Zap className="w-3 h-3 text-emerald-400" />
          Colab T4 Free (16GB)
        </button>
        <button
          onClick={() => setCapabilityFilter('cot_reasoning')}
          className={`px-2.5 py-1 rounded text-[11px] transition-all flex items-center gap-1 ${
            capabilityFilter === 'cot_reasoning' ? 'bg-purple-950 text-purple-300 border border-purple-500/40 font-bold' : 'text-slate-400 hover:text-purple-300 bg-slate-950/40'
          }`}
        >
          <BrainCircuit className="w-3 h-3 text-purple-400" />
          Suy Luận CoT &lt;think&gt;
        </button>
        <button
          onClick={() => setCapabilityFilter('moe')}
          className={`px-2.5 py-1 rounded text-[11px] transition-all flex items-center gap-1 ${
            capabilityFilter === 'moe' ? 'bg-amber-950 text-amber-300 border border-amber-500/40 font-bold' : 'text-slate-400 hover:text-amber-300 bg-slate-950/40'
          }`}
        >
          <Network className="w-3 h-3 text-amber-400" />
          Kiến Trúc Sparse MoE
        </button>
        <button
          onClick={() => setCapabilityFilter('vision')}
          className={`px-2.5 py-1 rounded text-[11px] transition-all flex items-center gap-1 ${
            capabilityFilter === 'vision' ? 'bg-blue-950 text-blue-300 border border-blue-500/40 font-bold' : 'text-slate-400 hover:text-blue-300 bg-slate-950/40'
          }`}
        >
          <Eye className="w-3 h-3 text-blue-400" />
          Đa Phương Thức Vision
        </button>
      </div>

      {/* Model Grid & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Card Selection List */}
        <div className="lg:col-span-5 flex flex-col gap-3 max-h-[580px] overflow-y-auto pr-1">
          {filteredModels.map((model) => {
            const isSelected = currentModel.id === model.id;
            return (
              <div
                key={model.id}
                onClick={() => onSelectModel(model)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/30 border-white/5 hover:border-white/20 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">
                        {model.name}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block truncate max-w-[240px] mt-0.5">
                      {model.hfRepo}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                    model.supportsColabT4 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {model.supportsColabT4 ? '⚡ Colab T4' : `${model.vramFp16Gb}GB VRAM`}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-white/5">
                  <span className="text-slate-300 font-medium">{model.layerCount} Layers</span>
                  <span className="text-cyan-400 font-bold">{model.parameterCount}</span>
                  <span className="text-slate-500 truncate">{model.architectureType}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Model Deep Inspector */}
        <div className="lg:col-span-7 p-6 border border-white/10 rounded-xl bg-slate-900/30 flex flex-col gap-5">
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-base font-mono font-bold text-white">
                  {currentModel.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  {currentModel.architectureType}
                </span>
                {currentModel.supportsColabT4 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    Free Colab T4 16GB Ready
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-cyan-400 block">
                HuggingFace Hub: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-300">{currentModel.hfRepo}</code>
              </span>
            </div>

            <div className="text-right font-mono text-xs text-slate-400 shrink-0">
              <div>Layers: <span className="text-white font-bold">{currentModel.layerCount}</span></div>
              <div>Hidden Dim: <span className="text-white font-bold">{currentModel.hiddenDimension}</span></div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">Context Window</span>
              <span className="text-white font-bold text-sm">{currentModel.contextLength}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">Heads (Q / KV)</span>
              <span className="text-white font-bold text-sm">
                {currentModel.numAttentionHeads} / {currentModel.numKeyValueHeads || currentModel.numAttentionHeads}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">VRAM FP16 / 4-bit</span>
              <span className="text-cyan-300 font-bold text-sm">{currentModel.vramFp16Gb}G / {currentModel.vram4bitGb}G</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block">Layer Cửa Sổ</span>
              <span className="text-emerald-400 font-bold text-sm">
                L{currentModel.recommendedAblationLayers[0]} - L{currentModel.recommendedAblationLayers[1]}
              </span>
            </div>
          </div>

          {/* Architecture Special Features */}
          <div>
            <h4 className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Đặc Tính Kiến Trúc & Hooks Bảo Vệ (Architectural Invariants)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentModel.specialFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded bg-slate-950/60 border border-white/5 text-xs font-mono text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Tensors & Protection Mappings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Đường Dẫn Tensor Mục Tiêu vs Bộ Khóa An Toàn
              </h4>
              <span className="text-[10px] font-mono text-emerald-400">
                0% MMLU & Reasoning Loss
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto pr-1">
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
