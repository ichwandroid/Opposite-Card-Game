import React, { useState } from 'react';
import { useOppositeGame } from './hooks/useOppositeGame';
import { MainMenu } from './components/screens/MainMenu';
import { PlayerSetup } from './components/screens/PlayerSetup';
import { TutorialModal } from './components/screens/TutorialModal';
import { SettingsModal } from './components/screens/SettingsModal';
import { TopHeader } from './components/game/TopHeader';
import { GameBoard } from './components/game/GameBoard';
import { CountdownOverlay } from './components/game/CountdownOverlay';
import { RoundResultModal } from './components/game/RoundResultModal';
import { GameOverScreen } from './components/game/GameOverScreen';
import { OppositeCard } from './types/game';
import { sound } from './utils/soundEngine';
import { Play } from 'lucide-react';

export function App() {
  const {
    phase,
    setPhase,
    settings,
    setSettings,
    roundNumber,
    isPaused,
    setIsPaused,
    mainCard,
    targetOpposite,
    pairedCard,
    roundWinnerId,
    roundStatusMessage,
    isWrongShake,
    timeLeft,
    history,
    p1,
    p2,
    setP1,
    setP2,
    startMatch,
    handleCountdownComplete,
    handleConfirmPair,
    handleNextRound,
    handleRestartMatch,
  } = useOppositeGame();

  const [showTutorial, setShowTutorial] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Roll Handlers
  const handleP1Roll = (newIndex: number) => {
    setP1((prev) => ({ ...prev, activeIndex: newIndex }));
  };

  const handleP2Roll = (newIndex: number) => {
    setP2((prev) => ({ ...prev, activeIndex: newIndex }));
  };

  // Select Handlers
  const handleP1Select = (card: OppositeCard) => {
    sound.playSelect();
    setP1((prev) => ({ ...prev, selectedCard: card }));
  };

  const handleP2Select = (card: OppositeCard) => {
    sound.playSelect();
    setP2((prev) => ({ ...prev, selectedCard: card }));
  };

  // Cancel Handlers
  const handleP1Cancel = () => {
    sound.playCancel();
    setP1((prev) => ({ ...prev, selectedCard: null }));
  };

  const handleP2Cancel = () => {
    sound.playCancel();
    setP2((prev) => ({ ...prev, selectedCard: null }));
  };

  // Confirm Handlers
  const handleP1Confirm = (card: OppositeCard) => {
    handleConfirmPair('p1', card);
  };

  const handleP2Confirm = (card: OppositeCard) => {
    handleConfirmPair('p2', card);
  };

  // Sound toggles
  const handleToggleSound = () => {
    const nextVal = !settings.soundEnabled;
    sound.setMuted(!nextVal);
    setSettings((prev) => ({ ...prev, soundEnabled: nextVal }));
  };

  const handleToggleMusic = () => {
    const nextVal = !settings.musicEnabled;
    sound.setMusicEnabled(nextVal);
    setSettings((prev) => ({ ...prev, musicEnabled: nextVal }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between selection:bg-amber-200">
      {/* 1. Main Menu Screen */}
      {phase === 'menu' && (
        <MainMenu
          onStartGame={() => setPhase('setup')}
          onOpenTutorial={() => setShowTutorial(true)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {/* 2. Player Setup Screen */}
      {phase === 'setup' && (
        <PlayerSetup
          initialP1Name={p1.name}
          initialP2Name={p2.name}
          initialP1Avatar={p1.avatar}
          initialP2Avatar={p2.avatar}
          settings={settings}
          onStartMatch={(p1Name, p2Name, p1Avatar, p2Avatar, newSettings) => {
            startMatch(p1Name, p2Name, p1Avatar, p2Avatar, newSettings);
          }}
          onBack={() => setPhase('menu')}
        />
      )}

      {/* 3. In-Game Screens (countdown, playing, round-resolving, round-result) */}
      {(phase === 'countdown' ||
        phase === 'playing' ||
        phase === 'round-resolving' ||
        phase === 'round-result') && (
        <div className="flex-1 flex flex-col justify-between bg-gradient-to-br from-amber-50/60 via-sky-50/50 to-indigo-50/60 relative">
          {/* Top HUD Header */}
          <TopHeader
            roundNumber={roundNumber}
            totalRounds={settings.totalRounds}
            isPaused={isPaused}
            soundEnabled={settings.soundEnabled}
            musicEnabled={settings.musicEnabled}
            onTogglePause={() => setIsPaused((prev) => !prev)}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
            onOpenTutorial={() => setShowTutorial(true)}
            onOpenSettings={() => setShowSettings(true)}
          />

          {/* Active 3-Zone Game Arena */}
          <GameBoard
            p1={p1}
            p2={p2}
            mainCard={mainCard}
            targetOpposite={targetOpposite}
            pairedCard={pairedCard}
            winnerPlayerName={
              roundWinnerId === 'p1' ? p1.name : roundWinnerId === 'p2' ? p2.name : undefined
            }
            roundStatusMessage={roundStatusMessage}
            isWrongShake={isWrongShake}
            timeLeft={timeLeft}
            settings={settings}
            isGameActive={phase === 'playing' && !isPaused}
            isResolving={phase === 'round-resolving'}
            onP1Roll={handleP1Roll}
            onP2Roll={handleP2Roll}
            onP1Select={handleP1Select}
            onP2Select={handleP2Select}
            onP1Cancel={handleP1Cancel}
            onP2Cancel={handleP2Cancel}
            onP1ConfirmPair={handleP1Confirm}
            onP2ConfirmPair={handleP2Confirm}
          />

          {/* Animated 3-2-1-MULAI Countdown Overlay */}
          {phase === 'countdown' && (
            <CountdownOverlay
              roundNumber={roundNumber}
              onComplete={handleCountdownComplete}
            />
          )}

          {/* Round Winner / Explanation Modal */}
          {phase === 'round-result' && (
            <RoundResultModal
              roundNumber={roundNumber}
              totalRounds={settings.totalRounds}
              mainCard={mainCard}
              targetOpposite={targetOpposite}
              winnerId={roundWinnerId || 'draw'}
              p1={p1}
              p2={p2}
              onNextRound={handleNextRound}
              isLastRound={roundNumber >= settings.totalRounds}
            />
          )}

          {/* Pause Modal Overlay */}
          {isPaused && (
            <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border-4 border-amber-300 animate-scaleUp">
                <h3 className="text-xl font-black text-slate-900 mb-2 font-['Outfit',sans-serif]">
                  Permainan Dijeda
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Waktu dan input permainan dihentikan sementara.
                </p>
                <button
                  onClick={() => setIsPaused(false)}
                  className="w-full py-3.5 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>LANJUTKAN PERMAINAN</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Game Over Screen */}
      {phase === 'game-over' && (
        <GameOverScreen
          p1={p1}
          p2={p2}
          history={history}
          onPlayAgain={handleRestartMatch}
          onBackToMenu={() => setPhase('menu')}
        />
      )}

      {/* Global Tutorial Modal */}
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}

      {/* Global Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={setSettings}
          onRestartCurrentGame={handleRestartMatch}
          onExitToMenu={() => {
            setPhase('menu');
            setIsPaused(false);
          }}
          onClose={() => setShowSettings(false)}
          isInGame={
            phase === 'playing' ||
            phase === 'countdown' ||
            phase === 'round-resolving' ||
            phase === 'round-result'
          }
        />
      )}
    </div>
  );
}

export default App;
