import React, { useState } from 'react';
import { romanticAudio } from '../utils/audio';
import { RotateCw, Heart, Sparkles } from 'lucide-react';

interface CardData {
  id: number;
  emoji: string;
  title: string;
  frontDesc: string;
  backApology: string;
  tag: string;
}

const mistakes: CardData[] = [
  {
    id: 1,
    emoji: '🐢',
    title: 'Balas Chat Lama',
    frontDesc: 'Status online tapi balasan baru mendarat setengah jam kemudian...',
    backApology: 'Aku ngaku salah! Kadang udah baca di notifikasi, kepikiran balesnya di kepala, tapi jempol malah lanjut ngetik kerjaan. Janji sekarang: Tiap ada jeda satu menit pun, aku prioritaskan kabari Nila duluan.',
    tag: 'Tingkat Dosa: Lumayan Bikin Sebal',
  },
  {
    id: 2,
    emoji: '😴',
    title: 'Janji Video Call Malah Ketiduran',
    frontDesc: '‘Nanti malam video Call ya sayang’ -> 10 menit kemudian sudah fokus sekeripesih.',
    backApology: 'Sumpah ini agak gaenak juga sih hehe. padahal pengin liatin kamu, eh mata ku malah kalah telak sama bantal ku yang agak bau enih. Tebusan: Weekend ini aku usahain udah ACC judul biar kita bisa bareng-bareng skripsian via wa wkwkwk!',
    tag: 'Tingkat Dosa: Memalukan Sekali',
  },
  {
    id: 3,
    emoji: '⏳',
    title: 'Sering Bilang ‘Sebentar Ya’',
    frontDesc: '‘Sebentar ya sayang’ tapi durasinya berasa kayak nunggu prabowo turun jabatan.',
    backApology: 'Maaf ya sayang ‘Sebentar’-ku sering bikin kamu menunggu dalam sepi. Mulai sekarang, kalau ada yang mendesak, aku bakal kasih estimasi menit yang jelas biar kamu nggak digantungin.',
    tag: 'Tingkat Dosa: Sangat Diakui',
  },
  {
    id: 4,
    emoji: '🥺',
    title: 'Kurang Peka Sinyal Rindu',
    frontDesc: 'Nila kirim kode kangen atau cerita seru hari ini, responsku cuma seadanya...',
    backApology: 'Radar peka ku kadang ga nyala wkwkwk. Maaf ya sayang... Aku akan usahain dengerin setiap keluh kesah dan ceritamu dengan mata berbinar, karena duniaku juga ada di kamu.',
    tag: 'Tingkat Dosa: Bikin Gemas & Kesal',
  },
];

export const ApologyCards: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    romanticAudio.playCardFlip();
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-rose-500 font-handwriting text-2xl font-bold tracking-wide mb-1">
          <Sparkles className="h-5 w-5" />
          <span>Pengakuan Dosa Terbuka</span>
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 dark:text-rose-100">
          Daftar Kesalahan Pacarmu yang Sibuk Ini
        </h2>
        <p className="mt-2 text-sm sm:text-base text-rose-800/80 dark:text-rose-200/80 max-w-lg mx-auto font-sans">
          Ketuk tiap kartu di bawah buat membaca klarifikasi jujur &amp; janji tobatnya yaa 🙈
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {mistakes.map((item) => {
          const isFlipped = flippedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className="perspective-1000 group cursor-pointer h-64 sm:h-72 select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFlip(item.id);
                }
              }}
              aria-label={`Kartu ${item.title}: ${isFlipped ? 'Terbuka' : 'Tertutup, ketuk untuk membuka'}`}
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform rounded-2xl shadow-md group-hover:shadow-xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* SISI DEPAN (FRONT) */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col justify-between border transition-colors ${
                    isDark
                      ? 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-rose-900/40 border-rose-800/50 text-rose-100'
                      : 'bg-gradient-to-br from-rose-50 via-white to-pink-50/70 border-rose-200/80 text-rose-950'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl" role="img" aria-label={item.title}>
                        {item.emoji}
                      </span>
                      <span className="text-[11px] font-medium tracking-wide text-rose-600 dark:text-rose-400">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight mb-2 text-rose-900 dark:text-rose-200">
                      {item.title}
                    </h3>

                    <p className="text-sm text-rose-800/80 dark:text-rose-200/70 leading-relaxed font-sans">
                      {item.frontDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rose-200/50 dark:border-rose-800/50 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
                    <span className="flex items-center gap-1.5">
                      <RotateCw className="h-3.5 w-3.5 animate-spin-slow" />
                      <span>Ketuk untuk membalik kartu</span>
                    </span>
                    <span>💌</span>
                  </div>
                </div>

                {/* SISI BELAKANG (BACK) */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 flex flex-col justify-between border transition-colors ${
                    isDark
                      ? 'bg-gradient-to-br from-rose-900 via-rose-950 to-slate-950 border-rose-600/50 text-rose-50'
                      : 'bg-gradient-to-br from-rose-100/90 via-pink-50 to-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-bold tracking-wider text-rose-600 dark:text-rose-300 flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 fill-current" />
                        <span>Isi Hati Sebenarnya</span>
                      </span>
                      <span className="text-xl">✨</span>
                    </div>

                    <h4 className="font-serif font-bold text-base sm:text-lg mb-2 text-rose-950 dark:text-rose-100">
                      Janji Tobatku:
                    </h4>

                    <p
                      style={item.id === 2 ? { color: '#e30f27' } : undefined}
                      className={`text-xs sm:text-sm leading-relaxed font-sans ${
                        item.id === 2 ? '' : 'text-rose-900/90 dark:text-rose-100/90'
                      }`}
                    >
                      {item.backApology}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rose-300/40 dark:border-rose-800/40 flex items-center justify-between text-[11px] font-medium text-rose-600 dark:text-rose-400">
                    <span>Ketuk lagi buat menutup</span>
                    <span className="font-handwriting text-base font-bold text-rose-700 dark:text-rose-300">
                      Maafin ya, sayang ❤️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
