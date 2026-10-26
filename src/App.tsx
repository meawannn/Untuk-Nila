/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PetalBackground } from './components/PetalBackground';
import { AudioPlayer } from './components/AudioPlayer';
import { LetterEnvelope } from './components/LetterEnvelope';
import { ApologyCards } from './components/ApologyCards';
import { InteractiveFlowers } from './components/InteractiveFlowers';
import { QuestionSection } from './components/QuestionSection';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollToConfession = () => {
    const el = document.getElementById('pengakuan-tulus');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 font-sans ${
        isDark
          ? 'bg-gradient-to-b from-[#160d13] via-[#24131d] to-[#1a0f16] text-rose-100'
          : 'bg-gradient-to-b from-[#fff6f6] via-[#ffeef1] to-[#fff0f4] text-rose-950'
      }`}
    >
      {/* Background Falling Petals & Floating Hearts */}
      <PetalBackground isDark={isDark} enabled={true} />

      {/* Floating Header Controls */}
      <header className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        {/* Left Side: Theme Switcher */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 cursor-pointer ${
              isDark
                ? 'bg-rose-950/80 border-rose-800/60 text-amber-300 hover:bg-rose-900/80'
                : 'bg-white/90 border-rose-200/80 text-rose-600 hover:bg-rose-50'
            }`}
            aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Right Side: Floating Audio Player ("Seribu Bulan" - Kahitna) */}
        <div className="pointer-events-auto">
          <AudioPlayer isDark={isDark} />
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-16 pb-24">

        {/* 1. BAGIAN PEMBUKA: Surat & Amplop */}
        <LetterEnvelope isDark={isDark} onOpenLetter={scrollToConfession} />

        {/* 2. BAGIAN PENGAKUAN: Pesan Singkat & Tulus */}
        <section
          id="pengakuan-tulus"
          className="py-12 px-4 scroll-mt-20 max-w-2xl mx-auto text-left"
        >
          <div
            className={`rounded-3xl p-6 sm:p-10 border shadow-xl backdrop-blur-md transition-all duration-300 ${
              isDark
                ? 'bg-rose-950/40 border-rose-800/50 text-rose-100 shadow-rose-950/50'
                : 'bg-white/80 border-rose-200/70 text-rose-950 shadow-rose-200/40'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-500 font-handwriting text-2xl font-bold tracking-wide mb-1">
              <Sparkles className="h-5 w-5" />
              <span>Jujur Dari Lubuk Hati</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-rose-950 dark:text-rose-100 mb-6">
              Nila, Aku Minta Maaf ya...
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-rose-900/90 dark:text-rose-100/90 font-sans text-justify">
              <p>
                Nila sayangku, belakangan ini aku mungkin terlihat terlalu fokus sama duniaku yang padat. Jam tidur ku ga teratur, waktu bareng kamu semakin berkurang, sering slow respon, bahkan video call yang udah ga sama lagi. Aku tau kamu ngerasa sepi dan bertanya-tanya “apa aku masih dicintai nya?”
              </p>
              <p>
                Jawabannya: <strong>aku selalu mencintai kamu.</strong> Tapi aku sadar bahwa hidup bukan hanya soal cinta. Hidup terus berjalan dan aku berusaha melakukan yang terbaik untuk mengungkapkan rasa cintaku padamu dan bagaimana aku hadir didalam hari-harimu.
              </p>
              <p>
                Kesibukan itu urusanku dan sama sekali bukan alasan pembenaran. Aku tidak ingin mencari-cari alasan untuk membela diri. Maafkan aku yang tanpa sengaja membuat senyum manismu memudar dan membuat bidadari paling sabar ini merasa sendirian. Menjagamu bahagia adalah janji yang aku buat sendiri untukmu, dan kemarin-kemarin aku gagal menjalankannya dengan baik.
              </p>
            </div>

            <div
              className={`mt-6 p-4 sm:p-5 rounded-2xl border-l-4 border-rose-500 italic text-sm sm:text-base ${
                isDark ? 'bg-rose-900/30 text-rose-200' : 'bg-rose-50 text-rose-900'
              }`}
            >
              “Waktu untukmu bukan sisa-sisa waktu di ujung hari yang lelah, tapi waktu yang akan selalu aku sisihkan khusus untuk mendengar ceritamu.”
            </div>
          </div>
        </section>

        {/* 3. BAGIAN DAFTAR KESALAHAN (3D Flip Cards) */}
        <ApologyCards isDark={isDark} />

        {/* 4. BAGIAN TAMAN BUNGA INTERAKTIF (Kuncup Mekar & Janji) */}
        <InteractiveFlowers isDark={isDark} />

        {/* 5. BAGIAN PERTANYAAN UTAMA (Tombol Kabur & Perayaan) */}
        <QuestionSection isDark={isDark} />

        {/* 6. BAGIAN PENUTUP */}
        <footer className="mt-16 pt-10 border-t border-rose-200/60 dark:border-rose-800/40 text-center">
          <p className="text-sm sm:text-base text-rose-800/80 dark:text-rose-200/80 max-w-md mx-auto leading-relaxed font-sans">
            Terima kasih sudah meluangkan waktu membaca surat kecil ini sampai akhir. Maafkan segala khilaf dan kekuranganku kemarin, dan terima kasih sudah selalu memilih bertahan bersamaku.
          </p>

          {/* Sesuai instruksi tepat: Dengan huruf miring elegan */}
          <div className="mt-8 font-serif italic text-lg sm:text-xl text-rose-900 dark:text-rose-100 tracking-wide leading-relaxed">
            With Love,<br />
            Once Yours
          </div>
        </footer>
      </main>
    </div>
  );
}
