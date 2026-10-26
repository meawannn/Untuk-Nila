import React, { useState, useRef, useEffect, useCallback } from 'react';
import { romanticAudio } from '../utils/audio';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'petal' | 'star';
  opacity: number;
}

const funnyTexts = [
  'Nggak',
  'Yakin nih? 🥺',
  'Coba pikir-pikir lagi dong...',
  'Masa tega sih sama pacar sendiri? 😿',
  'Nanti aku beliin es krim & matcha lho 🍦🍵',
  'Tombol ini lagi ngambek juga lho 🏃💨',
  'Eits nggak kena! Wleee 😜',
  'Ayo dong, pencet tombol yang pink aja 🥺💖',
  'Tombol ini sudah lelah kabur, klik sebelah ya! 💕',
];

export const QuestionSection: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCelebrated, setIsCelebrated] = useState<boolean>(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastDodgeTime = useRef<number>(0);

  const handleDodge = useCallback((e?: React.SyntheticEvent) => {
    const now = Date.now();
    // Debounce to prevent duplicate trigger on mobile touchstart + click
    if (now - lastDodgeTime.current < 150) return;
    lastDodgeTime.current = now;

    if (e && e.type === 'touchstart') {
      e.preventDefault();
    }

    romanticAudio.playDodgeSound();

    setDodgeCount((prev) => {
      const nextCount = prev + 1;
      const maxOffset = Math.min(130, 40 + nextCount * 14);
      const randomX = (Math.random() - 0.5) * maxOffset * 2;
      const randomY = (Math.random() - 0.5) * maxOffset * 1.5;
      setNoPos({ x: randomX, y: randomY });
      return nextCount;
    });
  }, []);

  const handleForgive = () => {
    romanticAudio.playCelebration();
    setIsCelebrated(true);
    setShowCelebrationModal(true);
  };

  useEffect(() => {
    if (!isCelebrated) return;

    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#fbbf24', '#34d399', '#c084fc'];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 90; i++) {
      pieces.push({
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 100,
        size: Math.random() * 12 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: (Math.random() - 0.7) * 14,
        speedX: (Math.random() - 0.5) * 16,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        type: Math.random() > 0.4 ? 'heart' : 'petal',
        opacity: 1,
      });
    }

    let animId: number;
    const gravity = 0.35;
    const drag = 0.985;

    const drawPiece = (p: ConfettiPiece) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.type === 'heart') {
        const s = p.size * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.3, 0, s * 1.1);
        ctx.bezierCurveTo(s * 1.2, s * 0.3, s, -s * 0.6, 0, s * 0.3);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.7, p.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      for (const p of pieces) {
        p.speedX *= drag;
        p.speedY += gravity;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, p.opacity - 0.005);

        if (p.opacity > 0 && p.y < height + 50) {
          alive = true;
          drawPiece(p);
        }
      }

      if (alive) {
        animId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isCelebrated]);

  const currentNoText = funnyTexts[Math.min(dodgeCount, funnyTexts.length - 1)];
  const noScale = Math.max(0.45, 1 - dodgeCount * 0.08);
  const yesScale = Math.min(1.5, 1 + dodgeCount * 0.1);

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto text-center" ref={containerRef}>
      {isCelebrated && (
        <canvas
          ref={confettiCanvasRef}
          className="fixed inset-0 pointer-events-none z-50 h-full w-full"
        />
      )}

      <div className="inline-flex items-center gap-1.5 text-rose-500 font-handwriting text-2xl font-bold tracking-wide mb-1">
        <Sparkles className="h-5 w-5" />
        <span>Pertanyaan Terpenting</span>
        <Sparkles className="h-5 w-5" />
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-rose-950 dark:text-rose-100 tracking-tight leading-snug">
        Nila, maafin aku ya? 🥺
      </h2>

      <p className="mt-3 text-sm sm:text-base text-rose-800/80 dark:text-rose-200/80 max-w-md mx-auto font-sans">
        Aku berjanji bakal belajar lebih peka, lebih ada, dan nggak membiarkan kesibukan merebut senyum manismu lagi.
      </p>

      <div className="relative mt-12 min-h-[170px] flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
        {/* Tombol IYA */}
        <button
          onClick={handleForgive}
          style={{ transform: `scale(${yesScale})` }}
          className="cursor-pointer group relative flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white shadow-xl transition-transform duration-300 ease-out bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800 active:scale-95"
          aria-label="Iya, dimaafin"
        >
          <Heart className="h-5 w-5 fill-current animate-pulse text-white" />
          <span className="text-base sm:text-lg whitespace-nowrap">Iya, dimaafin 💖</span>
        </button>

        {/* Tombol NGGA */}
        <div
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`,
            transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          className="inline-block"
        >
          <button
            onMouseEnter={handleDodge}
            onTouchStart={handleDodge}
            onClick={handleDodge}
            className={`cursor-pointer px-5 py-3 rounded-full text-sm font-semibold transition-colors duration-200 shadow-md ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-rose-200 border border-slate-700'
                : 'bg-white hover:bg-rose-50 text-rose-900 border border-rose-200'
            }`}
            aria-label={`Tombol Nggak: ${currentNoText}`}
          >
            <span>{currentNoText}</span>
          </button>
        </div>
      </div>

      {dodgeCount > 0 && !isCelebrated && (
        <p className="mt-4 text-xs font-medium text-rose-500 dark:text-rose-400 font-handwriting text-lg animate-fadeIn">
          {dodgeCount >= 3 ? 'Tombol “Iya” sengaja dibesarin biar gampang diklik Nila lho 🙈' : 'Tombolnya pemalu, nggak mau diklik hehe 🏃'}
        </p>
      )}

      {/* Celebration Modal Overlay */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-fadeIn">
          <div
            className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 text-center shadow-2xl border transition-all ${
              isDark
                ? 'bg-gradient-to-b from-rose-950 to-slate-950 border-rose-800 text-rose-100'
                : 'bg-gradient-to-b from-rose-50 via-white to-pink-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 mb-4 animate-bounce">
              <PartyPopper className="h-8 w-8" />
            </div>

            <span className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-500 block mb-1">
              Alhamdulillah! 🎉
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-rose-950 dark:text-rose-100 mb-3">
              Terima kasih sudah sabar, Nila 🌷
            </h3>

            <p className="text-sm sm:text-base text-rose-900/90 dark:text-rose-200/90 leading-relaxed font-sans mb-6">
              Maaf ya untuk hari-hari kemarin yang sempat bikin kamu merasa kurang disayang. Janji ini bukan sekadar kata-kata manis di layar kaca, tapi komitmen nyata untuk selalu ada, mengabari lebih dulu, dan menjadikanmu prioritas utama.
            </p>

            <div className={`rounded-2xl p-4 text-xs sm:text-sm font-medium mb-6 ${
              isDark ? 'bg-rose-900/40 border border-rose-800/50 text-rose-200' : 'bg-rose-100/70 border border-rose-200 text-rose-900'
            }`}>
              Bonus pelukan hangat + traktiran makan berdua tanpa gangguan urusan kerjaan segera dicairkan begitu kita ketemu! 🥰✨
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowCelebrationModal(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="h-4 w-4 fill-current" />
                <span>Aku Juga Sayang Kamu 💕</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
