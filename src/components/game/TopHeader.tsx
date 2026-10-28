import React from 'react';
import { Volume2, VolumeX, Music, Pause, Play, HelpCircle, Settings } from 'lucide-react';

interface TopHeaderProps {
  roundNumber: number;
  totalRounds: number;
  isPaused: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onTogglePause: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onOpenTutorial: () => void;
  onOpenSettings: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  roundNumber,
  totalRounds,
  isPaused,
  soundEnabled,
  musicEnabled,
  onTogglePause,
  onToggleSound,
  onToggleMusic,
  onOpenTutorial,
  onOpenSettings,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-amber-200/80 px-4 py-2.5 shadow-xs sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Title Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-black shadow-sm text-lg">
            ⚡
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm md:text-base text-slate-900 tracking-tight font-['Outfit',sans-serif] leading-tight">
              OPPOSITES CARD
            </span>
            <span className="text-[10px] text-amber-700 font-bold hidden sm:inline leading-none">
              Adu Cepat 2 Peserta
            </span>
          </div>
        </div>

        {/* Center Round Indicator */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 shadow-2xs flex items-center gap-2 text-xs font-black text-amber-950 font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>
              RONDE {String(roundNumber).padStart(2, '0')} / {String(totalRounds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Actions & Utilities Zone */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Pause Button */}
          <button
            onClick={onTogglePause}
            aria-label={isPaused ? 'Lanjutkan permainan' : 'Jeda permainan'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Sound SFX Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan efek suara' : 'Nyalakan efek suara'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            aria-label={musicEnabled ? 'Matikan musik' : 'Nyalakan musik'}
            className={`p-2 rounded-xl transition-colors border ${
              musicEnabled
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-400 border-slate-200'
            }`}
          >
            <Music className={`w-4 h-4 ${musicEnabled ? 'text-purple-600 animate-bounce' : 'text-slate-400'}`} />
          </button>

          {/* Tutorial Help Button */}
          <button
            onClick={onOpenTutorial}
            aria-label="Petunjuk bermain"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            aria-label="Pengaturan"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
