import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Maximize, Minimize, BookOpen, Sun, Moon, Share2, Check, Navigation } from 'lucide-react';
import OfflineButton from './OfflineButton';

export default function Controls({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleLegend,
  isLegendOpen,
  onToggleTrip,
  isTripOpen,
  theme,
  onToggleTheme,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    if (!isLinkCopied) return;
    const timer = setTimeout(() => setIsLinkCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isLinkCopied]);

  // The URL always reflects the selected route & place (see shareLink.js), so share it as-is
  const shareCurrentView = async () => {
    const url = window.location.href;
    const isTouchDevice = window.matchMedia?.('(pointer: coarse)').matches;
    if (navigator.share && isTouchDevice) {
      navigator.share({ title: document.title, url }).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setIsLinkCopied(true);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="absolute bottom-8 right-3.5 sm:right-5 z-[1000] flex flex-col gap-1.5 pointer-events-auto">
      {/* Trip Planner (GPS -> nearest stop -> buses to destination) */}
      <button
        onClick={onToggleTrip}
        title="Find your bus"
        aria-label="Find your bus"
        aria-pressed={isTripOpen}
        style={{ cursor: 'pointer' }}
        className={`w-9 h-9 rounded-lg backdrop-blur-md border transition-all flex items-center justify-center shadow-md cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95 ${
          isTripOpen
            ? 'bg-sky-600 text-white border-sky-600 shadow-sky-600/30'
            : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-sky-700 dark:text-sky-300 hover:bg-white dark:hover:bg-slate-800 shadow-slate-200/60 dark:shadow-black/40'
        }`}
      >
        <Navigation className="w-4 h-4 stroke-[2.2] pointer-events-none" />
      </button>

      {/* Legend Toggle Button */}
      <button
        onClick={onToggleLegend}
        title="Bus Services & Legend"
        aria-label="Toggle legend"
        style={{ cursor: 'pointer' }}
        className={`w-9 h-9 rounded-lg backdrop-blur-md border transition-all flex items-center justify-center shadow-md cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95 ${
          isLegendOpen
            ? 'bg-slate-900 text-white border-slate-900 shadow-slate-900/30 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-500 dark:shadow-sky-500/20'
            : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 shadow-slate-200/60 dark:shadow-black/40'
        }`}
      >
        <BookOpen className="w-4 h-4 stroke-[2.2] pointer-events-none" />
      </button>

      {/* Dark / Light Mode Toggle Button */}
      <button
        onClick={onToggleTheme}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        style={{ cursor: 'pointer' }}
        className="w-9 h-9 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:text-slate-900 dark:hover:text-amber-300 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 dark:shadow-black/40 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
      >
        {isDark ? (
          <Sun className="w-4 h-4 stroke-[2.2] pointer-events-none text-amber-400 animate-in spin-in-180 duration-300" />
        ) : (
          <Moon className="w-4 h-4 stroke-[2.2] pointer-events-none text-slate-700 animate-in spin-in-180 duration-300" />
        )}
      </button>

      {/* Share Link */}
      <button
        onClick={shareCurrentView}
        title={isLinkCopied ? 'Link copied' : 'Share link to this view'}
        aria-label="Share link to this view"
        style={{ cursor: 'pointer' }}
        className="w-9 h-9 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 dark:shadow-black/40 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
      >
        {isLinkCopied ? (
          <Check className="w-4 h-4 stroke-[2.6] pointer-events-none text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Share2 className="w-4 h-4 stroke-[2.2] pointer-events-none" />
        )}
      </button>

      {/* Save Map Offline */}
      <OfflineButton />

      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        title="Zoom In"
        aria-label="Zoom in"
        style={{ cursor: 'pointer' }}
        className="w-9 h-9 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 dark:shadow-black/40 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
      >
        <Plus className="w-4 h-4 stroke-[2.2] pointer-events-none" />
      </button>

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        title="Zoom Out"
        aria-label="Zoom out"
        style={{ cursor: 'pointer' }}
        className="w-9 h-9 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 dark:shadow-black/40 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
      >
        <Minus className="w-4 h-4 stroke-[2.2] pointer-events-none" />
      </button>

      {/* Reset View */}
      <button
        onClick={onResetView}
        title="Reset Map View"
        aria-label="Reset map view"
        style={{ cursor: 'pointer' }}
        className="w-9 h-9 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 dark:shadow-black/40 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
      >
        <RotateCcw className="w-4 h-4 stroke-[2.2] pointer-events-none" />
      </button>

      {/* Fullscreen */}
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        aria-label="Toggle fullscreen"
        style={{ cursor: 'pointer' }}
        className="w-9 h-9 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 dark:shadow-black/40 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
      >
        {isFullscreen ? (
          <Minimize className="w-4 h-4 stroke-[2.2] pointer-events-none" />
        ) : (
          <Maximize className="w-4 h-4 stroke-[2.2] pointer-events-none" />
        )}
      </button>
    </div>
  );
}

