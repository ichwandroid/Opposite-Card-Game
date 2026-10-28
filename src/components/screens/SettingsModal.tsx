import React from 'react';
import { GameSettings } from '../../types/game';
import { X, Volume2, VolumeX, Music, RotateCcw, Home, Sparkles } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onRestartCurrentGame: () => void;
  onExitToMenu: () => void;
  onClose: () => void;
  isInGame?: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onRestartCurrentGame,
  onExitToMenu,
  onClose,
  isInGame = false,
}) => {
  const toggleSound = () => {
    const nextVal = !settings.soundEnabled;
    sound.setMuted(!nextVal);
    onUpdateSettings({ ...settings, soundEnabled: nextVal });
  };

  const toggleMusic = () => {
    const nextVal = !settings.musicEnabled;
    sound.setMusicEnabled(nextVal);
    onUpdateSettings({ ...settings, musicEnabled: nextVal });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 flex flex-col gap-4 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700">⚙️</span>
            <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
              Pengaturan Permainan
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup pengaturan"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Controls */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2.5">
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-blue-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <div className="text-xs font-bold text-slate-800">Efek Suara (SFX)</div>
                <div className="text-[10px] text-slate-500">Suara roll, klik, dan kemenangan</div>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                settings.soundEnabled
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {settings.soundEnabled ? 'Aktif' : 'Mati'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Music
                className={`w-5 h-5 ${settings.musicEnabled ? 'text-purple-600' : 'text-slate-400'}`}
              />
              <div>
                <div className="text-xs font-bold text-slate-800">Musik Latar (BGM)</div>
                <div className="text-[10px] text-slate-500">Melodi lembut sintetis ramah anak</div>
              </div>
            </div>

            <button
              onClick={toggleMusic}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                settings.musicEnabled
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {settings.musicEnabled ? 'Aktif' : 'Mati'}
            </button>
          </div>
        </div>

        {/* Duration Config */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
          <div className="text-xs font-bold text-slate-800">Durasi Menjawab Per Ronde</div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[10, 15, 20].map((sec) => (
              <button
                key={sec}
                onClick={() => onUpdateSettings({ ...settings, answerDuration: sec })}
                className={`py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  settings.answerDuration === sec
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {sec} Detik
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons if in game */}
        {isInGame && (
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onRestartCurrentGame();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mulai Ulang Pertandingan Ini</span>
            </button>

            <button
              onClick={() => {
                onExitToMenu();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Keluar ke Menu Utama</span>
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl font-black text-sm bg-slate-900 hover:bg-slate-800 text-white transition-colors"
        >
          Selesai & Tutup
        </button>
      </div>
    </div>
  );
};
