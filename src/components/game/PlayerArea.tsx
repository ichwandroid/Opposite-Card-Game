import React from 'react';
import { Player, OppositeCard } from '../../types/game';
import { RollingDeck } from './RollingDeck';
import { Trophy, Award, Zap, AlertCircle } from 'lucide-react';

interface PlayerAreaProps {
  player: Player;
  isGameActive: boolean;
  isWinnerThisRound: boolean;
  onRollIndexChange: (newIndex: number) => void;
  onSelectCard: (card: OppositeCard) => void;
  onCancelSelection: () => void;
  onConfirmPair: (card: OppositeCard) => void;
  keyboardUpKey?: string;
  keyboardDownKey?: string;
  keyboardSelectKey?: string;
}

export const PlayerArea: React.FC<PlayerAreaProps> = ({
  player,
  isGameActive,
  isWinnerThisRound,
  onRollIndexChange,
  onSelectCard,
  onCancelSelection,
  onConfirmPair,
  keyboardUpKey,
  keyboardDownKey,
  keyboardSelectKey,
}) => {
  const isP1 = player.id === 'p1';
  const theme = isP1
    ? {
        border: 'border-amber-400',
        bg: 'from-amber-50/90 to-orange-50/60',
        badge: 'bg-amber-600 text-white shadow-xs',
        highlight: 'text-amber-800',
        scoreBg: 'bg-amber-100 text-amber-950 border-amber-300',
      }
    : {
        border: 'border-teal-400',
        bg: 'from-teal-50/90 to-cyan-50/60',
        badge: 'bg-teal-600 text-white shadow-xs',
        highlight: 'text-teal-800',
        scoreBg: 'bg-teal-100 text-teal-950 border-teal-300',
      };

  return (
    <div
      className={`flex flex-col justify-between h-full p-4 rounded-3xl border-2 ${theme.border} bg-gradient-to-b ${theme.bg} shadow-md transition-all duration-300 relative overflow-visible`}
    >
      {/* Top Player HUD */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        {/* Avatar & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-md border-2 border-slate-200 flex items-center justify-center text-2xl select-none">
            {player.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badge}`}>
                {isP1 ? 'PESERTA 1' : 'PESERTA 2'}
              </span>
              {isWinnerThisRound && (
                <span className="flex items-center gap-0.5 text-[10px] font-black bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full animate-bounce">
                  <Trophy className="w-3 h-3" />
                  Menang!
                </span>
              )}
            </div>
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight font-['Outfit',sans-serif] mt-0.5">
              {player.name}
            </h2>
          </div>
        </div>

        {/* Score Counter */}
        <div className={`flex flex-col items-end px-3 py-1.5 rounded-2xl border ${theme.scoreBg} shadow-inner`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Skor
          </span>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xl font-black font-mono tabular-nums tracking-tight">
              {player.score}
            </span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      {player.hasAnsweredWrongThisRound && (
        <div className="my-2 flex items-center justify-end text-xs">
          <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full animate-pulse">
            <AlertCircle className="w-3 h-3" />
            Salah, coba lagi!
          </span>
        </div>
      )}

      {/* Interactive 2D Rolling Deck */}
      <div className="flex-1 flex items-center justify-center py-1">
        <RollingDeck
          playerId={player.id}
          playerName={player.name}
          deck={player.deck}
          activeIndex={player.activeIndex}
          selectedCard={player.selectedCard}
          isDisabled={!isGameActive}
          isSubmitting={player.isSubmitting}
          hasWrongAnswer={player.hasAnsweredWrongThisRound}
          onRollIndexChange={onRollIndexChange}
          onSelectCard={onSelectCard}
          onCancelSelection={onCancelSelection}
          onConfirmPair={onConfirmPair}
          keyboardUpKey={keyboardUpKey}
          keyboardDownKey={keyboardDownKey}
          keyboardSelectKey={keyboardSelectKey}
        />
      </div>
    </div>
  );
};
