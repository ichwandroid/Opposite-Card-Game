import { OppositeCard } from '../types/game';
import { OPPOSITE_CARDS, getOppositeCard } from '../data/oppositeCards';

/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates an independent deck for a player containing:
 * 1. The exact correct opposite card.
 * 2. An assortment of distractor cards from the bank.
 * The position of the correct card is randomly distributed.
 */
export function generatePlayerDeck(
  mainCard: OppositeCard,
  deckSize: number = 7
): { deck: OppositeCard[]; initialIndex: number } {
  const correctCard = getOppositeCard(mainCard);
  if (!correctCard) {
    throw new Error(`Opposite card for ${mainCard.id} not found`);
  }

  // Filter pool: exclude main card and correct opposite card
  const distractorPool = OPPOSITE_CARDS.filter(
    (c) => c.id !== mainCard.id && c.id !== correctCard.id
  );

  // Shuffle distractors and take (deckSize - 1)
  const shuffledDistractors = shuffleArray(distractorPool).slice(0, Math.max(3, deckSize - 1));

  // Insert correct card into the deck at a random position
  const deck = [...shuffledDistractors];
  const targetIndex = Math.floor(Math.random() * (deck.length + 1));
  deck.splice(targetIndex, 0, correctCard);

  // Initial display index: choose an index that is NOT the targetIndex if possible,
  // so the player must roll to find it!
  let initialIndex = 0;
  if (deck.length > 1) {
    const nonTargetIndices = deck.map((_, i) => i).filter((i) => i !== targetIndex);
    if (nonTargetIndices.length > 0) {
      initialIndex = nonTargetIndices[Math.floor(Math.random() * nonTargetIndices.length)];
    }
  }

  return { deck, initialIndex };
}

/**
 * Pick a main card that hasn't been used recently
 */
export function pickMainCard(usedIds: string[] = []): OppositeCard {
  // Available cards that haven't been used yet
  let available = OPPOSITE_CARDS.filter((c) => !usedIds.includes(c.id));

  if (available.length === 0) {
    // If all used, reset pool
    available = [...OPPOSITE_CARDS];
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  return chosen;
}
