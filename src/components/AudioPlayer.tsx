import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const AudioPlayer: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthStopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (synthStopRef.current) {
        synthStopRef.current();
      }
    };
  }, []);

  const togglePlay = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthStopRef.current) {
        synthStopRef.current();
        synthStopRef.current = null;
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          if (synthStopRef.current) synthStopRef.current();
          synthStopRef.current = romanticAudio.startAmbientLoop();
          setIsPlaying(true);
        }
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    romanticAudio.setMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    if (nextMuted && synthStopRef.current) {
      synthStopRef.current();
      synthStopRef.current = null;
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* 
        Elemen audio memutar lagu Seribu Bulan (Sejuta Malam) - Kahitna
      */}
      <audio
        ref={audioRef}
        src="/assets/aistudio/Seribu_Bulan_Sejuta_Malam___Kahitna_01658648.m4a"
        preload="metadata"
        loop
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/assets/aistudio/Seribu_Bulan_Sejuta_Malam___Kahitna_01658648.m4a" type="audio/mp4" />
        <source src="/seribu-bulan.mp3" type="audio/mpeg" />
      </audio>

      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-md transition-all duration-300 border ${
          isDark
            ? 'bg-rose-950/85 border-rose-800/60 text-rose-100 shadow-rose-950/40'
            : 'bg-white/90 border-rose-200/80 text-rose-950 shadow-rose-200/50'
        }`}
      >
        <button
          onClick={togglePlay}
          className="group flex items-center gap-2.5 focus:outline-none cursor-pointer"
          aria-label={isPlaying ? 'Jeda lagu' : 'Putar lagu Seribu Bulan - Kahitna'}
          title={isPlaying ? 'Klik untuk jeda musik' : 'Ketuk untuk memutar lagu kita 🎶'}
        >
          <div
            className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-transform duration-500 shrink-0 ${
              isPlaying ? 'animate-spin-slow shadow-md' : 'group-hover:scale-105'
            } ${
              isDark
                ? 'bg-gradient-to-tr from-slate-900 via-rose-950 to-slate-900 border border-rose-500/30'
                : 'bg-gradient-to-tr from-slate-800 via-rose-900 to-slate-900 border border-rose-300'
            }`}
          >
            <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none"></div>
            <div className="absolute inset-2 rounded-full border border-white/15 pointer-events-none"></div>
            <div className="flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center rounded-full bg-rose-500 text-[8px] text-white">
              <div className="h-1 w-1 rounded-full bg-black"></div>
            </div>
          </div>

          <div className="text-left pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold tracking-tight whitespace-nowrap">Seribu Bulan</span>
              {isPlaying && (
                <span className="inline-flex items-center gap-0.5" aria-hidden="true">
                  <span className="h-2 w-0.5 animate-pulse bg-rose-500"></span>
                  <span className="h-3 w-0.5 animate-pulse bg-rose-500 delay-75"></span>
                  <span className="h-1.5 w-0.5 animate-pulse bg-rose-500 delay-150"></span>
                </span>
              )}
            </div>
            <p className="text-[10px] opacity-75 whitespace-nowrap">
              {isPlaying ? 'Kahitna' : 'Ketuk untuk memutar lagu kita 🎶'}
            </p>
          </div>
        </button>

        <button
          onClick={toggleMute}
          className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-colors cursor-pointer shrink-0 ${
            isDark ? 'hover:bg-rose-900/50 text-rose-300' : 'hover:bg-rose-100 text-rose-600'
          }`}
          aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </>
  );
};
