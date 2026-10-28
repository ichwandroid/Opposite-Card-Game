import React, { useState } from 'react';
import { GameSettings } from '../../types/game';
import { AVATAR_OPTIONS } from '../../data/oppositeCards';
import { ArrowLeft, Play, Sparkles, User, Settings2 } from 'lucide-react';

interface PlayerSetupProps {
  initialP1Name: string;
  initialP2Name: string;
  initialP1Avatar: string;
  initialP2Avatar: string;
  settings: GameSettings;
  onStartMatch: (
    p1Name: string,
    p2Name: string,
    p1Avatar: string,
    p2Avatar: string,
    newSettings: GameSettings
  ) => void;
  onBack: () => void;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({
  initialP1Name,
  initialP2Name,
  initialP1Avatar,
  initialP2Avatar,
  settings,
  onStartMatch,
  onBack,
}) => {
  const [p1Name, setP1Name] = useState(initialP1Name || 'Budi');
  const [p2Name, setP2Name] = useState(initialP2Name || 'Siti');
  const [p1Avatar, setP1Avatar] = useState(initialP1Avatar || '🐰');
  const [p2Avatar, setP2Avatar] = useState(initialP2Avatar || '🐯');
  const [totalRounds, setTotalRounds] = useState(settings.totalRounds);
  const [answerDuration, setAnswerDuration] = useState(settings.answerDuration);
  const [allowRetry, setAllowRetry] = useState(settings.allowRetryAfterWrongAnswer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartMatch(
      p1Name.trim() || 'Peserta 1',
      p2Name.trim() || 'Peserta 2',
      p1Avatar,
      p2Avatar,
      {
        ...settings,
        totalRounds,
        answerDuration,
        allowRetryAfterWrongAnswer: allowRetry,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-indigo-50 p-4 md:p-8 flex items-center justify-center select-none">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-amber-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Persiapan Peserta & Permainan
          </h2>
          <div className="w-16" />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          {/* Two Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Player 1 Card */}
            <div className="p-4 rounded-2xl border-2 border-sky-300 bg-sky-50/50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500 text-white">
                  PESERTA 1 (KIRI)
                </span>
                <span className="text-xs font-semibold text-sky-700">Tombol [W / S]</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Siswa / Pemain:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    placeholder="Nama Peserta 1"
                    className="w-full py-2 px-3 text-sm font-bold bg-white border border-sky-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <User className="absolute right-3 top-2.5 w-4 h-4 text-sky-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pilih Avatar:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setP1Avatar(av.emoji)}
                      className={`p-2 rounded-xl text-xl flex flex-col items-center justify-center transition-all ${
                        p1Avatar === av.emoji
                          ? 'bg-sky-500 text-white shadow-md scale-105 ring-2 ring-sky-300'
                          : 'bg-white hover:bg-sky-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <span>{av.emoji}</span>
                      <span className="text-[8px] mt-0.5 font-bold truncate max-w-[48px]">
                        {av.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Player 2 Card */}
            <div className="p-4 rounded-2xl border-2 border-rose-300 bg-rose-50/50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500 text-white">
                  PESERTA 2 (KANAN)
                </span>
                <span className="text-xs font-semibold text-rose-700">Tombol [↑ / ↓]</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Siswa / Pemain:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    placeholder="Nama Peserta 2"
                    className="w-full py-2 px-3 text-sm font-bold bg-white border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                  <User className="absolute right-3 top-2.5 w-4 h-4 text-rose-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pilih Avatar:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setP2Avatar(av.emoji)}
                      className={`p-2 rounded-xl text-xl flex flex-col items-center justify-center transition-all ${
                        p2Avatar === av.emoji
                          ? 'bg-rose-500 text-white shadow-md scale-105 ring-2 ring-rose-300'
                          : 'bg-white hover:bg-rose-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <span>{av.emoji}</span>
                      <span className="text-[8px] mt-0.5 font-bold truncate max-w-[48px]">
                        {av.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Game Rules Config */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-slate-700">
              <Settings2 className="w-4 h-4 text-amber-600" />
              <span>Pengaturan Pertandingan</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Total Rounds */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Jumlah Ronde:
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-xl border border-slate-200">
                  {[5, 10, 15].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setTotalRounds(r)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        totalRounds === r
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Durasi Per Ronde:
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-xl border border-slate-200">
                  {[10, 15, 20].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setAnswerDuration(d)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        answerDuration === d
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Retry Allowed */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Coba Lagi Jika Salah:
                </label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-white rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setAllowRetry(true)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      allowRetry
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Boleh
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllowRetry(false)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      !allowRetry
                        ? 'bg-slate-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    1 Kali
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>MULAI PERTANDINGAN SEKARANG</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </button>
        </form>
      </div>
    </div>
  );
};
