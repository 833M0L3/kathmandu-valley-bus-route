import React, { useState } from 'react';
import { X, Search, BookOpen, ArrowRight, ArrowLeft, MapPin, Bus, Route, RotateCcw, Navigation } from 'lucide-react';
import { BUS_SERVICES, POPULAR_HUBS, ROUTE_NOTATION_EXAMPLES, ABBREVIATIONS } from '../data/legendData';
import { findBusesForPlaceQuery } from '../data/placeBusIndex';
import { ALL_MAP_PLACES, getPlaceCoordinates } from '../data/placesData';

export default function LegendModal({ isOpen, onClose, onNavigateToLocation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'direction' | 'abbreviations'

  if (!isOpen) return null;

  const totalRoutes = BUS_SERVICES.reduce((acc, s) => acc + (s.routes ? s.routes.length : 0), 0);

  const toNepaliDigits = (num) => {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return String(num).replace(/\d/g, (d) => nepaliDigits[d]);
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Spatially query all 1,100+ verified places from clean-map.jpg
  const placeLookup = trimmedQuery ? findBusesForPlaceQuery(trimmedQuery) : { codes: [], matchedPlaces: [] };
  const placeMatchedCodes = new Set(placeLookup.codes);

  const filteredServices = BUS_SERVICES.filter((s) => {
    if (!trimmedQuery) return true;

    // Search by operator name (English or Devanagari)
    if (s.name.toLowerCase().includes(trimmedQuery) || s.nepali.includes(searchQuery)) return true;

    // Search by letter code (exact code like "S", "N")
    if (s.code.toLowerCase() === trimmedQuery) return true;

    // Search by specific route code (e.g. "S1", "N2", "B10", "T4")
    if (s.routes.some((r) => r.toLowerCase().includes(trimmedQuery))) return true;

    // Search by corridor description
    if (s.corridor && s.corridor.toLowerCase().includes(trimmedQuery)) return true;

    // Search by key stops
    if (s.stops.some((stop) => stop.toLowerCase().includes(trimmedQuery))) return true;

    // Search across all 1,100+ extracted places & landmarks from clean-map.jpg
    if (placeMatchedCodes.has(s.code)) return true;

    return false;
  });

  const handleNavigateToMap = (targetName, service) => {
    if (!onNavigateToLocation) return;

    // 1. Try finding coordinates for the specific query or target name
    let coords = getPlaceCoordinates(targetName);

    // 2. If not found, try the matched places from placeLookup
    if (!coords && placeLookup.matchedPlaces.length > 0) {
      for (const placeName of placeLookup.matchedPlaces) {
        coords = getPlaceCoordinates(placeName);
        if (coords) break;
      }
    }

    // 3. If still not found, fallback to service's stops
    if (!coords && service.stops && service.stops.length > 0) {
      for (const st of service.stops) {
        coords = getPlaceCoordinates(st);
        if (coords) break;
      }
    }

    if (coords) {
      onNavigateToLocation({
        x: coords.x,
        y: coords.y,
        name: coords.name,
        subtitle: `${service.name} (${service.code})`,
        color: service.color,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-['Inter'] text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
              <BookOpen className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="font-['Outfit'] font-bold text-sm sm:text-base text-slate-900 tracking-tight flex items-center gap-2">
                Bus Routes & City Stop Directory
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Search which buses go through any city, stop, or landmark • Click box to view on map
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close legend"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 px-5 sm:px-6 bg-white shrink-0 gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('services')}
            className={`py-2.5 sm:py-3 text-xs font-semibold tracking-wide border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Bus Operators & Route Search ({BUS_SERVICES.length})
          </button>
          <button
            onClick={() => setActiveTab('direction')}
            className={`py-2.5 sm:py-3 text-xs font-semibold tracking-wide border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'direction'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Direction & Notation
          </button>
          <button
            onClick={() => setActiveTab('abbreviations')}
            className={`py-2.5 sm:py-3 text-xs font-semibold tracking-wide border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'abbreviations'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Symbols & Notes
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
          {/* TAB 1: BUS SERVICES & ROUTE SEARCH */}
          {activeTab === 'services' && (
            <div className="space-y-3.5">
              {/* Transit System Overview KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {/* KPI 1: Bus Operators */}
                <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-white border border-emerald-200/70 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-700 shrink-0">
                    <Bus className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-['Outfit'] font-bold text-base sm:text-lg text-slate-900 leading-none">
                      {BUS_SERVICES.length}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 truncate mt-0.5">
                      Bus Operators
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium truncate">
                      {toNepaliDigits(BUS_SERVICES.length)} बस कम्पनीहरू
                    </div>
                  </div>
                </div>

                {/* KPI 2: Active Routes */}
                <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-blue-50/90 via-blue-50/40 to-white border border-blue-200/70 shadow-2xs hover:border-blue-300 transition-all">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-700 shrink-0">
                    <Route className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-['Outfit'] font-bold text-base sm:text-lg text-slate-900 leading-none">
                      {totalRoutes}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 truncate mt-0.5">
                      Route Lines
                    </div>
                    <div className="text-[10px] text-blue-700 font-medium truncate">
                      {toNepaliDigits(totalRoutes)} सञ्चालित रुटहरू
                    </div>
                  </div>
                </div>

                {/* KPI 3: Verified Places */}
                <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-rose-50/90 via-rose-50/40 to-white border border-rose-200/70 shadow-2xs hover:border-rose-300 transition-all">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-600/10 border border-rose-600/20 flex items-center justify-center text-rose-700 shrink-0">
                    <MapPin className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-['Outfit'] font-bold text-base sm:text-lg text-slate-900 leading-none">
                      {ALL_MAP_PLACES.length.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 truncate mt-0.5">
                      Places & Stops
                    </div>
                    <div className="text-[10px] text-rose-700 font-medium truncate">
                      {toNepaliDigits(ALL_MAP_PLACES.length.toLocaleString())} स्थान तथा स्टपहरू
                    </div>
                  </div>
                </div>

                {/* KPI 4: Key Transit Hubs */}
                <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-white border border-amber-200/70 shadow-2xs hover:border-amber-300 transition-all">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-700 shrink-0">
                    <Navigation className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-['Outfit'] font-bold text-base sm:text-lg text-slate-900 leading-none">
                      {POPULAR_HUBS.length}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 truncate mt-0.5">
                      Major Hubs
                    </div>
                    <div className="text-[10px] text-amber-700 font-medium truncate">
                      {toNepaliDigits(POPULAR_HUBS.length)} मुख्य ट्रान्जिट हबहरू
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any city, stop, or landmark (e.g. Thulo Bharyang, Kalanki, Maitidevi, ASCOL, Suncity)..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Popular Hub Quick-Filter Chips */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Popular Stops & Hubs:</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {POPULAR_HUBS.map((hub) => {
                    const isSelected = trimmedQuery === hub.toLowerCase();
                    return (
                      <button
                        key={hub}
                        onClick={() => setSearchQuery(isSelected ? '' : hub)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {hub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Status Badge */}
              {searchQuery && (
                <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 truncate">
                    <Route className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">
                      {filteredServices.length === 1
                        ? '1 bus service'
                        : `${filteredServices.length} bus services`}{' '}
                      go through <strong className="text-slate-900 font-semibold">"{searchQuery}"</strong>
                      {placeLookup.matchedPlaces.length > 0 && (
                        <span className="text-slate-500 text-[11px] ml-1.5">
                          (matches: {placeLookup.matchedPlaces.slice(0, 3).join(', ')}
                          {placeLookup.matchedPlaces.length > 3 ? '...' : ''})
                        </span>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 cursor-pointer transition-colors shrink-0 ml-2"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              )}

              {/* Bus Cards Grid */}
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredServices.map((service) => {
                    const navTarget = searchQuery || (placeLookup.matchedPlaces[0] || service.stops[0]);

                    return (
                      <div
                        key={service.code}
                        onClick={() => handleNavigateToMap(navTarget, service)}
                        className="group flex flex-col justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-lg transition-all space-y-2.5 cursor-pointer"
                        title={`Click to view ${navTarget} on map`}
                      >
                        {/* Top Row: Operator Info & Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Letter Badge */}
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs shrink-0 group-hover:scale-105 transition-transform"
                              style={{ backgroundColor: service.color }}
                            >
                              {service.code}
                            </div>

                            {/* Operator Names */}
                            <div className="min-w-0">
                              <h3 className="font-semibold text-xs text-slate-900 font-['Outfit'] truncate group-hover:text-slate-950">
                                {service.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 truncate">{service.nepali}</p>
                            </div>
                          </div>

                          {/* Color Line Swatch */}
                          <div
                            className="w-6 h-2 rounded-full shrink-0 mt-1 shadow-xs"
                            style={{ backgroundColor: service.color }}
                            title={`Color swatch: ${service.color}`}
                          />
                        </div>

                        {/* Corridor Description */}
                        <div className="text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 line-clamp-2">
                          <span className="font-semibold text-slate-700">Corridor: </span>
                          {service.corridor}
                        </div>

                        {/* Route Code Tags */}
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-[10px] font-semibold text-slate-400 mr-0.5">Routes:</span>
                          {service.routes.map((rt) => (
                            <span
                              key={rt}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-2xs"
                              style={{ backgroundColor: service.color }}
                            >
                              {rt}
                            </span>
                          ))}
                        </div>

                        {/* Matched Landmark Notice (if matched via comprehensive places index) */}
                        {placeLookup.matchedPlaces.length > 0 && placeMatchedCodes.has(service.code) && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex-wrap">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="shrink-0">Serves route near:</span>
                            <div className="flex items-center gap-1 flex-wrap">
                              {placeLookup.matchedPlaces.slice(0, 3).map((pl) => (
                                <button
                                  key={pl}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigateToMap(pl, service);
                                  }}
                                  className="underline hover:text-emerald-950 font-bold cursor-pointer"
                                  title={`Click to view ${pl} on map`}
                                >
                                  {pl}
                                </button>
                              ))}
                              {placeLookup.matchedPlaces.length > 3 && (
                                <span className="text-emerald-600 text-[10px]">
                                  +{placeLookup.matchedPlaces.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Key Stops List */}
                        <div className="pt-1 border-t border-slate-100">
                          <div className="text-[10px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>Key Route Stops:</span>
                          </div>
                          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-0.5 no-scrollbar">
                            {[...service.stops]
                              .sort((a, b) => {
                                if (!trimmedQuery) return 0;
                                const aMatch = a.toLowerCase().includes(trimmedQuery);
                                const bMatch = b.toLowerCase().includes(trimmedQuery);
                                if (aMatch && !bMatch) return -1;
                                if (!aMatch && bMatch) return 1;
                                return 0;
                              })
                              .map((stop) => {
                                const isMatched =
                                  trimmedQuery && stop.toLowerCase().includes(trimmedQuery);
                                return (
                                  <button
                                    key={stop}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNavigateToMap(stop, service);
                                    }}
                                    className={`px-1.5 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                                      isMatched
                                        ? 'bg-slate-900 text-white font-semibold shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                                    }`}
                                    title={`Click to view ${stop} on map`}
                                  >
                                    {stop}
                                  </button>
                                );
                              })}
                          </div>
                        </div>

                        {/* Direct Map Navigation Action Banner */}
                        <div className="pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigateToMap(navTarget, service);
                            }}
                            className="w-full py-1.5 px-3 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors shadow-xs cursor-pointer group-hover:bg-slate-950"
                          >
                            <Navigation className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform" />
                            <span>
                              {searchQuery
                                ? `View "${searchQuery}" on Map`
                                : `View ${service.name} Route on Map`}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty Search State */
                <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">No bus services found</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      No routes match "{searchQuery}". Try searching for Thulo Bharyang, Kalanki, Maitidevi, ASCOL, Suncity, or S1.
                    </p>
                  </div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Search Filter
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DIRECTION & NUMBERING GUIDE */}
          {activeTab === 'direction' && (
            <div className="space-y-4">
              <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Bus Services</th>
                      <th className="py-2.5 px-3">Route #</th>
                      <th className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <span>Outbound (Going)</span>
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                        </div>
                      </th>
                      <th className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <span>Inbound (Return)</span>
                          <ArrowLeft className="w-3 h-3 text-slate-500" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {ROUTE_NOTATION_EXAMPLES.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{row.service}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{row.number}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className="inline-flex items-center justify-center px-2 py-0.5 rounded text-white font-mono text-[11px] font-bold shadow-2xs"
                            style={{ backgroundColor: row.color }}
                          >
                            {row.outbound}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className="inline-flex items-center justify-center px-2 py-0.5 rounded text-white font-mono text-[11px] font-bold shadow-2xs"
                            style={{ backgroundColor: row.color }}
                          >
                            {row.inbound}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1.5 shadow-xs">
                <p className="font-semibold text-slate-900 font-['Outfit']">Official Notation Rule:</p>
                <p>
                  The exact notation style is applied to all bus operators across the map.
                  A route identifier without prime (e.g.{' '}
                  <span className="font-mono font-semibold text-slate-900 px-1 py-0.5 bg-slate-100 rounded">
                    S1
                  </span>
                  ) designates the outbound path, while a prime suffix (e.g.{' '}
                  <span className="font-mono font-semibold text-slate-900 px-1 py-0.5 bg-slate-100 rounded">
                    S1'
                  </span>
                  ) indicates the return path.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SYMBOLS & ABBREVIATIONS */}
          {activeTab === 'abbreviations' && (
            <div className="space-y-4">
              {/* Common Path */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-900 inline-block" />
                    <span className="w-8 h-1.5 bg-slate-900 inline-block rounded-full" />
                  </div>
                  <span className="font-['Outfit'] font-bold text-xs text-slate-900">
                    Common Trunk Corridors
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-0.5">
                  Thick dark charcoal / black lines represent shared high-frequency corridors traversed by multiple overlapping bus services through central Kathmandu Valley.
                </p>
              </div>

              {/* Abbreviations */}
              <div className="space-y-2">
                <span className="font-['Outfit'] font-bold text-xs text-slate-900 block">
                  Common Landmarks & Map Abbreviations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ABBREVIATIONS.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow-xs"
                    >
                      <span className="font-mono font-bold text-xs text-slate-900">{item.short}</span>
                      <span className="text-xs text-slate-600 ml-3 text-right">{item.full}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
