import React, { useEffect } from 'react';
import { OppositeCard, Player } from '../../types/game';
import { CardIllustration } from '../ui/CardIllustration';
import { GameCardFrameDecor } from '../ui/CardOrnament';
import { Trophy, ArrowRightLeft, ArrowRight, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoundResultModalProps {
  roundNumber: number;
  totalRounds: number;
  mainCard: OppositeCard;
  targetOpposite: OppositeCard;
  winnerId: 'p1' | 'p2' | 'timeout' | 'draw';
  p1: Player;
  p2: Player;
  onNextRound: () => void;
  isLastRound: boolean;
}

export const RoundResultModal: React.FC<RoundResultModalProps> = ({
  roundNumber,
  totalRounds,
  mainCard,
  targetOpposite,
  winnerId,
  p1,
  p2,
  onNextRound,
  isLastRound,
}) => {
  useEffect(() => {
    if (winnerId === 'p1' || winnerId === 'p2') {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
        });
      } catch {}
    }
  }, [winnerId]);

  const winner = winnerId === 'p1' ? p1 : winnerId === 'p2' ? p2 : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center animate-scaleUp">
        {/* Round Badge */}
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-3">
          Hasil Ronde {roundNumber} / {totalRounds}
        </div>

        {/* Winner Announcement Banner */}
        {winner ? (
          <div className="flex flex-col items-center gap-1.5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-md animate-bounce">
              <Trophy className="w-9 h-9 text-amber-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              {winner.name} Menang Ronde Ini!
            </h3>
            <p className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
              +10 Poin berhasil didapatkan!
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-3xl">
              <Clock className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 font-['Outfit',sans-serif]">
              Waktu Habis!
            </h3>
            <p className="text-sm text-slate-500">
              Tidak ada jawaban benar yang dipasangkan tepat waktu.
            </p>
          </div>
        )}

        {/* Opposite Pair Explanation Box */}
        <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 my-2 flex flex-col items-center gap-3">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Pasangan Opposites Card (Antonim)
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            {/* Card 1 */}
            <div className="relative flex-1 max-w-[165px] p-3.5 bg-white rounded-xl border-2 border-amber-300 shadow-md flex flex-col items-center justify-between min-h-[195px] overflow-hidden">
              <GameCardFrameDecor theme="gold" />
              <div className="relative z-10 w-20 h-20 flex items-center justify-center p-2 bg-gradient-to-b from-amber-50 to-slate-50 rounded-lg border border-amber-200/60 mt-1">
                <CardIllustration name={mainCard.iconName} className="w-16 h-16 drop-shadow-xs" />
              </div>
              <div className="relative z-10 text-center mt-2.5 mb-1.5">
                <span className="font-black text-lg text-slate-900 tracking-wider font-['Outfit',sans-serif] block leading-tight">{mainCard.word}</span>
                {mainCard.meaningId && (
                  <span className="text-xs font-extrabold text-amber-800 block mt-0.5">({mainCard.meaningId})</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center px-1 shrink-0">
              <ArrowRightLeft className="w-6 h-6 text-amber-600" />
              <span className="text-[10px] font-extrabold text-slate-400 mt-0.5">lawan</span>
            </div>

            {/* Card 2 */}
            <div className="relative flex-1 max-w-[165px] p-3.5 bg-white rounded-xl border-2 border-emerald-400 shadow-md flex flex-col items-center justify-between min-h-[195px] bg-emerald-50/20 overflow-hidden">
              <GameCardFrameDecor theme="emerald" />
              <div className="relative z-10 w-20 h-20 flex items-center justify-center p-2 bg-emerald-50/70 rounded-lg border border-emerald-200 mt-1">
                <CardIllustration name={targetOpposite.iconName} className="w-16 h-16 drop-shadow-xs" />
              </div>
              <div className="relative z-10 text-center mt-2.5 mb-1.5">
                <span className="font-black text-lg text-emerald-800 tracking-wider font-['Outfit',sans-serif] block leading-tight">{targetOpposite.word}</span>
                {targetOpposite.meaningId && (
                  <span className="text-xs font-extrabold text-emerald-700 block mt-0.5">({targetOpposite.meaningId})</span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 italic">
            "{mainCard.word}{mainCard.meaningId ? ` (${mainCard.meaningId})` : ''} adalah antonim (opposite) dari {targetOpposite.word}{targetOpposite.meaningId ? ` (${targetOpposite.meaningId})` : ''}."
          </p>
        </div>

        {/* Current Scores Comparison */}
        <div className="w-full grid grid-cols-2 gap-3 my-3">
          <div
            className={`p-3 rounded-2xl border text-left flex items-center justify-between ${
              winnerId === 'p1' ? 'bg-sky-50 border-sky-300 ring-2 ring-sky-300' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{p1.name}</span>
              <div className="text-lg font-black text-slate-800 flex items-center gap-1 font-mono">
                <Award className="w-4 h-4 text-sky-500" />
                {p1.score}
              </div>
            </div>
            <span className="text-2xl">{p1.avatar}</span>
          </div>

          <div
            className={`p-3 rounded-2xl border text-left flex items-center justify-between ${
              winnerId === 'p2' ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-300' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{p2.name}</span>
              <div className="text-lg font-black text-slate-800 flex items-center gap-1 font-mono">
                <Award className="w-4 h-4 text-rose-500" />
                {p2.score}
              </div>
            </div>
            <span className="text-2xl">{p2.avatar}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onNextRound}
          className="w-full mt-2 py-3.5 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>{isLastRound ? 'LIHAT HASIL AKHIR PERTANDINGAN' : 'LANJUT KE RONDE BERIKUTNYA'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
