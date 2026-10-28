import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GamePhase,
  GameSettings,
  OppositeCard,
  Player,
  RoundHistory,
} from '../types/game';
import { OPPOSITE_CARDS, getOppositeCard } from '../data/oppositeCards';
import { generatePlayerDeck, pickMainCard } from '../utils/cardShuffle';
import { sound } from '../utils/soundEngine';

const DEFAULT_SETTINGS: GameSettings = {
  totalRounds: 10,
  answerDuration: 15,
  pointsPerCorrectAnswer: 10,
  allowRetryAfterWrongAnswer: true,
  soundEnabled: true,
  musicEnabled: true,
  difficulty: 'semua',
  animationSpeed: 'normal',
};

export function useOppositeGame() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Used main card IDs in this match to avoid repetition
  const [usedMainCardIds, setUsedMainCardIds] = useState<string[]>([]);

  // Current Round Entities
  const [mainCard, setMainCard] = useState<OppositeCard>(OPPOSITE_CARDS[0]);
  const [targetOpposite, setTargetOpposite] = useState<OppositeCard>(
    getOppositeCard(OPPOSITE_CARDS[0]) || OPPOSITE_CARDS[1]
  );
  const [pairedCard, setPairedCard] = useState<OppositeCard | null>(null);
  const [roundWinnerId, setRoundWinnerId] = useState<'p1' | 'p2' | 'timeout' | 'draw' | null>(null);
  const [roundStatusMessage, setRoundStatusMessage] = useState<string | null>(null);
  const [isWrongShake, setIsWrongShake] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_SETTINGS.answerDuration);

  // Match History
  const [history, setHistory] = useState<RoundHistory[]>([]);

  // Players State
  const [p1, setP1] = useState<Player>({
    id: 'p1',
    name: 'Budi',
    avatar: '🐰',
    score: 0,
    roundsWon: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    deck: [],
    activeIndex: 0,
    selectedCard: null,
    isSubmitting: false,
    hasAnsweredWrongThisRound: false,
  });

  const [p2, setP2] = useState<Player>({
    id: 'p2',
    name: 'Siti',
    avatar: '🐯',
    score: 0,
    roundsWon: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    deck: [],
    activeIndex: 0,
    selectedCard: null,
    isSubmitting: false,
    hasAnsweredWrongThisRound: false,
  });

  const timerRef = useRef<number | null>(null);

  // Initialize a new round
  const setupRound = useCallback(
    (roundNum: number, usedIds: string[]) => {
      const chosenMain = pickMainCard(usedIds);
      const chosenOpposite = getOppositeCard(chosenMain) || OPPOSITE_CARDS[1];

      const p1DeckData = generatePlayerDeck(chosenMain, 7);
      const p2DeckData = generatePlayerDeck(chosenMain, 7);

      setMainCard(chosenMain);
      setTargetOpposite(chosenOpposite);
      setPairedCard(null);
      setRoundWinnerId(null);
      setRoundStatusMessage(null);
      setIsWrongShake(false);
      setTimeLeft(settings.answerDuration);
      setUsedMainCardIds((prev) => [...prev, chosenMain.id]);

      setP1((prev) => ({
        ...prev,
        deck: p1DeckData.deck,
        activeIndex: p1DeckData.initialIndex,
        selectedCard: null,
        isSubmitting: false,
        hasAnsweredWrongThisRound: false,
      }));

      setP2((prev) => ({
        ...prev,
        deck: p2DeckData.deck,
        activeIndex: p2DeckData.initialIndex,
        selectedCard: null,
        isSubmitting: false,
        hasAnsweredWrongThisRound: false,
      }));

      setPhase('countdown');
    },
    [settings.answerDuration]
  );

  // Start new match from setup
  const startMatch = useCallback(
    (
      p1Name: string,
      p2Name: string,
      p1Avatar: string,
      p2Avatar: string,
      newSettings: GameSettings
    ) => {
      setSettings(newSettings);
      setRoundNumber(1);
      setHistory([]);
      setUsedMainCardIds([]);
      setIsPaused(false);

      setP1({
        id: 'p1',
        name: p1Name,
        avatar: p1Avatar,
        score: 0,
        roundsWon: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        deck: [],
        activeIndex: 0,
        selectedCard: null,
        isSubmitting: false,
        hasAnsweredWrongThisRound: false,
      });

      setP2({
        id: 'p2',
        name: p2Name,
        avatar: p2Avatar,
        score: 0,
        roundsWon: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        deck: [],
        activeIndex: 0,
        selectedCard: null,
        isSubmitting: false,
        hasAnsweredWrongThisRound: false,
      });

      if (newSettings.musicEnabled) {
        sound.startMusic();
      }

      setupRound(1, []);
    },
    [setupRound]
  );

  // Handle countdown complete
  const handleCountdownComplete = useCallback(() => {
    setPhase('playing');
  }, []);

  // Timer loop for 'playing' phase
  useEffect(() => {
    if (phase !== 'playing' || isPaused || settings.answerDuration === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timeout occurred
          if (timerRef.current) clearInterval(timerRef.current);
          handleRoundTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, isPaused, settings.answerDuration]);

  // Cute Background Music lifecycle sync during gameplay
  useEffect(() => {
    if (!settings.musicEnabled) {
      sound.stopMusic();
      return;
    }

    if (phase === 'playing' || phase === 'countdown') {
      if (isPaused) {
        sound.pauseMusic();
      } else {
        sound.resumeMusic();
      }
    } else if (phase === 'game-over') {
      sound.stopMusic();
    }
  }, [phase, isPaused, settings.musicEnabled]);

  // Round timeout resolution
  const handleRoundTimeout = useCallback(() => {
    sound.playTimeout();
    setPhase('round-resolving');
    setRoundWinnerId('timeout');
    setRoundStatusMessage(
      `Waktu habis! Lawan kata dari ${mainCard.word}${mainCard.meaningId ? ` (${mainCard.meaningId})` : ''} adalah ${targetOpposite.word}${targetOpposite.meaningId ? ` (${targetOpposite.meaningId})` : ''}.`
    );

    setHistory((prev) => [
      ...prev,
      {
        roundNumber,
        mainCard,
        targetOpposite,
        winner: 'timeout',
        p1Answer: p1.selectedCard,
        p2Answer: p2.selectedCard,
      },
    ]);

    setTimeout(() => {
      setPhase('round-result');
    }, 1200);
  }, [mainCard, targetOpposite, roundNumber, p1.selectedCard, p2.selectedCard]);

  // Confirm pairing check
  const handleConfirmPair = useCallback(
    (playerId: 'p1' | 'p2', card: OppositeCard) => {
      if (phase !== 'playing') return; // Strict lock against late submissions

      const isCorrect = card.id === targetOpposite.id;

      if (isCorrect) {
        // Correct answer! First valid submission wins the round!
        setPhase('round-resolving');
        sound.playMatchFly();
        sound.playCorrect();

        setPairedCard(card);
        setRoundWinnerId(playerId);

        const winnerName = playerId === 'p1' ? p1.name : p2.name;
        setRoundStatusMessage(`Hebat! ${winnerName} berhasil memasangkan ${mainCard.word} ↔ ${card.word}!`);

        if (playerId === 'p1') {
          setP1((prev) => ({
            ...prev,
            score: prev.score + settings.pointsPerCorrectAnswer,
            roundsWon: prev.roundsWon + 1,
            correctAnswers: prev.correctAnswers + 1,
          }));
        } else {
          setP2((prev) => ({
            ...prev,
            score: prev.score + settings.pointsPerCorrectAnswer,
            roundsWon: prev.roundsWon + 1,
            correctAnswers: prev.correctAnswers + 1,
          }));
        }

        setHistory((prev) => [
          ...prev,
          {
            roundNumber,
            mainCard,
            targetOpposite,
            winner: playerId,
            p1Answer: playerId === 'p1' ? card : p1.selectedCard,
            p2Answer: playerId === 'p2' ? card : p2.selectedCard,
          },
        ]);

        // Transition to round result modal
        setTimeout(() => {
          setPhase('round-result');
        }, 1500);
      } else {
        // Wrong answer
        sound.playWrong();
        setIsWrongShake(true);
        setTimeout(() => setIsWrongShake(false), 500);

        const playerName = playerId === 'p1' ? p1.name : p2.name;
        setRoundStatusMessage(`${playerName}: "${card.word}${card.meaningId ? ` (${card.meaningId})` : ''}" belum tepat, coba gulir lagi!`);

        if (playerId === 'p1') {
          setP1((prev) => ({
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
            hasAnsweredWrongThisRound: true,
            selectedCard: settings.allowRetryAfterWrongAnswer ? null : prev.selectedCard,
          }));
        } else {
          setP2((prev) => ({
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
            hasAnsweredWrongThisRound: true,
            selectedCard: settings.allowRetryAfterWrongAnswer ? null : prev.selectedCard,
          }));
        }
      }
    },
    [phase, targetOpposite.id, mainCard.word, p1.name, p1.selectedCard, p2.name, p2.selectedCard, settings, roundNumber]
  );

  // Next round transition
  const handleNextRound = useCallback(() => {
    if (roundNumber >= settings.totalRounds) {
      setPhase('game-over');
    } else {
      const nextRound = roundNumber + 1;
      setRoundNumber(nextRound);
      setupRound(nextRound, usedMainCardIds);
    }
  }, [roundNumber, settings.totalRounds, setupRound, usedMainCardIds]);

  // Restart match with same settings
  const handleRestartMatch = useCallback(() => {
    startMatch(p1.name, p2.name, p1.avatar, p2.avatar, settings);
  }, [startMatch, p1.name, p2.name, p1.avatar, p2.avatar, settings]);

  return {
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
  };
}
