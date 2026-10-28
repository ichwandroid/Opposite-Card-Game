import React from 'react';
import { OppositeCard } from '../../types/game';
import { CardIllustration } from '../ui/CardIllustration';
import { GameCardFrameDecor } from '../ui/CardOrnament';
import { Sparkles, ArrowRightLeft, Clock, AlertCircle } from 'lucide-react';

interface MainCardProps {
  mainCard: OppositeCard;
  targetOpposite: OppositeCard;
  pairedCard: OppositeCard | null;
  winnerPlayerName?: string;
  roundStatusMessage?: string | null;
  isWrongShake?: boolean;
  timeLeft: number;
  totalTime: number;
  isResolving: boolean;
}

export const MainCard: React.FC<MainCardProps> = ({
  mainCard,
  targetOpposite,
  pairedCard,
  winnerPlayerName,
  roundStatusMessage,
  isWrongShake,
  timeLeft,
  totalTime,
  isResolving,
}) => {
  const timePercent = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
  const isUrgent = timeLeft <= 5 && timeLeft > 0;

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-sm mx-auto px-2">
      {/* Timer Bar & Instruction */}
      <div className="w-full flex flex-col items-center gap-1.5 mb-2">
        <div className="flex items-center justify-between w-full text-xs font-bold px-1">
          <span className="flex items-center gap-1 text-slate-700 uppercase tracking-wider text-[11px]">
            <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-red-500 animate-spin' : 'text-blue-600'}`} />
            Sisa Waktu
          </span>
          <span
            className={`font-mono text-sm px-2 py-0.5 rounded-full ${
              isUrgent
                ? 'bg-red-100 text-red-600 font-extrabold animate-pulse'
                : 'bg-slate-100 text-slate-800'
            }`}
          >
            {timeLeft}s
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isUrgent
                ? 'bg-gradient-to-r from-orange-500 to-red-600'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>

        <div className="mt-1 px-3 py-1 bg-amber-100/90 text-amber-900 border border-amber-300 rounded-full text-xs font-bold text-center flex items-center gap-1.5 shadow-sm">
          <ArrowRightLeft className="w-3.5 h-3.5 text-amber-700" />
          <span>CARI LAWAN KATA DI TUMPUKANMU!</span>
        </div>
      </div>

      {/* Main Target Card Container */}
      <div className="relative w-full max-w-[290px] sm:max-w-[315px] h-[390px] sm:h-[425px] flex items-center justify-center">
        {/* Distinct Royal Purple glow halo behind main card */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/35 via-indigo-400/25 to-violet-500/35 rounded-xl blur-xl -z-10 animate-pulse" />

        <div
          className={`relative w-full h-full rounded-xl border-4 bg-white p-4 flex flex-col justify-between shadow-2xl transition-all duration-300 overflow-hidden ${
            isWrongShake
              ? 'border-red-500 animate-shake bg-red-50/50'
              : pairedCard
              ? 'border-emerald-500 ring-4 ring-emerald-300 ring-offset-2'
              : 'border-purple-500 shadow-purple-400/40'
          }`}
        >
          {/* Game Card Fantasy Ornament Overlay - Distinct Royal Purple Theme */}
          <GameCardFrameDecor theme={pairedCard ? 'emerald' : 'purple'} />

          {/* Card Category Header */}
          <div className="relative z-10 flex items-center justify-between text-xs border-b border-purple-200/70 pb-2 px-1">
            <span className="font-extrabold text-[10px] text-purple-800 uppercase tracking-widest bg-gradient-to-r from-purple-100 to-indigo-50 px-2.5 py-0.5 rounded-full border border-purple-300 shadow-2xs">
              KARTU UTAMA
            </span>
            <span className="text-[11px] font-bold text-purple-700 capitalize bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/80">
              {mainCard.category}
            </span>
          </div>

          {/* Central 2D Vector Illustration Framed like a TCG Portal */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2 p-2 rounded-lg bg-gradient-to-b from-purple-50/90 via-indigo-50/40 to-purple-50/30 border-2 border-purple-200/80 shadow-inner overflow-hidden">
            <div className="w-28 h-28 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <CardIllustration name={mainCard.iconName} className="w-24 h-24 drop-shadow-md" />
            </div>
            <p className="mt-1.5 text-xs text-slate-600 text-center font-medium px-2 line-clamp-2">
              {mainCard.description}
            </p>
          </div>

          {/* Target Word Cartouche / Plaque */}
          <div className="relative z-10 text-center pt-2 pb-1.5 border-t border-purple-200/70 bg-gradient-to-r from-purple-50/70 via-white to-purple-50/70 rounded-lg px-2">
            <div className="text-3xl font-black text-purple-950 tracking-wider font-['Outfit',sans-serif] drop-shadow-xs">
              {mainCard.word}
            </div>
            {mainCard.meaningId && (
              <div className="text-xs font-extrabold text-purple-800 mt-0.5">
                ({mainCard.meaningId})
              </div>
            )}
            <div className="text-[10px] text-purple-600 font-bold mt-0.5">
              Cari lawan kata Bahasa Inggris di tumpukanmu!
            </div>
          </div>
        </div>

        {/* Pairing Success Overlay when a card flies into center */}
        {pairedCard && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs rounded-2xl z-20 flex flex-col items-center justify-center p-4 animate-scaleUp">
            <div className="w-full bg-white rounded-xl p-4 shadow-2xl border-2 border-emerald-400 text-center flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider">
                <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
                PASANGAN COCOK!
              </div>

              <div className="flex items-center justify-center gap-3 my-1">
                <div className="px-3 py-1 bg-amber-100 text-amber-900 font-black rounded-lg text-base flex flex-col items-center leading-tight">
                  <span>{mainCard.word}</span>
                  {mainCard.meaningId && (
                    <span className="text-[10px] font-semibold text-amber-700">({mainCard.meaningId})</span>
                  )}
                </div>
                <ArrowRightLeft className="w-5 h-5 text-emerald-600 font-bold shrink-0" />
                <div className="px-3 py-1 bg-emerald-100 text-emerald-900 font-black rounded-lg text-base flex flex-col items-center leading-tight">
                  <span>{pairedCard.word}</span>
                  {pairedCard.meaningId && (
                    <span className="text-[10px] font-semibold text-emerald-700">({pairedCard.meaningId})</span>
                  )}
                </div>
              </div>

              {winnerPlayerName && (
                <div className="text-xs font-bold text-slate-700">
                  Dimenangkan oleh: <span className="text-emerald-600 font-black">{winnerPlayerName}</span>!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Round Status Feedback Alert */}
      <div className="w-full mt-3 min-h-[44px] flex items-center justify-center">
        {roundStatusMessage ? (
          <div
            className={`w-full py-2 px-3 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ${
              isWrongShake
                ? 'bg-red-100 text-red-800 border border-red-300 animate-shake'
                : pairedCard
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}
          >
            {isWrongShake && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
            {pairedCard && <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />}
            <span>{roundStatusMessage}</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 text-center">
            Pemain tercepat memasangkan antonim yang tepat mendapat 10 poin!
          </div>
        )}
      </div>
    </div>
  );
};
