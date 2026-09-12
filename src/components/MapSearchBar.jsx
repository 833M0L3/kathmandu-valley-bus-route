import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Building, Cross, GraduationCap, Store, Bus, Compass } from 'lucide-react';
import { ALL_MAP_PLACES } from '../data/placesData';

export default function MapSearchBar({ onSelectPlace, activePlace, onClearPlace }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const results = trimmed
    ? ALL_MAP_PLACES.filter((p) => {
        if (p.name.toLowerCase().includes(trimmed)) return true;
        if (p.nepali && p.nepali.includes(trimmed)) return true;
        if (p.category && p.category.toLowerCase().includes(trimmed)) return true;
        return false;
      }).slice(0, 15) // Top 15 matching results
    : [];

  const handleSelect = (place) => {
    setQuery(place.name);
    setIsOpen(false);
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (onClearPlace) {
      onClearPlace();
    }
    inputRef.current?.focus();
  };

  const getPlaceIcon = (tier, category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('hospital')) return <Cross className="w-3.5 h-3.5 text-rose-500" />;
    if (cat.includes('campus') || cat.includes('college') || cat.includes('school'))
      return <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />;
    if (cat.includes('shopping') || cat.includes('market') || cat.includes('mart'))
      return <Store className="w-3.5 h-3.5 text-amber-500" />;
    if (cat.includes('terminal') || cat.includes('bus park') || tier === 'hub')
      return <Bus className="w-3.5 h-3.5 text-emerald-500" />;
    if (tier === 'city') return <Building className="w-3.5 h-3.5 text-blue-600" />;
    if (tier === 'peak') return <Compass className="w-3.5 h-3.5 text-amber-600" />;
    return <MapPin className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-3 left-3 right-3 sm:right-auto sm:left-4 sm:w-84 md:w-96 z-[1000] font-['Inter']"
    >
      {/* Search Input Box */}
      <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 transition-all focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100">
        <div className="pl-3.5 pr-2 text-slate-400">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search any place or stop in Kathmandu..."
          className="w-full py-2.5 sm:py-3 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />

        {query && (
          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer mr-1 rounded-lg hover:bg-slate-100"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 mt-1.5 max-h-72 sm:max-h-80 overflow-y-auto bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 divide-y divide-slate-100 no-scrollbar animate-in fade-in slide-in-from-top-1 duration-150">
          {results.length > 0 ? (
            results.map((place) => (
              <button
                key={place.id + place.x}
                onClick={() => handleSelect(place)}
                className="w-full text-left px-3.5 py-2.5 sm:py-3 hover:bg-slate-50/90 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-200/80 transition-colors">
                    {getPlaceIcon(place.tier, place.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-slate-800 font-['Outfit'] truncate">
                      {place.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                      {place.nepali && <span>{place.nepali} •</span>}
                      <span>{place.category || 'Transit Location'}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-medium text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 shrink-0 capitalize">
                  {place.tier}
                </span>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching places found for "{query}"
            </div>
          )}
        </div>
      )}

      {/* Active Selection Chip (if place selected) */}
      {activePlace && !isOpen && (
        <div className="mt-1.5 flex items-center justify-between px-3 py-1.5 bg-slate-900 text-white rounded-xl shadow-md text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate font-medium">{activePlace.name}</span>
          </div>
          <button
            onClick={handleClear}
            className="p-0.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
