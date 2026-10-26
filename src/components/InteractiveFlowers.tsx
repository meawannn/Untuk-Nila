import React, { useState } from 'react';
import { romanticAudio } from '../utils/audio';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface FlowerItem {
  id: string;
  name: string;
  budLabel: string;
  bloomTitle: string;
  promise: string;
  colorName: string;
  accentBg: string;
  accentBorder: string;
  svgType: 'rose' | 'tulip' | 'sakura' | 'jasmine' | 'sunflower';
}

const flowerData: FlowerItem[] = [
  {
    id: 'rose',
    name: 'Mawar Merah',
    budLabel: 'Kuncup Mawar',
    bloomTitle: 'Mawar Merona Mekar',
    promise: 'Waktu untuk kamu bukan sisa-sisa waktu di ujung hari yang lelah, tapi waktu yang akan selalu aku usahakan dan jaga khusus.',
    colorName: 'text-rose-500',
    accentBg: 'bg-rose-50 dark:bg-rose-950/60',
    accentBorder: 'border-rose-200 dark:border-rose-800',
    svgType: 'rose',
  },
  {
    id: 'tulip',
    name: 'Tulip Manis',
    budLabel: 'Kuncup Tulip',
    bloomTitle: 'Tulip Kasih Sayang',
    promise: 'Aku akan berusaha kasih kabar tanpa harus kamu minta duluan, supaya harimu tenang dan nggak bertanya-tanya sendirian.',
    colorName: 'text-pink-500',
    accentBg: 'bg-pink-50 dark:bg-pink-950/60',
    accentBorder: 'border-pink-200 dark:border-pink-800',
    svgType: 'tulip',
  },
  {
    id: 'sakura',
    name: 'Sakura Lembut',
    budLabel: 'Kuncup Sakura',
    bloomTitle: 'Sakura Kedamaian',
    promise: 'Di antara jutaan hal yang bikin pusing di dunia ini, senyum dan canda kamu selalu jadi tempat ternyaman untuk pulang dan istirahat.',
    colorName: 'text-rose-400',
    accentBg: 'bg-rose-50/70 dark:bg-rose-950/50',
    accentBorder: 'border-rose-200 dark:border-rose-800',
    svgType: 'sakura',
  },
  {
    id: 'jasmine',
    name: 'Melati Putih',
    budLabel: 'Kuncup Melati',
    bloomTitle: 'Melati Ketulusan',
    promise: 'Terima kasih sebesar-besarnya sudah bertahan dan sabar menghadapi aku yang kadang kaku dan kurang ekspresif ini.',
    colorName: 'text-emerald-500',
    accentBg: 'bg-emerald-50/70 dark:bg-emerald-950/50',
    accentBorder: 'border-emerald-200 dark:border-emerald-800',
    svgType: 'jasmine',
  },
  {
    id: 'sunflower',
    name: 'Bunga Matahari',
    budLabel: 'Kuncup Matahari',
    bloomTitle: 'Matahari Kesetiaan',
    promise: 'Kaya bunga matahari yang selalu menghadap cahaya yang hangat, mataku dan hatiku akan selalu terarah padamu, Nila.',
    colorName: 'text-amber-500',
    accentBg: 'bg-amber-50/70 dark:bg-amber-950/50',
    accentBorder: 'border-amber-200 dark:border-amber-800',
    svgType: 'sunflower',
  },
];

