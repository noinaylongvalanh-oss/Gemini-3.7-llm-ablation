import React from 'react';
import { Layers, Activity, Cpu, ShieldAlert, FileCode2, Terminal, Sliders } from 'lucide-react';

export type NavTabId = 'geometry' | 'autotune' | 'models' | 'benchmarks' | 'exporter' | 'console';

interface SidebarNavProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  isEngineRunning: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onSelectTab, isEngineRunning }) => {
  const navItems: { id: NavTabId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'geometry', label: 'Activation Hyperplane Geometry', icon: <Layers className="w-5 h-5" /> },
    { id: 'autotune', label: 'Auto-Iterative SVD Tuning Engine', icon: <Sliders className="w-5 h-5" />, badge: 'Auto-Loop' },
    { id: 'models', label: 'SOTA Multi-Architecture Registry', icon: <Cpu className="w-5 h-5" /> },
    { id: 'benchmarks', label: 'Verification & Safety Benchmarks', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'exporter', label: '1-Click Python / Colab Script Exporter', icon: <FileCode2 className="w-5 h-5" />, badge: '.ipynb' },
    { id: 'console', label: 'Real-Time Surgery Telemetry Console', icon: <Terminal className="w-5 h-5" /> }
  ];

  return (
    <nav className="w-16 md:w-60 border-r border-white/5 flex flex-col justify-between py-4 bg-slate-950/95 select-none shrink-0">
      <div className="flex flex-col gap-1.5 px-2">
        <div className="px-3 py-2 hidden md:block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
          WORKBENCH MODULES
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono transition-all text-left group relative ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
              title={item.label}
            >
              <div className={`${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'} shrink-0`}>
                {item.icon}
              </div>
              <span className="hidden md:inline truncate">{item.label}</span>
              {item.badge && (
                <span className="hidden md:inline-block ml-auto text-[9px] px-1.5 py-0.2 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div className="md:hidden absolute left-0 top-1.5 bottom-1.5 w-1 bg-cyan-400 rounded-r" />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-3 pt-4 border-t border-white/5 flex flex-col gap-2">
        <div className="hidden md:block bg-slate-900/40 p-3 rounded-lg border border-white/5 text-[11px] font-mono">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>SVD Status</span>
            <span className={isEngineRunning ? "text-cyan-400 animate-pulse font-bold" : "text-emerald-400 font-bold"}>
              {isEngineRunning ? 'OPTIMIZING' : 'SYNCHRONIZED'}
            </span>
          </div>
          <div className="text-[10px] text-slate-500">
            ||W||_F Drift: &lt;0.001%
          </div>
        </div>
      </div>
    </nav>
  );
};
