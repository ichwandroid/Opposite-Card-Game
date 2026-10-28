import React from 'react';
import { Play, HelpCircle, Settings, Sparkles, BookOpen } from 'lucide-react';
import { CardIllustration } from '../ui/CardIllustration';
import { GameCardFrameDecor } from '../ui/CardOrnament';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenTutorial: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenTutorial,
  onOpenSettings,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-indigo-50 p-4 md:p-8 flex flex-col items-center justify-between select-none relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-44 h-44 bg-sky-200/40 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Top Header Tag */}
      <div className="pt-4 flex items-center gap-2">
        <span className="px-3.5 py-1 rounded-full bg-white/80 border border-amber-300 shadow-xs text-xs font-bold text-amber-900 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Game Edukasi Siswa Sekolah Dasar
        </span>
      </div>

      {/* Hero Brand & Mascot */}
      <div className="w-full max-w-xl flex flex-col items-center text-center my-auto py-6">
        {/* Floating Animated Cards Preview */}
        <div className="relative flex items-center justify-center gap-4 mb-6">
          {/* Card Left: BIG */}
          <div className="relative w-32 sm:w-36 min-h-[205px] bg-white rounded-xl border-4 border-amber-400 p-3 shadow-xl -rotate-6 transition-transform hover:rotate-0 flex flex-col items-center justify-between overflow-hidden">
            <GameCardFrameDecor theme="gold" />
            <span className="relative z-10 text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
              WORD
            </span>
            <div className="relative z-10 w-20 h-20 flex items-center justify-center p-1.5 bg-gradient-to-b from-amber-50 to-slate-50 rounded-lg border border-amber-200">
              <CardIllustration name="gajah" className="w-16 h-16" />
            </div>
            <div className="relative z-10 text-center pb-0.5">
              <span className="font-black text-base text-slate-900 font-['Outfit',sans-serif]">BIG</span>
              <span className="block text-xs text-amber-700 font-bold leading-none mt-0.5">(Besar)</span>
            </div>
          </div>

          {/* Versus / Arrow indicator */}
          <div className="z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-black flex items-center justify-center shadow-lg text-lg border-2 border-white">
            ↔
          </div>

          {/* Card Right: SMALL */}
          <div className="relative w-32 sm:w-36 min-h-[205px] bg-white rounded-xl border-4 border-emerald-400 p-3 shadow-xl rotate-6 transition-transform hover:rotate-0 flex flex-col items-center justify-between overflow-hidden">
            <GameCardFrameDecor theme="emerald" />
            <span className="relative z-10 text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
              OPPOSITE
            </span>
            <div className="relative z-10 w-20 h-20 flex items-center justify-center p-1.5 bg-gradient-to-b from-emerald-50 to-slate-50 rounded-lg border border-emerald-200">
              <CardIllustration name="semut" className="w-16 h-16" />
            </div>
            <div className="relative z-10 text-center pb-0.5">
              <span className="font-black text-base text-emerald-900 font-['Outfit',sans-serif]">SMALL</span>
              <span className="block text-xs text-emerald-700 font-bold leading-none mt-0.5">(Kecil)</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          OPPOSITES CARD
        </h1>
        <p className="text-base sm:text-lg font-bold text-amber-700 mt-2">
          English Opposites (Antonim Bahasa Inggris) — Adu Cepat 2 Peserta!
        </p>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2">
          Dua peserta saling beradu cepat memilih tumpukan kartu manual untuk menemukan dan mencocokkan opposites card bahasa Inggris yang benar.
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-xs flex flex-col gap-3 mt-8">
          <button
            onClick={onStartGame}
            className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 fill-white transition-transform group-hover:scale-110" />
            <span>MULAI BERMAIN</span>
          </button>

          <button
            onClick={onOpenTutorial}
            className="w-full py-3 px-6 rounded-2xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>CARA BERMAIN / TUTORIAL</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full py-2.5 px-6 rounded-2xl font-semibold text-xs bg-transparent hover:bg-slate-100 text-slate-600 transition-colors flex items-center justify-center gap-1.5"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Pengaturan Permainan</span>
          </button>
        </div>
      </div>

      {/* Footer Features Info */}
      <div className="pb-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1">
          <BookOpen className="w-4 h-4 text-blue-500" />
          Kosakata SD Terpadu
        </span>
        <span>•</span>
        <span>Memilih Kartu Manual</span>
        <span>•</span>
        <span>Animasi Penuh 2D</span>
      </div>
    </div>
  );
};
