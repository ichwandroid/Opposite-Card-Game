import React, { useEffect } from 'react';
import { Player, RoundHistory } from '../../types/game';
import { Trophy, RotateCcw, Home, Award, CheckCircle2, XCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEngine';

interface GameOverScreenProps {
  p1: Player;
  p2: Player;
  history: RoundHistory[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  p1,
  p2,
  history,
  onPlayAgain,
  onBackToMenu,
}) => {
  const isDraw = p1.score === p2.score;
  const champion = isDraw ? null : p1.score > p2.score ? p1 : p2;
  const runnerUp = isDraw ? null : p1.score > p2.score ? p2 : p1;

  useEffect(() => {
    sound.playVictory();
    try {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-sky-100 to-indigo-100 p-4 md:p-8 flex items-center justify-center select-none">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-amber-300 flex flex-col items-center animate-scaleUp">
        {/* Top Trophy Header */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-xl flex items-center justify-center text-5xl">
            <Trophy className="w-14 h-14 text-amber-950 animate-bounce" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow">
            Juara!
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif] text-center">
          {isDraw ? 'HASIL IMBANG / SERI!' : `${champion?.name} Menang!`}
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium text-center">
          Pertandingan selesai dengan hebat! Semua peserta belajar dengan luar biasa.
        </p>

        {/* Podium Card Layout */}
        <div className="w-full grid grid-cols-2 gap-4 my-6">
          {/* Player 1 Card */}
          <div
            className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
              champion?.id === 'p1'
                ? 'bg-gradient-to-b from-sky-50 to-blue-100/60 border-sky-400 ring-2 ring-sky-300 shadow-lg scale-[1.02]'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-4xl mb-2">{p1.avatar}</div>
            <span className="text-xs font-black uppercase text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
              PESERTA 1
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">{p1.name}</h3>

            <div className="my-3 flex items-baseline gap-1 text-3xl font-black text-slate-900 font-mono">
              <Award className="w-6 h-6 text-amber-500" />
              <span>{p1.score}</span>
              <span className="text-xs font-semibold text-slate-400">poin</span>
            </div>

            <div className="w-full pt-3 border-t border-slate-200/80 text-xs flex flex-col gap-1 text-slate-600">
              <div className="flex justify-between">
                <span>Ronde dimenangkan:</span>
                <span className="font-bold">{p1.roundsWon}</span>
              </div>
              <div className="flex justify-between">
                <span>Jawaban tepat:</span>
                <span className="font-bold text-emerald-600">{p1.correctAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span>Salah pasang:</span>
                <span className="font-bold text-red-500">{p1.wrongAnswers}</span>
              </div>
            </div>
          </div>

          {/* Player 2 Card */}
          <div
            className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
              champion?.id === 'p2'
                ? 'bg-gradient-to-b from-rose-50 to-orange-100/60 border-rose-400 ring-2 ring-rose-300 shadow-lg scale-[1.02]'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-4xl mb-2">{p2.avatar}</div>
            <span className="text-xs font-black uppercase text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
              PESERTA 2
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">{p2.name}</h3>

            <div className="my-3 flex items-baseline gap-1 text-3xl font-black text-slate-900 font-mono">
              <Award className="w-6 h-6 text-amber-500" />
              <span>{p2.score}</span>
              <span className="text-xs font-semibold text-slate-400">poin</span>
            </div>

            <div className="w-full pt-3 border-t border-slate-200/80 text-xs flex flex-col gap-1 text-slate-600">
              <div className="flex justify-between">
                <span>Ronde dimenangkan:</span>
                <span className="font-bold">{p2.roundsWon}</span>
              </div>
              <div className="flex justify-between">
                <span>Jawaban tepat:</span>
                <span className="font-bold text-emerald-600">{p2.correctAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span>Salah pasang:</span>
                <span className="font-bold text-red-500">{p2.wrongAnswers}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Word Mastery Summary */}
        <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Kata Antonim yang Sudah Dikuasai:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
            {history.map((h, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs text-slate-700"
              >
                <span>{h.mainCard.word} {h.mainCard.meaningId ? `(${h.mainCard.meaningId})` : ''}</span>
                <span className="text-slate-400">↔</span>
                <span className="text-emerald-700">{h.targetOpposite.word} {h.targetOpposite.meaningId ? `(${h.targetOpposite.meaningId})` : ''}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3.5 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>MAIN LAGI</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>KEMBALI KE MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
