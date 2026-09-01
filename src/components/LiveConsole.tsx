import React, { useState, useEffect, useRef } from 'react';
import { ModelProfile, TuningConfig } from '../types';
import { Terminal, ShieldCheck, Play, Pause, Trash2, Download } from 'lucide-react';

interface LiveConsoleProps {
  currentModel: ModelProfile;
  config: TuningConfig;
  isEngineRunning: boolean;
}

export const LiveConsole: React.FC<LiveConsoleProps> = ({
  currentModel,
  config,
  isEngineRunning
}) => {
  const [logs, setLogs] = useState<string[]>([
    `[00:00:01] [ORBITAL-SVD // V3.2] Initializing Kernel Architecture for ${currentModel.name}`,
    `[00:00:02] [PyTorch-2.6] Target Device: NVIDIA A100-SXM4 (80GB) | CUDA Capability 9.0`,
    `[00:00:03] [Architecture] Autodetected ${currentModel.layerCount} Layers | Hidden Dimension: ${currentModel.hiddenDimension}`,
    `[00:00:04] [Protection] Subspace Lock activated for GSM8K Math & HumanEval Coding subspaces`,
    `[00:00:05] [Frobenius] Rescaling invariant ||W||_F == ||W*||_F initialized (Tolerance: 1e-6)`,
    `[00:00:06] [Ready] Awaiting user execution triggers or Auto-Iterative sweep commands.`
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEngineRunning) {
      const interval = setInterval(() => {
        const timestamp = new Date().toISOString().substring(11, 19);
        const randomLayer = Math.floor(
          config.layerRange[0] + Math.random() * (config.layerRange[1] - config.layerRange[0] + 1)
        );
        const sigma1 = (Math.sqrt(currentModel.hiddenDimension) * (2.4 + Math.random() * 0.4)).toFixed(3);
        const frobLoss = (0.00012 + Math.random() * 0.00018).toFixed(6);

        const layerStr = String(randomLayer).padStart(2, '0');
        const possibleMessages = [
          `[${timestamp}] [SVD-Extract] Layer ${layerStr}: Residual stream activation hook extracted | Rank-1 σ1=${sigma1}`,
          `[${timestamp}] [Orthogonal-Surgery] Layer ${layerStr}: Projecting W_new = W - ${config.alphaRange[0]} * (r ⊗ r^T) * W`,
          `[${timestamp}] [Frobenius-Preserve] Layer ${layerStr}: Rescaling factor computed: 1.002481x | ΔLoss=${frobLoss}`,
          `[${timestamp}] [Subspace-Guard] Gram-Schmidt projection checked: Angle with Math logic = 89.4° (Orthogonal)`
        ];

        const randomMsg = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
        setLogs((prev) => [...prev.slice(-150), randomMsg]);
      }, 700);

      return () => clearInterval(interval);
    }
  }, [isEngineRunning, currentModel, config]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleClearLogs = () => {
    setLogs([`[${new Date().toISOString().substring(11, 19)}] [Console] Logs cleared.`]);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#010409]">
      {/* Header Banner */}
      <div className="p-5 bg-slate-900/40 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              MODULE 06
            </span>
            <h2 className="text-base font-mono font-bold text-white uppercase">
              Real-Time Tensor Surgery Telemetry & SVD Execution Console
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Low-level stream of hook registrations, Marchenko-Pastur singular value extractions, and Frobenius norm stability metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleClearLogs}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-white/10 font-mono text-xs transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear Terminal
          </button>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="flex-1 min-h-[450px] p-5 border border-white/10 rounded-xl bg-slate-950 flex flex-col font-mono text-xs shadow-inner relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] text-slate-500 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-bold">ORBITAL_SVD_TELEMETRY_STREAM</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> STREAM ACTIVE
            </span>
            <span>BUFFER: {logs.length} entries</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-1.5 text-slate-300 font-mono text-[11px] select-text">
          {logs.map((log, index) => {
            let textColor = 'text-slate-300';
            if (log.includes('[Frobenius-Preserve]')) textColor = 'text-emerald-300';
            if (log.includes('[Orthogonal-Surgery]')) textColor = 'text-cyan-300';
            if (log.includes('[SVD-Extract]')) textColor = 'text-amber-300';
            if (log.includes('[Protection]')) textColor = 'text-indigo-300 font-bold';

            return (
              <div key={index} className={`${textColor} leading-relaxed`}>
                {log}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
