import React, { useState } from 'react';
import { ModelProfile, TuningConfig } from './types';
import { SOTA_MODELS_REGISTRY } from './data/models_registry';
import { Header } from './components/Header';
import { SidebarNav, NavTabId } from './components/SidebarNav';
import { GeometryVisualizer } from './components/GeometryVisualizer';
import { AutoTunerPanel } from './components/AutoTunerPanel';
import { ArchitectureInspector } from './components/ArchitectureInspector';
import { BenchmarkTester } from './components/BenchmarkTester';
import { CodeExporter } from './components/CodeExporter';
import { LiveConsole } from './components/LiveConsole';

export default function App() {
  const [currentModel, setCurrentModel] = useState<ModelProfile>(
    SOTA_MODELS_REGISTRY.find((m) => m.id === 'gpt-oss-120b') || SOTA_MODELS_REGISTRY[0]
  );

  const [activeTab, setActiveTab] = useState<NavTabId>('geometry');
  const [isEngineRunning, setIsEngineRunning] = useState<boolean>(false);

  const [config, setConfig] = useState<TuningConfig>({
    modelId: currentModel.id,
    strategy: 'pareto_optimal',
    epochs: 16,
    alphaRange: [currentModel.defaultAlpha, currentModel.defaultAlpha],
    layerRange: [currentModel.recommendedAblationLayers[0], currentModel.recommendedAblationLayers[1]],
    selectedTensors: currentModel.targetTensors.filter((t) => !t.guardedForIntelligence).map((t) => t.tensorName),
    preserveFrobeniusNorm: true,
    whitenedSvd: true,
    protectCoTTokens: true,
    protectMathCodeSubspaces: true,
    offloadToCpu: false,
    quantization: 'none',
    numContrastivePairs: 5
  });

  const handleSelectModel = (newModel: ModelProfile) => {
    setCurrentModel(newModel);
    setConfig((prev) => ({
      ...prev,
      modelId: newModel.id,
      alphaRange: [newModel.defaultAlpha, newModel.defaultAlpha],
      layerRange: [newModel.recommendedAblationLayers[0], newModel.recommendedAblationLayers[1]],
      selectedTensors: newModel.targetTensors.filter((t) => !t.guardedForIntelligence).map((t) => t.tensorName)
    }));
  };

  const handleUpdateConfig = (updates: Partial<TuningConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="h-screen w-screen overflow-hidden text-slate-300 font-sans flex flex-col bg-slate-950">
      {/* Immersive Header */}
      <Header
        currentModel={currentModel}
        isEngineRunning={isEngineRunning}
        activeTab={activeTab}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isEngineRunning={isEngineRunning}
        />

        {/* View Routing */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#010409]">
          {activeTab === 'geometry' && (
            <GeometryVisualizer
              currentModel={currentModel}
              config={config}
              onChangeConfig={handleUpdateConfig}
            />
          )}

          {activeTab === 'autotune' && (
            <AutoTunerPanel
              currentModel={currentModel}
              config={config}
              onChangeConfig={handleUpdateConfig}
              isEngineRunning={isEngineRunning}
              setIsEngineRunning={setIsEngineRunning}
            />
          )}

          {activeTab === 'models' && (
            <ArchitectureInspector
              currentModel={currentModel}
              onSelectModel={handleSelectModel}
            />
          )}

          {activeTab === 'benchmarks' && (
            <BenchmarkTester
              currentModel={currentModel}
              config={config}
            />
          )}

          {activeTab === 'exporter' && (
            <CodeExporter
              currentModel={currentModel}
              config={config}
            />
          )}

          {activeTab === 'console' && (
            <LiveConsole
              currentModel={currentModel}
              config={config}
              isEngineRunning={isEngineRunning}
            />
          )}
        </main>
      </div>

      {/* Immersive Footer Status Bar */}
      <footer className="h-8 bg-slate-900 border-t border-white/5 flex items-center px-6 justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">CUDA_VERSION:</span>
            <span className="text-slate-200">12.6 STABLE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-500">TORCH_BACKEND:</span>
            <span className="text-cyan-400">FLASH_ATTENTION_2_TRITON</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-slate-500">SURGERY_INVARIANT:</span>
            <span className="text-emerald-400">||W||_F == ||W*||_F (0.000% LOSS)</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">RESEARCH_KERNEL_ACTIVE</span>
          </div>
          <div className="hidden sm:inline">
            <span className="text-slate-500">LATENCY:</span> <span className="text-slate-300">3.8ms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
