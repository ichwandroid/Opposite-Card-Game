import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '1. Perhatikan Kartu Utama di Tengah',
      desc: 'Di tengah layar selalu ada satu kartu utama dengan kata dan ilustrasinya (contoh: BIG / Besar). Kartu ini menjadi acuan kata yang harus dicari lawan katanya dalam bahasa Inggris.',
      tip: 'Kartu utama tetap terlihat selama ronde berjalan agar peserta tidak lupa kata target!',
      badge: 'Fokus Visual',
      icon: '🎯',
    },
    {
      title: '2. Roll Tumpukan Kartumu Sendiri',
      desc: 'Peserta 1 (kiri) dan Peserta 2 (kanan) memiliki tumpukan kartu masing-masing. Gulir secara manual menggunakan roda scroll mouse, swipe layar sentuh, atau tombol panah [↑/↓] dan [W/S].',
      tip: 'Rolling tidak otomatis! Peserta yang menentukan kecepatan mencari kartu.',
      badge: 'Rolling Manual',
      icon: '🔄',
    },
    {
      title: '3. Temukan Lawan Kata (English Opposites)',
      desc: 'Cari kartu lawan kata dalam bahasa Inggris. Contoh: jika kartu utama adalah BIG (Besar), maka kartu yang kamu cari adalah SMALL (Kecil). Setiap deck pasti memiliki 1 kartu jawaban yang tepat!',
      tip: 'Urutan kartu diacak secara mandiri untuk setiap peserta.',
      badge: 'English Antonyms',
      icon: '💡',
    },
    {
      title: '4. Klik Kartu Untuk Langsung Mencocokkan',
      desc: 'Saat menemukan kartu yang dirasa tepat, langsung klik kartu aktif atau tekan tombol "COCOKKAN KARTU INI!" (atau tekan [Spasi]/[Enter]). Kartu akan langsung diterbangkan dan dicocokkan ke kartu utama!',
      tip: 'Tidak perlu dua kali klik, satu klik langsung mencocokkan jawabanmu!',
      badge: 'Aksi Instan',
      icon: '✨',
    },
    {
      title: '5. Adu Cepat Menjadi Juara Ronde!',
      desc: 'Peserta pertama yang mengonfirmasi jawaban benar memenangkan ronde tersebut dan mendapat +10 poin! Jika salah, lawan masih dapat mencari dan kamu bisa mencoba lagi.',
      tip: 'Kumpulkan poin terbanyak hingga ronde terakhir untuk menjadi juara!',
      badge: 'Sistem Adu Cepat',
      icon: '🏆',
    },
  ];

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-amber-300 flex flex-col justify-between animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{current.icon}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                PANDUAN BERMAIN · LANGKAH {step + 1} DARI {steps.length}
              </span>
              <h2 className="text-lg md:text-xl font-black text-slate-900 font-['Outfit',sans-serif] mt-0.5">
                {current.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup petunjuk"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="my-6 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col gap-3 text-slate-700">
          <p className="text-sm font-medium leading-relaxed">{current.desc}</p>

          <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs font-semibold text-amber-950 flex items-start gap-2 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>{current.tip}</span>
          </div>
        </div>

        {/* Steps Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-8 bg-amber-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <div />
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="py-2.5 px-5 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SAYA MENGERTI, AYO MAIN!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
