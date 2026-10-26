import React, { useState } from 'react';
import { Mail, Heart, ChevronDown } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LetterEnvelopeProps {
  isDark?: boolean;
  onOpenLetter: () => void;
}

export const LetterEnvelope: React.FC<LetterEnvelopeProps> = ({ isDark = false, onOpenLetter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    romanticAudio.playCardFlip();
    setIsOpen(true);
    onOpenLetter();
  };

  return (
    <section className="min-h-[80vh] sm:min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 text-center relative z-10">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide bg-rose-100/90 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200/90 dark:border-rose-800/80 shadow-xs">
        <Heart className="h-3.5 w-3.5 fill-current text-rose-500 animate-pulse" />
        <span>Pesan Khusus &amp; Sangat Rahasia</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-rose-950 dark:text-rose-100 max-w-2xl mx-auto leading-tight sm:leading-tight">
        Untuk Nila Uzlifatul Fikri Sa’adah
      </h1>

      <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 dark:text-rose-400 mt-3 max-w-xl mx-auto">
        Ada seseorang yang mau ngomong sesuatu... 🥺👉👈
      </p>

      <p className="mt-4 text-sm sm:text-base text-rose-800/80 dark:text-rose-200/80 max-w-md mx-auto leading-relaxed font-sans">
        Bukan tentang skripsi yang ga kelar, bukan tentang sibuknya dunia karena indonesia mau bubar . Ini murni dari sudut pandang terdalam pacarmu yang belakangan ini agak bingung.
      </p>

      {/* Interactive Envelope Graphic */}
      <div className="mt-8 relative w-64 sm:w-72 h-44 sm:h-48 flex items-center justify-center group">
        <div
          onClick={handleOpen}
          className={`w-full h-full rounded-2xl cursor-pointer relative shadow-xl transition-all duration-500 flex flex-col items-center justify-center border ${
            isDark
              ? 'bg-gradient-to-b from-rose-900/90 to-rose-950 border-rose-700/60 shadow-rose-950/50'
              : 'bg-gradient-to-b from-rose-100 via-rose-50 to-pink-100 border-rose-200 shadow-rose-200/60'
          } ${isOpen ? 'scale-[1.02] ring-2 ring-rose-400' : 'hover:scale-[1.02]'}`}
        >
          {/* Envelope flap lines */}
          <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden pointer-events-none">
            <div
              className={`w-full h-full border-b border-rose-300 dark:border-rose-700/80 transform origin-top transition-transform duration-700 ${
                isOpen ? '-scale-y-100 opacity-30' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: isDark ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.6)',
              }}
            ></div>
          </div>

          {/* Heart wax seal button */}
          <div
            className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-300 ${
              isOpen
                ? 'scale-110 bg-emerald-500 text-white'
                : 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white group-hover:scale-110'
            }`}
          >
            <Heart className={`h-7 w-7 fill-current ${isOpen ? 'animate-bounce' : 'animate-pulse'}`} />
          </div>

          <span className="relative z-10 mt-3 font-semibold text-xs tracking-wider uppercase text-rose-900 dark:text-rose-200">
            {isOpen ? 'Surat Sudah Dibuka ✨' : 'Ketuk Segel Hati'}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleOpen}
          className="cursor-pointer group flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-base shadow-lg bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 hover:shadow-rose-400/30 active:scale-95"
        >
          <Mail className="h-4 w-4" />
          <span>Buka ya 💌</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
};
