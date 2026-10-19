import React, { useEffect, useRef, useState } from 'react';
import { Search, X, MapPin, LoaderCircle, Navigation, Flag } from 'lucide-react';
import { usePlanner } from '../usePlanner';

// Stop search on the map. Picking a stop flies to it and opens a card with the buses that stop there and
// shortcuts into the trip planner. The stop network loads when the search is first focused.

function LineBadge({ line, onClick }) {
  return (
    <button
      onClick={onClick}
      title={`${line.operator}: show ${line.label} on the map`}
      className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold text-white cursor-pointer hover:brightness-110 hover:ring-2 hover:ring-offset-1 hover:ring-slate-300 dark:hover:ring-offset-slate-900"
      style={{ backgroundColor: line.color }}
    >
      {line.label}
    </button>
  );
}

export default function MapSearchBar({ selected, onSelectStop, onClear, onDirectionsFrom, onDirectionsTo, onShowLine }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [wantsPlanner, setWantsPlanner] = useState(false);
  const planner = usePlanner(wantsPlanner);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim();
  const results = planner && trimmed ? planner.searchStations(trimmed, 8) : [];

  useEffect(() => setHighlight(0), [trimmed]);

  const choose = (station) => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
    onSelectStop(station, planner.linesAtStop(station));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (results.length > 0 && e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (results.length > 0 && e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (results.length > 0 && e.key === 'Enter') {
      e.preventDefault();
      choose(results[highlight]);
    }
  };

  return (
    <div ref={containerRef} className="absolute top-3 left-3 right-3 sm:right-auto sm:top-4 sm:left-4 sm:w-96 z-[1000] font-['Inter']">
      <div className="flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800 focus-within:border-slate-400 dark:focus-within:border-slate-600">
        <Search className="w-4 h-4 ml-3.5 mr-2 text-slate-400 shrink-0" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          role="combobox"
          aria-expanded={isOpen && results.length > 0}
          aria-controls="map-stop-search-results"
          aria-label="Search bus stops"
          placeholder="Search bus stops…"
          onFocus={() => {
            setWantsPlanner(true);
            if (trimmed) setIsOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="w-full py-2.5 sm:py-3 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {wantsPlanner && !planner && trimmed && <LoaderCircle className="w-4 h-4 mr-3 text-slate-400 animate-spin shrink-0" />}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="p-2 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && planner && trimmed && (
        <ul
          id="map-stop-search-results"
          role="listbox"
          className="mt-1.5 max-h-72 overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800"
        >
          {results.length > 0 ? (
            results.map((st, i) => {
              const stopLines = planner.linesAtStop(st);
              return (
                <li key={st.index} role="option" aria-selected={i === highlight}>
                  <button
                    onClick={() => choose(st)}
                    onMouseEnter={() => setHighlight(i)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 cursor-pointer ${i === highlight ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                  >
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{st.name}</span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {stopLines.length} bus route{stopLines.length === 1 ? '' : 's'}: {stopLines.map((l) => l.label).join(', ')}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })
          ) : (
            <li className="p-4 text-center text-xs text-slate-500">No stop on the map matches "{trimmed}".</li>
          )}
        </ul>
      )}

      {selected && !isOpen && (
        <div className="mt-1.5 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-['Outfit'] font-bold text-sm truncate">{selected.station.name}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {selected.lines.length} bus route{selected.lines.length === 1 ? '' : 's'} stop here · tap one to see it
              </div>
            </div>
            <button onClick={onClear} aria-label="Close stop details" className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {selected.lines.map((line) => (
              <LineBadge key={line.svgId} line={line} onClick={() => onShowLine(line)} />
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onDirectionsFrom(selected.station)}
              className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" /> Directions from here
            </button>
            <button
              onClick={() => onDirectionsTo(selected.station)}
              className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 text-xs font-semibold hover:opacity-90 cursor-pointer"
            >
              <Flag className="w-3.5 h-3.5" /> Directions to here
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
