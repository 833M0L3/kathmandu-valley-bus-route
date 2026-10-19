import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X, MapPin, Navigation, Flag, Info } from 'lucide-react';

// Card shown where the map was tapped: the stop there (start / go here) and every line under the finger.
// Bundled lines sit a few pixels apart, so instead of guessing one line, list them all nearest first;
// hovering a row previews just that line.

const CARD_WIDTH = 288;
const GAP = 12;

const routeEnds = (line) => line.name.split(':').slice(1).join(':').trim() || line.operator;

export default function LineChooser({ info, tripMode, onSelectLine, onPreview, onStart, onGo, onStopDetails, onClose }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ left: info.screen.x + GAP, top: info.screen.y + GAP });

  // Keep the card inside the viewport: prefer below-right of the tap, flip when it would overflow
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const { innerWidth: w, innerHeight: h } = window;
    const { offsetWidth: cw, offsetHeight: ch } = card;
    let left = info.screen.x + GAP;
    let top = info.screen.y + GAP;
    if (left + cw > w - 8) left = Math.max(8, info.screen.x - GAP - cw);
    if (top + ch > h - 32) top = Math.max(8, info.screen.y - GAP - ch);
    setPosition({ left: Math.min(left, w - cw - 8), top });
  }, [info]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const { stop, lines } = info;
  const showLines = !tripMode && lines.length > 0;

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-label={stop ? `${stop.name}: buses and directions` : 'Bus lines here'}
      style={{ left: position.left, top: position.top, width: `min(${CARD_WIDTH}px, calc(100vw - 16px))` }}
      className="fixed z-[1150] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl font-['Inter'] text-slate-800 dark:text-slate-100 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2 px-3 pt-2.5 pb-2">
        <div className="min-w-0">
          {stop ? (
            <>
              <div className="flex items-center gap-1.5 font-['Outfit'] font-bold text-sm">
                <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="truncate">{stop.name}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {info.stopLines.length} bus route{info.stopLines.length === 1 ? '' : 's'} stop here
              </div>
            </>
          ) : (
            <div className="font-['Outfit'] font-bold text-sm">
              {lines.length === 1 ? 'Bus line here' : `${lines.length} bus lines here`}
            </div>
          )}
        </div>
        <button onClick={onClose} aria-label="Close" className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>

      {stop && (
        <div className="px-3 pb-2.5 grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onStart(stop)}
            className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-600" /> {tripMode ? 'Set as start' : 'Start here'}
          </button>
          <button
            onClick={() => onGo(stop)}
            className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 text-xs font-semibold hover:opacity-90 cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" /> {tripMode ? 'Set as destination' : 'Go here'}
          </button>
          {!tripMode && (
            <button
              onClick={() => onStopDetails(stop)}
              className="col-span-2 flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              <Info className="w-3 h-3" /> All buses at this stop
            </button>
          )}
        </div>
      )}

      {showLines && (
        <>
          {stop && <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 border-t border-slate-100 dark:border-slate-800">Lines at this spot</div>}
          <ul className="max-h-64 overflow-y-auto pb-1" onMouseLeave={() => onPreview(null)} aria-label="Bus lines here">
            {lines.map(({ line, stopsHere }) => (
              <li key={line.svgId}>
                <button
                  onClick={() => onSelectLine(line)}
                  onMouseEnter={() => onPreview(line)}
                  onFocus={() => onPreview(line)}
                  className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 focus:outline-none cursor-pointer"
                >
                  <span
                    className="inline-flex items-center justify-center min-w-[2.25rem] px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold text-white shrink-0"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.label}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium truncate">{routeEnds(line)}</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {line.operator}
                      {stop && (stopsHere ? ` · stops at ${stop.name}` : ` · passes without stopping`)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