export const InteractiveFlowers: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const [bloomed, setBloomed] = useState<Record<string, boolean>>({});
  const [selectedFlower, setSelectedFlower] = useState<FlowerItem | null>(null);

  const toggleBloom = (flower: FlowerItem, index: number) => {
    const isAlreadyBloomed = bloomed[flower.id];
    if (!isAlreadyBloomed) {
      romanticAudio.playFlowerBloom(index);
    }
    setBloomed((prev) => ({
      ...prev,
      [flower.id]: true,
    }));
    setSelectedFlower(flower);
  };

  const bloomedCount = Object.values(bloomed).filter(Boolean).length;
  const allBloomed = bloomedCount === flowerData.length;

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 text-rose-500 font-handwriting text-2xl font-bold tracking-wide mb-1">
          <Sparkles className="h-5 w-5" />
          <span>Taman Bunga Interaktif</span>
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 dark:text-rose-100">
          Sentuh Kuncup Bunga untuk Memekarkannya
        </h2>
        <p className="mt-2 text-sm sm:text-base text-rose-800/80 dark:text-rose-200/80 max-w-lg mx-auto font-sans">
          Tiap bunga yang mekar menyimpan satu janji kecil dan rasa sayang khusus buat Nila 🌷
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-100/80 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800/60">
          <span>Bunga mekar:</span>
          <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
            {bloomedCount} / {flowerData.length}
          </span>
          {allBloomed && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {flowerData.map((f, idx) => {
          const isMekar = bloomed[f.id];
          const isSelected = selectedFlower?.id === f.id;

          return (
            <button
              key={f.id}
              onClick={() => toggleBloom(f, idx)}
              className={`group flex flex-col items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer min-h-[140px] ${
                isSelected
                  ? 'ring-2 ring-rose-400 dark:ring-rose-500 scale-[1.02] shadow-lg'
                  : 'hover:scale-[1.02] shadow-xs hover:shadow-md'
              } ${
                isMekar
                  ? f.accentBg + ' ' + f.accentBorder
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-rose-300'
                  : 'bg-white/80 border-rose-100 text-rose-900'
              }`}
              aria-label={`${f.name}, status: ${isMekar ? 'Sudah Mekar' : 'Masih Kuncup'}`}
            >
              <div className="relative h-16 w-16 flex items-center justify-center">
                {f.svgType === 'rose' && (
                  <svg
                    viewBox="0 0 64 64"
                    className={`h-14 w-14 transition-transform duration-500 ${
                      isMekar ? 'scale-110 rotate-3' : 'scale-90 opacity-75'
                    }`}
                  >
                    <path
                      d="M32 40 Q32 58 32 60"
                      stroke="#4ade80"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M32 48 Q22 44 20 48 Q26 52 32 50"
                      fill="#22c55e"
                    />
                    <path
                      d="M32 52 Q42 48 44 52 Q38 56 32 54"
                      fill="#22c55e"
                    />
                    {isMekar ? (
                      <g className="animate-pulse-soft">
                        <circle cx="32" cy="28" r="14" fill="#f43f5e" />
                        <ellipse cx="26" cy="24" rx="9" ry="11" fill="#fb7185" />
                        <ellipse cx="38" cy="24" rx="9" ry="11" fill="#fb7185" />
                        <circle cx="32" cy="26" r="8" fill="#e11d48" />
                        <ellipse cx="32" cy="24" rx="5" ry="6" fill="#be123c" />
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M32 40 C24 38 24 24 32 18 C40 24 40 38 32 40 Z"
                          fill="#e11d48"
                        />
                        <path
                          d="M32 40 C28 36 27 28 32 24 C37 28 36 36 32 40 Z"
                          fill="#f43f5e"
                        />
                        <path
                          d="M26 38 Q32 42 38 38 Q32 44 26 38"
                          fill="#16a34a"
                        />
                      </g>
                    )}
                  </svg>
                )}

                {f.svgType === 'tulip' && (
                  <svg
                    viewBox="0 0 64 64"
                    className={`h-14 w-14 transition-transform duration-500 ${
                      isMekar ? 'scale-110' : 'scale-90 opacity-75'
                    }`}
                  >
                    <path
                      d="M32 42 Q32 58 32 60"
                      stroke="#4ade80"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M32 50 Q20 46 18 52 Q26 56 32 52"
                      fill="#16a34a"
                    />
                    {isMekar ? (
                      <g>
                        <path
                          d="M32 42 C16 38 14 20 22 16 C28 26 30 36 32 42 Z"
                          fill="#f472b6"
                        />
                        <path
                          d="M32 42 C48 38 50 20 42 16 C36 26 34 36 32 42 Z"
                          fill="#f472b6"
                        />
                        <path
                          d="M32 42 C24 36 24 16 32 14 C40 16 40 36 32 42 Z"
                          fill="#ec4899"
                        />
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M32 42 C22 38 22 24 32 18 C42 24 42 38 32 42 Z"
                          fill="#ec4899"
                        />
                      </g>
                    )}
                  </svg>
                )}

                {f.svgType === 'sakura' && (
                  <svg
                    viewBox="0 0 64 64"
                    className={`h-14 w-14 transition-transform duration-500 ${
                      isMekar ? 'scale-110 rotate-6' : 'scale-90 opacity-75'
                    }`}
                  >
                    <path
                      d="M32 44 Q32 58 32 60"
                      stroke="#78350f"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {isMekar ? (
                      <g>
                        <circle cx="32" cy="18" r="8" fill="#fda4af" />
                        <circle cx="43" cy="26" r="8" fill="#fda4af" />
                        <circle cx="39" cy="38" r="8" fill="#fda4af" />
                        <circle cx="25" cy="38" r="8" fill="#fda4af" />
                        <circle cx="21" cy="26" r="8" fill="#fda4af" />
                        <circle cx="32" cy="28" r="6" fill="#fb7185" />
                        <circle cx="32" cy="28" r="3" fill="#f43f5e" />
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M32 42 C24 38 25 24 32 20 C39 24 40 38 32 42 Z"
                          fill="#fda4af"
                        />
                        <circle cx="32" cy="30" r="4" fill="#fb7185" />
                      </g>
                    )}
                  </svg>
                )}

                {f.svgType === 'jasmine' && (
                  <svg
                    viewBox="0 0 64 64"
                    className={`h-14 w-14 transition-transform duration-500 ${
                      isMekar ? 'scale-110' : 'scale-90 opacity-75'
                    }`}
                  >
                    <path
                      d="M32 44 Q32 58 32 60"
                      stroke="#22c55e"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {isMekar ? (
                      <g>
                        <ellipse cx="32" cy="18" rx="6" ry="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                        <ellipse cx="44" cy="28" rx="10" ry="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                        <ellipse cx="32" cy="38" rx="6" ry="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                        <ellipse cx="20" cy="28" rx="10" ry="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                        <circle cx="32" cy="28" r="4.5" fill="#fef08a" />
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M32 42 C26 36 28 26 32 22 C36 26 38 36 32 42 Z"
                          fill="#f8fafc"
                          stroke="#cbd5e1"
                          strokeWidth="1"
                        />
                        <path d="M28 42 Q32 46 36 42 Q32 48 28 42" fill="#16a34a" />
                      </g>
                    )}
                  </svg>
                )}

                {f.svgType === 'sunflower' && (
                  <svg
                    viewBox="0 0 64 64"
                    className={`h-14 w-14 transition-transform duration-500 ${
                      isMekar ? 'scale-110 rotate-12' : 'scale-90 opacity-75'
                    }`}
                  >
                    <path
                      d="M32 44 Q32 58 32 60"
                      stroke="#16a34a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {isMekar ? (
                      <g>
                        <circle cx="32" cy="28" r="15" fill="#facc15" />
                        <circle cx="32" cy="28" r="12" fill="#eab308" />
                        <circle cx="32" cy="28" r="7.5" fill="#78350f" />
                        <circle cx="32" cy="28" r="5" fill="#451a03" />
                      </g>
                    ) : (
                      <g>
                        <circle cx="32" cy="30" r="10" fill="#15803d" />
                        <circle cx="32" cy="30" r="6" fill="#facc15" />
                      </g>
                    )}
                  </svg>
                )}
              </div>

              <div className="text-center mt-2">
                <span className="block text-xs font-semibold text-rose-950 dark:text-rose-100">
                  {f.name}
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wide ${
                    isMekar ? f.colorName : 'opacity-60'
                  }`}
                >
                  {isMekar ? 'Mekar 💖' : 'Sentuh aku ✨'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedFlower && (
        <div
          className={`rounded-2xl p-6 border transition-all duration-300 animate-fadeIn ${
            selectedFlower.accentBg
          } ${selectedFlower.accentBorder} shadow-md`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl" role="img" aria-hidden="true">
              {selectedFlower.svgType === 'rose'
                ? '🌹'
                : selectedFlower.svgType === 'tulip'
                ? '🌷'
                : selectedFlower.svgType === 'sakura'
                ? '🌸'
                : selectedFlower.svgType === 'jasmine'
                ? '🌼'
                : '🌻'}
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-rose-950 dark:text-rose-100">
                {selectedFlower.bloomTitle}
              </h3>
              <p className="text-xs text-rose-700/80 dark:text-rose-300/80">
                Janji setia &amp; rasa sayang untuk Nila Uzlifatul Fikri Sa’adah
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-rose-900/90 dark:text-rose-100/90 leading-relaxed font-sans mt-3 pl-3 border-l-2 border-rose-400 dark:border-rose-500 italic">
            “{selectedFlower.promise}”
          </p>
        </div>
      )}

      {allBloomed && (
        <div className="mt-6 text-center p-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white shadow-lg animate-pulse-soft">
          <p className="font-handwriting text-2xl font-bold">
            Semua bunga sudah mekar seutuhnya! 🌸✨
          </p>
          <p className="text-xs sm:text-sm text-rose-100 mt-1">
            Sama seperti cintaku yang akan selalu mekar dan ada buat Nila.
          </p>
        </div>
      )}
    </section>
  );
};
