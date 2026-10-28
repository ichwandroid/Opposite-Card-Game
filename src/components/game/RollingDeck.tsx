import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OppositeCard } from '../../types/game';
import { CardIllustration } from '../ui/CardIllustration';
import { GameCardFrameDecor } from '../ui/CardOrnament';
import { Sparkles, ArrowRightLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface RollingDeckProps {
  playerId: 'p1' | 'p2';
  playerName: string;
  deck: OppositeCard[];
  activeIndex: number;
  selectedCard: OppositeCard | null;
  isDisabled: boolean;
  isSubmitting: boolean;
  hasWrongAnswer: boolean;
  onRollIndexChange: (newIndex: number) => void;
  onSelectCard: (card: OppositeCard) => void;
  onCancelSelection: () => void;
  onConfirmPair: (card: OppositeCard) => void;
  keyboardUpKey?: string;
  keyboardDownKey?: string;
  keyboardSelectKey?: string;
}

// Spring physics constants for deck rolling
const SPRING_MASS = 1.0;
const SPRING_STIFFNESS = 230;
const SPRING_DAMPING = 22;

// Spacing offsets for the vertical fanned stack
const STEP_1 = 58; // Distance to adjacent cards (-1 and +1)
const STEP_2 = 105; // Distance to outer cards (-2 and +2)

export const RollingDeck: React.FC<RollingDeckProps> = ({
  playerId,
  deck,
  activeIndex,
  isDisabled,
  isSubmitting,
  hasWrongAnswer,
  onRollIndexChange,
  onConfirmPair,
  keyboardUpKey,
  keyboardDownKey,
  keyboardSelectKey,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Distinct Color Palette & Styling based on Player 1 vs Player 2
  const isP1 = playerId === 'p1';
  const playerTheme = isP1
    ? {
        name: 'p1',
        decorTheme: 'amber' as const,
        activeBorder: 'border-amber-400 hover:border-amber-500',
        activeGlow: 'shadow-[0_16px_36px_rgba(245,158,11,0.28)]',
        activeBadge: 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs',
        cartoucheBorder: 'border-amber-200/70',
        cartoucheBg: 'bg-gradient-to-r from-amber-50/60 via-white to-amber-50/60',
        wordHighlight: 'text-amber-800',
        hintText: 'text-amber-600',
        ambientHalo: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)',
        actionBtn:
          'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/25',
        navBtn:
          'bg-amber-100/90 text-amber-800 hover:bg-amber-200 border-amber-300 active:scale-95',
      }
    : {
        name: 'p2',
        decorTheme: 'teal' as const,
        activeBorder: 'border-teal-400 hover:border-teal-500',
        activeGlow: 'shadow-[0_16px_36px_rgba(20,184,166,0.28)]',
        activeBadge: 'bg-teal-100 text-teal-900 border-teal-300 shadow-2xs',
        cartoucheBorder: 'border-teal-200/70',
        cartoucheBg: 'bg-gradient-to-r from-teal-50/60 via-white to-teal-50/60',
        wordHighlight: 'text-teal-800',
        hintText: 'text-teal-600',
        ambientHalo: 'radial-gradient(circle, rgba(20,184,166,0.22) 0%, transparent 70%)',
        actionBtn:
          'bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-600 hover:from-teal-600 hover:to-emerald-700 shadow-teal-500/25',
        navBtn:
          'bg-teal-100/90 text-teal-800 hover:bg-teal-200 border-teal-300 active:scale-95',
      };

  // Continuous Spring Position & Velocity for deck rolling
  const [animPos, setAnimPos] = useState<number>(activeIndex);
  const posRef = useRef<number>(activeIndex);
  const velRef = useRef<number>(0);
  const targetRef = useRef<number>(activeIndex);
  const isRollingDragRef = useRef<boolean>(false);
  const rAFRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const lastNotifiedIndexRef = useRef<number>(activeIndex);
  const lastSoundTickIndexRef = useRef<number>(activeIndex);

  // Omni-directional Physical Card Lifting & Dragging State
  const [isCardLifted, setIsCardLifted] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Disambiguation gesture tracking (rolling vs lifting)
  const gestureState = useRef<{
    mode: 'none' | 'rolling' | 'lifting';
    startX: number;
    startY: number;
    lastY: number;
    lastTime: number;
    velocityY: number;
  }>({
    mode: 'none',
    startX: 0,
    startY: 0,
    lastY: 0,
    lastTime: 0,
    velocityY: 0,
  });

  const lastWheelTime = useRef<number>(0);

  // Active card
  const activeCard = deck[activeIndex] || deck[0];

  // Sync target when activeIndex changes externally
  useEffect(() => {
    const currentTargetNorm =
      ((Math.round(targetRef.current) % deck.length) + deck.length) % deck.length;
    let diff = activeIndex - currentTargetNorm;
    if (diff > deck.length / 2) diff -= deck.length;
    if (diff < -deck.length / 2) diff += deck.length;

    targetRef.current += diff;
    startSpringLoop();
  }, [activeIndex, deck.length]);

  // Spring Physics Loop for Deck Rolling
  const startSpringLoop = useCallback(() => {
    if (rAFRef.current !== null) return;
    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.04);
      lastTimeRef.current = now;

      if (!isRollingDragRef.current) {
        const displacement = posRef.current - targetRef.current;
        const springForce = -SPRING_STIFFNESS * displacement;
        const dampingForce = -SPRING_DAMPING * velRef.current;
        const acceleration = (springForce + dampingForce) / SPRING_MASS;

        velRef.current += acceleration * dt;
        posRef.current += velRef.current * dt;

        // Sound tick when crossing each card threshold
        const currentInt = Math.round(posRef.current);
        if (currentInt !== lastSoundTickIndexRef.current) {
          lastSoundTickIndexRef.current = currentInt;
          sound.playRoll();
        }

        // Settling condition
        if (Math.abs(displacement) < 0.002 && Math.abs(velRef.current) < 0.008) {
          posRef.current = targetRef.current;
          velRef.current = 0;
          setAnimPos(posRef.current);
          rAFRef.current = null;

          const normalized =
            ((Math.round(posRef.current) % deck.length) + deck.length) % deck.length;
          if (normalized !== lastNotifiedIndexRef.current) {
            lastNotifiedIndexRef.current = normalized;
            onRollIndexChange(normalized);
          }
          return;
        }
      }

      setAnimPos(posRef.current);
      rAFRef.current = requestAnimationFrame(loop);
    };

    rAFRef.current = requestAnimationFrame(loop);
  }, [deck.length, onRollIndexChange]);

  useEffect(() => {
    return () => {
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
        rAFRef.current = null;
      }
    };
  }, []);

  // Roll command with spring impulse
  const rollBy = useCallback(
    (delta: number) => {
      if (isDisabled || isSubmitting || deck.length <= 1) return;

      targetRef.current += delta;
      velRef.current += delta * 4.2;
      startSpringLoop();
    },
    [isDisabled, isSubmitting, deck.length, startSpringLoop]
  );

  const jumpToContinuousCard = (continuousIndex: number) => {
    if (isDisabled || isSubmitting) return;
    targetRef.current = continuousIndex;
    startSpringLoop();
  };

  // Wheel listener for rolling
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isDisabled || isSubmitting) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 110) return;

      if (Math.abs(e.deltaY) > 8) {
        lastWheelTime.current = now;
        if (e.deltaY > 0) {
          rollBy(1); // roll down to next card
        } else {
          rollBy(-1); // roll up to prev card
        }
      }
    },
    [isDisabled, isSubmitting, rollBy]
  );

  // =========================================================================
  // UNIFIED SMART GESTURE: Vertical Swipe rolls deck, Horizontal/Out lifts card!
  // =========================================================================
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isDisabled || isSubmitting) return;

    gestureState.current = {
      mode: 'none',
      startX: e.clientX,
      startY: e.clientY,
      lastY: e.clientY,
      lastTime: performance.now(),
      velocityY: 0,
    };

    setDragOffset({ x: 0, y: 0 });

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const g = gestureState.current;
    if (g.mode === 'none') {
      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;
      const dist = Math.hypot(dx, dy);

      if (dist >= 6) {
        // Disambiguate: Is user swiping vertically to browse, or lifting toward center to match?
        const isHorizontalIntent = Math.abs(dx) > Math.abs(dy) * 1.15;
        const isTowardCenter = isP1 ? dx > 15 : dx < -15;

        if (isHorizontalIntent || isTowardCenter) {
          // Lift the active card in 3D omni-directional space!
          g.mode = 'lifting';
          setIsCardLifted(true);
          setDragOffset({ x: dx, y: dy });
        } else {
          // Roll through the deck vertically!
          g.mode = 'rolling';
          isRollingDragRef.current = true;
          startSpringLoop();
        }
      }
      return;
    }

    if (g.mode === 'rolling') {
      const now = performance.now();
      const dt = Math.max((now - g.lastTime) / 1000, 0.001);
      const moveY = e.clientY - g.lastY;

      const cardUnitDelta = -moveY / 72;
      posRef.current += cardUnitDelta;
      targetRef.current = posRef.current;

      g.velocityY = cardUnitDelta / dt;
      g.lastY = e.clientY;
      g.lastTime = now;
      return;
    }

    if (g.mode === 'lifting') {
      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;
      setDragOffset({ x: dx, y: dy });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const g = gestureState.current;
    const mode = g.mode;
    gestureState.current.mode = 'none';

    if (mode === 'none') {
      // Pure tap/click on the center card
      // Direct click on the card confirms match!
      if (activeCard && !isDisabled && !isSubmitting) {
        onConfirmPair(activeCard);
      }
      return;
    }

    if (mode === 'rolling') {
      isRollingDragRef.current = false;
      // Flick inertia momentum
      let flickVel = Math.max(-12, Math.min(12, g.velocityY));
      const inertialOffset = flickVel * 0.16;
      const rawTarget = posRef.current + inertialOffset;

      targetRef.current = Math.round(rawTarget);
      velRef.current = flickVel;
      startSpringLoop();
      return;
    }

    if (mode === 'lifting') {
      setIsCardLifted(false);
      const { x, y } = dragOffset;
      const distance = Math.hypot(x, y);

      // Pairing drop: dragged towards the center column or significantly out
      const isTargetZone =
        (isP1 && x > 45) ||
        (!isP1 && x < -45) ||
        distance > 75;

      if (isTargetZone && activeCard && !isDisabled && !isSubmitting) {
        onConfirmPair(activeCard);
      }

      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    gestureState.current.mode = 'none';
    isRollingDragRef.current = false;
    setIsCardLifted(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDisabled || isSubmitting) return;

      if (keyboardUpKey && e.key.toLowerCase() === keyboardUpKey.toLowerCase()) {
        e.preventDefault();
        rollBy(-1);
      } else if (keyboardDownKey && e.key.toLowerCase() === keyboardDownKey.toLowerCase()) {
        e.preventDefault();
        rollBy(1);
      } else if (keyboardSelectKey && e.key.toLowerCase() === keyboardSelectKey.toLowerCase()) {
        e.preventDefault();
        if (activeCard) {
          onConfirmPair(activeCard);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isDisabled,
    isSubmitting,
    keyboardUpKey,
    keyboardDownKey,
    keyboardSelectKey,
    activeCard,
    rollBy,
    onConfirmPair,
  ]);

  if (!activeCard || deck.length === 0) return null;

  // Visible slots in the vertical fanned stack
  const baseCenterIndex = Math.round(animPos);
  const visibleOffsets = [-2, -1, 0, 1, 2];

  // Calculate clean non-intersecting vertical displacement
  const getDisplacementY = (delta: number) => {
    const sign = delta < 0 ? -1 : 1;
    const absD = Math.abs(delta);
    if (absD <= 1) {
      return delta * STEP_1;
    }
    return sign * (STEP_1 + (absD - 1) * (STEP_2 - STEP_1));
  };

  // Dynamic Realistic Physical Tilt when Lifted
  const tiltZ = isCardLifted
    ? (isP1 ? -3.5 : 3.5) + Math.max(-12, Math.min(12, dragOffset.x * 0.06 - dragOffset.y * 0.03))
    : 0;
  const tiltX = isCardLifted ? Math.max(-14, Math.min(14, -dragOffset.y * 0.05)) : 0;
  const tiltY = isCardLifted ? Math.max(-14, Math.min(14, dragOffset.x * 0.05)) : 0;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="flex flex-col items-center justify-center w-full h-full max-w-xs mx-auto select-none touch-none"
    >
      {/* Clean Vertical Fanned Stack Stage */}
      <div
        style={{
          cursor: isRollingDragRef.current ? 'grabbing' : isCardLifted ? 'grabbing' : 'grab',
        }}
        className="relative z-10 w-full h-[360px] sm:h-[390px] pt-2 my-auto flex items-center justify-center overflow-visible select-none [perspective:900px]"
      >
        {/* Soft background ambient halo matching player color */}
        <div
          className="absolute w-60 h-80 rounded-full blur-2xl pointer-events-none -z-10 transition-colors duration-300"
          style={{ background: playerTheme.ambientHalo }}
        />

        {/* Render the 5 fanned cards */}
        {visibleOffsets.map((slotOffset) => {
          const continuousCardIndex = baseCenterIndex + slotOffset;
          const normalizedIndex =
            ((continuousCardIndex % deck.length) + deck.length) % deck.length;
          const card = deck[normalizedIndex];
          if (!card) return null;

          const delta = continuousCardIndex - animPos;
          const absD = Math.abs(delta);
          const isCenter = absD < 0.5;

          const translateY = getDisplacementY(delta);
          const scale = Math.max(0.78, 1 - absD * 0.08);

          // Guaranteed Stacking: Center card is strictly on top
          const zIndex = isCenter ? (isCardLifted ? 50 : 40) : Math.round(25 - absD * 6);
          const opacity = Math.max(0.65, 1 - absD * 0.15);

          // Transform & Physical Lift Physics for the Center Card
          let transformStyle = `translateY(${translateY}px) scale(${scale})`;
          let shadowStyle = '';

          if (isCenter) {
            if (isCardLifted) {
              // Lifted in 3D space with omni-directional translation and natural card tilt
              transformStyle = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 40px) scale(1.07) rotateZ(${tiltZ}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
              shadowStyle =
                '0 28px 56px rgba(0,0,0,0.36), 0 10px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.7)';
            } else {
              // Resting center position with hover-ready transition
              transformStyle = `translateY(${translateY}px) scale(1)`;
              shadowStyle = '';
            }
          }

          return (
            <div
              key={`${card.id}-${continuousCardIndex}`}
              onPointerDown={isCenter ? handlePointerDown : undefined}
              onPointerMove={isCenter ? handlePointerMove : undefined}
              onPointerUp={isCenter ? handlePointerUp : undefined}
              onPointerCancel={isCenter ? handlePointerCancel : undefined}
              onClick={() => {
                if (!isCenter) {
                  // Direct click on card above/below brings it immediately to center!
                  jumpToContinuousCard(continuousCardIndex);
                }
              }}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                filter: isCenter ? 'none' : `brightness(${Math.max(0.85, 1 - absD * 0.08)})`,
                boxShadow: shadowStyle || undefined,
                transition: isCardLifted
                  ? 'none'
                  : 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.2), box-shadow 0.25s ease',
                cursor: isCenter
                  ? isCardLifted
                    ? 'grabbing'
                    : 'grab'
                  : 'pointer',
                willChange: 'transform, opacity, box-shadow',
              }}
              className={`absolute w-[230px] sm:w-[245px] h-[250px] sm:h-[270px] rounded-xl border-3 flex flex-col justify-between p-2.5 select-none bg-white overflow-hidden transition-colors duration-150 ${
                isCenter
                  ? `${playerTheme.activeBorder} ${playerTheme.activeGlow} hover:scale-[1.015]`
                  : 'border-slate-200/90 shadow-md hover:border-slate-300 hover:scale-[0.82]'
              } ${hasWrongAnswer && isCenter ? 'animate-shake border-red-500 bg-red-50' : ''}`}
            >
              {/* Game Card Fantasy Ornament Overlay - Player-Differentiated */}
              <GameCardFrameDecor
                theme={isCenter ? playerTheme.decorTheme : 'slate'}
              />

              {/* Card Header: Position & Category */}
              <div
                className={`relative z-10 flex items-center justify-between text-xs pb-1.5 border-b ${
                  isCenter ? playerTheme.cartoucheBorder : 'border-slate-100'
                }`}
              >
                <span className="font-extrabold text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  #{normalizedIndex + 1}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {card.category}
                </span>
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isCenter
                      ? playerTheme.activeBadge
                      : 'text-slate-400'
                  }`}
                >
                  {isCenter ? (isCardLifted ? '✋ DIANGKAT' : '⚡ AKTIF') : delta < 0 ? '↑ Klik Pilih' : '↓ Klik Pilih'}
                </span>
              </div>

              {/* Central Area: Illustration & Word */}
              {isCenter ? (
                <>
                  <div
                    className={`relative z-10 flex-1 flex flex-col items-center justify-center my-2 p-1.5 rounded-lg border overflow-hidden shadow-inner ${
                      isP1
                        ? 'bg-gradient-to-b from-amber-50/70 via-slate-50 to-amber-50/30 border-amber-200/60'
                        : 'bg-gradient-to-b from-teal-50/70 via-slate-50 to-teal-50/30 border-teal-200/60'
                    }`}
                  >
                    <div className="w-24 h-24 flex items-center justify-center transition-transform duration-200">
                      <CardIllustration name={card.iconName} className="w-20 h-20 drop-shadow-sm" />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 text-center line-clamp-1 italic px-2 font-medium">
                      "{card.hint}"
                    </p>
                  </div>

                  {/* Card Footer: Bold Word Title in Plaque */}
                  <div
                    className={`relative z-10 text-center pt-2 pb-1 border-t rounded-lg px-2 ${playerTheme.cartoucheBorder} ${playerTheme.cartoucheBg}`}
                  >
                    <div className="text-2xl font-black tracking-wider text-slate-900 font-['Outfit',sans-serif] drop-shadow-2xs">
                      {card.word}
                    </div>
                    {card.meaningId && (
                      <div className={`text-xs font-bold leading-none mt-0.5 ${playerTheme.wordHighlight}`}>
                        ({card.meaningId})
                      </div>
                    )}
                    <div
                      className={`text-[10px] font-extrabold mt-1 flex items-center justify-center gap-1 ${playerTheme.hintText}`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isCardLifted ? 'Arahkan & lepas ke tengah!' : 'Geser atas/bawah untuk cari kata!'}</span>
                    </div>
                  </div>
                </>
              ) : delta < 0 ? (
                /* Card above: Word clearly visible in the top exposed area */
                <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-2">
                  <div className="text-base font-black tracking-wider text-slate-800 font-['Outfit',sans-serif]">
                    {card.word}
                  </div>
                  {card.meaningId && (
                    <div className="text-[10px] font-bold text-slate-500 leading-none">
                      ({card.meaningId})
                    </div>
                  )}
                  <div className="w-9 h-9 mt-1.5 opacity-60 flex items-center justify-center">
                    <CardIllustration name={card.iconName} className="w-8 h-8" />
                  </div>
                </div>
              ) : (
                /* Card below: Word clearly visible in the bottom exposed area */
                <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-2">
                  <div className="w-9 h-9 mb-1.5 opacity-60 flex items-center justify-center">
                    <CardIllustration name={card.iconName} className="w-8 h-8" />
                  </div>
                  <div className="text-base font-black tracking-wider text-slate-800 font-['Outfit',sans-serif]">
                    {card.word}
                  </div>
                  {card.meaningId && (
                    <div className="text-[10px] font-bold text-slate-500 leading-none">
                      ({card.meaningId})
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prominent Action Button: Immediately Pairs & Matches */}
      <div className="w-full mt-2 z-30">
        <button
          onClick={() => {
            if (!isDisabled && !isSubmitting && activeCard) {
              onConfirmPair(activeCard);
            }
          }}
          disabled={isDisabled || isSubmitting}
          className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm tracking-wide shadow-lg transition-all duration-150 flex items-center justify-center gap-2 ${
            isDisabled || isSubmitting
              ? 'opacity-50 bg-slate-300 text-slate-500 cursor-not-allowed'
              : `${playerTheme.actionBtn} active:scale-98 text-white hover:shadow-xl`
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>COCOKKAN KARTU INI!</span>
          {keyboardSelectKey && (
            <span className="ml-1 px-2 py-0.5 text-[11px] bg-black/20 rounded-md font-mono font-normal">
              [{keyboardSelectKey.toUpperCase()}]
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
