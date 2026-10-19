import React, { useEffect, useRef, useState } from 'react';
import { CloudDownload, Check, WifiOff, X, MonitorSmartphone } from 'lucide-react';
import { useOfflineMap, useInstallPrompt } from '../offline';

const BUTTON_CLASS =
  'relative w-9 h-9 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 dark:shadow-black/40 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95';

const formatMB = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

function ProgressRing({ progress }) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r={radius} fill="none" strokeWidth="2.5" className="stroke-slate-200 dark:stroke-slate-700" />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        className="stroke-sky-500 transition-[stroke-dashoffset] duration-200"
      />
    </svg>
  );
}

export default function OfflineButton() {
  const { status, progress, error, totalBytes, isOnline, download } = useOfflineMap();
  const { canInstall, showIOSHint, install } = useInstallPrompt();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isPanelOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsPanelOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen]);

  if (status === 'unsupported' || status === 'checking') return null;

  const percent = Math.floor(progress * 100);
  const remainingBytes = totalBytes * (1 - progress);
  const title =
    status === 'ready'
      ? 'Map saved for offline use'
      : status === 'downloading'
      ? `Saving map offline… ${percent}%`
      : 'Save map for offline use';

  return (
    <>
      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed bottom-8 left-3 sm:left-4 z-[1000] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 text-white text-[11px] font-medium shadow-lg border border-slate-800 pointer-events-none">
          <WifiOff className="w-3.5 h-3.5 text-amber-400" />
          <span>{status === 'ready' ? 'Offline · full map saved' : 'Offline · only viewed areas available'}</span>
        </div>
      )}

      <div ref={containerRef} className="relative">
        <button
          onClick={() => setIsPanelOpen((open) => !open)}
          title={title}
          aria-label={title}
          aria-expanded={isPanelOpen}
          style={{ cursor: 'pointer' }}
          className={BUTTON_CLASS}
        >
          {status === 'downloading' && <ProgressRing progress={progress} />}
          {status === 'ready' ? (
            <Check className="w-4 h-4 stroke-[2.6] pointer-events-none text-emerald-600 dark:text-emerald-400" />
          ) : (
            <CloudDownload className="w-4 h-4 stroke-[2.2] pointer-events-none" />
          )}
        </button>

        {isPanelOpen && (
          <div className="absolute right-11 top-0 w-60 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-xs text-slate-700 dark:text-slate-200 font-['Inter'] animate-in fade-in slide-in-from-right-1 duration-150">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="font-['Outfit'] font-bold text-sm text-slate-900 dark:text-white">
                {status === 'ready' ? 'Map saved offline' : 'Save map offline'}
              </span>
              <button
                onClick={() => setIsPanelOpen(false)}
                aria-label="Close"
                className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === 'ready' && (
              <p className="text-slate-500 dark:text-slate-400">
                The full map ({formatMB(totalBytes)}) works without internet, at every zoom level.
              </p>
            )}

            {status === 'downloading' && (
              <>
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                  Saving… {percent}% ({formatMB(totalBytes * progress)} of {formatMB(totalBytes)})
                </p>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-sky-500 transition-[width] duration-200" style={{ width: `${percent}%` }} />
                </div>
              </>
            )}

            {(status === 'idle' || status === 'error') && (
              <>
                <p className="text-slate-500 dark:text-slate-400 mb-2.5">
                  {progress > 0
                    ? `Downloads the remaining ${formatMB(remainingBytes)} so the whole map works without internet.`
                    : `Downloads ${formatMB(totalBytes)} so the whole map works without internet.`}
                </p>
                {status === 'error' && (
                  <p className="text-rose-600 dark:text-rose-400 mb-2.5">{error}. Try again to resume.</p>
                )}
                <button
                  onClick={download}
                  disabled={!isOnline}
                  className="w-full py-1.5 rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 font-semibold cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {!isOnline ? 'Connect to the internet to save' : status === 'error' ? 'Retry' : 'Save map'}
                </button>
              </>
            )}

            {(canInstall || showIOSHint) && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                {canInstall ? (
                  <button
                    onClick={install}
                    className="w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <MonitorSmartphone className="w-3.5 h-3.5" />
                    Install as app
                  </button>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">
                    Install as app: tap <span className="font-semibold">Share</span>, then{' '}
                    <span className="font-semibold">Add to Home Screen</span>.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
