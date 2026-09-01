import React from 'react';
import { ModelProfile } from '../types';
import { Cpu, HardDrive, Zap, ShieldCheck, Database } from 'lucide-react';

interface HeaderProps {
  currentModel: ModelProfile;
  isEngineRunning: boolean;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ currentModel, isEngineRunning }) => {
  return (
    <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full ${isEngineRunning ? 'bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.9)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.7)]'}`} />
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-base tracking-widest text-white uppercase">ORBITAL-SVD</span>
          <span className="text-[10px] text-cyan-400 font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">V3.2 // RESEARCH-EDITION</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 border-l border-white/10 pl-4">
          <span className="text-slate-500">Active:</span>
          <span className="text-slate-200 font-semibold truncate max-w-xs">{currentModel.name}</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-cyan-300 rounded border border-white/5">
            {currentModel.parameterCount}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>Compute Node</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium">A100-SXM4 (80GB) // T4 Ready</span>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
              <HardDrive className="w-3 h-3 text-cyan-400" />
              <span>VRAM Footprint</span>
            </div>
            <span className="text-xs font-mono text-cyan-300 font-medium">
              FP16: {currentModel.vramFp16Gb}GB / 4-bit: {currentModel.vram4bitGb}GB
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Frobenius Preserver</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium">ACTIVE (ΔLoss &lt; 0.001%)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-mono text-slate-300 font-medium">CUDA 12.6 STABLE</span>
        </div>
      </div>
    </header>
  );
};
