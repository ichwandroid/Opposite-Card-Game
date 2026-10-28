import React, { useEffect, useState } from 'react';
import { sound } from '../../utils/soundEngine';

interface CountdownOverlayProps {
  onComplete: () => void;
  roundNumber: number;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ onComplete, roundNumber }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    sound.playCountdown(count);

    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      // 0 means "MULAI!"
      const endTimer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(endTimer);
    }
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm select-none">
      <div className="text-center animate-scaleUp">
        <div className="text-xl md:text-2xl font-black text-amber-300 uppercase tracking-widest mb-4 drop-shadow-md">
          Bersiap Ronde {roundNumber}!
        </div>

        <div className="relative flex items-center justify-center">
          {count > 0 ? (
            <div
              key={count}
              className="text-8xl md:text-9xl font-black font-['Outfit',sans-serif] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-bounce"
            >
              {count}
            </div>
          ) : (
            <div
              key="start"
              className="text-6xl md:text-8xl font-black font-['Outfit',sans-serif] bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(250,204,21,0.6)] animate-pulse"
            >
              MULAI!
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-slate-200 font-semibold max-w-xs mx-auto">
          Cari kartu lawan kata secepat mungkin di tumpukan kartumu!
        </p>
      </div>
    </div>
  );
};
