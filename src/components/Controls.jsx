import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Maximize, Minimize, BookOpen, Sun, Moon } from 'lucide-react';

export default function Controls({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleLegend,
  isLegendOpen,
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

