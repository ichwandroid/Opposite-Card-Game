import React from 'react';
import { Player, OppositeCard, GameSettings } from '../../types/game';
import { PlayerArea } from './PlayerArea';
import { MainCard } from './MainCard';
import { Keyboard, MousePointer } from 'lucide-react';

interface GameBoardProps {
  p1: Player;
  p2: Player;
  mainCard: OppositeCard;
  targetOpposite: OppositeCard;
  pairedCard: OppositeCard | null;
  winnerPlayerName?: string;
  roundStatusMessage?: string | null;
  isWrongShake?: boolean;
  timeLeft: number;
  settings: GameSettings;
  isGameActive: boolean;
  isResolving: boolean;
  onP1Roll: (newIndex: number) => void;
  onP2Roll: (newIndex: number) => void;
  onP1Select: (card: OppositeCard) => void;
  onP2Select: (card: OppositeCard) => void;
  onP1Cancel: () => void;
  onP2Cancel: () => void;
  onP1ConfirmPair: (card: OppositeCard) => void;
  onP2ConfirmPair: (card: OppositeCard) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  p1,
  p2,
  mainCard,
  targetOpposite,
  pairedCard,
  winnerPlayerName,
  roundStatusMessage,
  isWrongShake,
  timeLeft,
  settings,
  isGameActive,
  isResolving,
  onP1Roll,
  onP2Roll,
  onP1Select,
  onP2Select,
  onP1Cancel,
  onP2Cancel,
  onP1ConfirmPair,
  onP2ConfirmPair,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between p-2 sm:p-4 gap-3">
      {/* 3-Column Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 flex-1 items-stretch">
        {/* Left Column: Player 1 (4 cols on lg) */}
        <div className="lg:col-span-4 order-2 lg:order-1 h-full min-h-[550px]">
          <PlayerArea
            player={p1}
            isGameActive={isGameActive}
            isWinnerThisRound={winnerPlayerName === p1.name}
            onRollIndexChange={onP1Roll}
            onSelectCard={onP1Select}
            onCancelSelection={onP1Cancel}
            onConfirmPair={onP1ConfirmPair}
            keyboardUpKey="w"
            keyboardDownKey="s"
            keyboardSelectKey=" "
          />
        </div>

        {/* Center Column: Main Card Focus (4 cols on lg) */}
        <div className="lg:col-span-4 order-1 lg:order-2 h-full flex flex-col items-center justify-between p-3 sm:p-4 rounded-3xl bg-purple-50/30 backdrop-blur-sm border-2 border-purple-300 shadow-md min-h-[550px]">
          <MainCard
            mainCard={mainCard}
            targetOpposite={targetOpposite}
            pairedCard={pairedCard}
            winnerPlayerName={winnerPlayerName}
            roundStatusMessage={roundStatusMessage}
            isWrongShake={isWrongShake}
            timeLeft={timeLeft}
            totalTime={settings.answerDuration}
            isResolving={isResolving}
          />
        </div>

        {/* Right Column: Player 2 (4 cols on lg) */}
        <div className="lg:col-span-4 order-3 lg:order-3 h-full min-h-[550px]">
          <PlayerArea
            player={p2}
            isGameActive={isGameActive}
            isWinnerThisRound={winnerPlayerName === p2.name}
            onRollIndexChange={onP2Roll}
            onSelectCard={onP2Select}
            onCancelSelection={onP2Cancel}
            onConfirmPair={onP2ConfirmPair}
            keyboardUpKey="ArrowUp"
            keyboardDownKey="ArrowDown"
            keyboardSelectKey="Enter"
          />
        </div>
      </div>

      {/* Bottom Keyboard Controls Reference Banner */}
      <div className="w-full bg-white/80 backdrop-blur-xs rounded-2xl py-2 px-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5 font-bold text-amber-800">
          <Keyboard className="w-3.5 h-3.5 text-amber-600" />
          <span>Peserta 1: [W] / [S] Gulir Roll · [Spasi] Cocokkan Langsung</span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-slate-400 font-medium">
          <MousePointer className="w-3 h-3" />
          <span>Geser kartu bebas ke segala arah · Klik kartu untuk langsung mencocokkan</span>
        </div>

        <div className="flex items-center gap-1.5 font-bold text-teal-800">
          <Keyboard className="w-3.5 h-3.5 text-teal-600" />
          <span>Peserta 2: [↑] / [↓] Gulir Roll · [Enter] Cocokkan Langsung</span>
        </div>
      </div>
    </div>
  );
};
