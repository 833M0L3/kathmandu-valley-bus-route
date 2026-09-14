import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Navigation, Bus, CheckCircle2, GitFork, ChevronRight } from 'lucide-react';
import MapViewer from './components/MapViewer';
import Controls from './components/Controls';
import LegendModal from './components/LegendModal';
import AttributionBar from './components/AttributionBar';
import { getOperatorRoutes } from './data/dedicatedRoutesData';

export default function App() {
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);
  const [selectedSubRouteCodes, setSelectedSubRouteCodes] = useState([]);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('ktm_transit_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch (e) {
      return 'light';
    }
  });
  const mapControlsRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('ktm_transit_theme', theme);
    } catch (e) {}
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const registerMapControls = useCallback((controls) => {
    mapControlsRef.current = controls;
  }, []);

  const handleZoomIn = () => {
    mapControlsRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapControlsRef.current?.zoomOut();
  };

  const handleResetView = () => {
    mapControlsRef.current?.resetView();
  };

  const handleToggleLegend = () => {
    setIsLegendOpen((prev) => !prev);
  };

  const handleClearActiveRoute = () => {
    setActiveRoute(null);
    setSelectedSubRouteCodes([]);
    mapControlsRef.current?.clearRouteHighlight();
  };

  const handleToggleSubRoute = (subRoute) => {
    if (!activeRoute) return;

    let nextCodes;
    // If currently showing all branches, clicking one isolates to just that branch
    if (selectedSubRouteCodes.length === 0) {
      nextCodes = [subRoute.code];
    } else if (selectedSubRouteCodes.includes(subRoute.code)) {
      // Toggle off
      nextCodes = selectedSubRouteCodes.filter((code) => code !== subRoute.code);
    } else {
      // Toggle on (multi-select)
      nextCodes = [...selectedSubRouteCodes, subRoute.code];
    }

    setSelectedSubRouteCodes(nextCodes);

    if (nextCodes.length === 0) {
      mapControlsRef.current?.highlightRoute(activeRoute.name, null);
    } else {
      const allOperatorRoutes = getOperatorRoutes(activeRoute.name);
      const activeSvgIds = [
        ...new Set(
          allOperatorRoutes
            .filter((sr) => nextCodes.includes(sr.code))
            .map((sr) => sr.svgId)
            .filter(Boolean)
        ),
      ];
      mapControlsRef.current?.highlightRoute(activeRoute.name, activeSvgIds.length > 0 ? activeSvgIds : null);
    }
  };

  const handleSelectAllRoutes = () => {
    setSelectedSubRouteCodes([]);
    if (activeRoute) {
      mapControlsRef.current?.highlightRoute(activeRoute.name, null);
    }
  };

  const handleNavigateToLocation = (location) => {
    setIsLegendOpen(false);
    if (location.x !== undefined && location.y !== undefined) {
      mapControlsRef.current?.flyToLocation(location.x, location.y, 5.8, {
        name: location.name,
        subtitle: location.subtitle,
        color: location.color,
      });
    }
    if (location.service) {
      setActiveRoute(location.service);
      if (location.subRoute) {
        setSelectedSubRouteCodes([location.subRoute.code]);
        mapControlsRef.current?.highlightRoute(location.service.name, [location.subRoute.svgId]);
      } else {
        setSelectedSubRouteCodes([]);
        mapControlsRef.current?.highlightRoute(location.service.name, null);
      }
    }
  };

  const subRoutes = activeRoute ? getOperatorRoutes(activeRoute.name) : [];
  const isAllSelected = selectedSubRouteCodes.length === 0;
  const selectedSubRoutes = subRoutes.filter((sr) => selectedSubRouteCodes.includes(sr.code));

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white dark:bg-slate-950 select-none">
      {/* Pure Vector Map with Topographic Valley Relief Base */}
      <MapViewer registerMapControls={registerMapControls} />

      {/* Active Route Floating Banner with Dedicated Route Branches & Multi-Route Selection */}
      {activeRoute && (
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-1.5 max-w-[94vw] sm:max-w-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Main Operator Pill */}
          <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-2xl text-white">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shadow-sm shrink-0"
              style={{ backgroundColor: activeRoute.color }}
            >
              {activeRoute.code}
            </div>
            <div className="flex items-center gap-2 min-w-0 pr-1">
              <span className="font-['Outfit'] font-bold text-xs sm:text-sm tracking-tight truncate max-w-[130px] sm:max-w-[200px]">
                {activeRoute.name}
              </span>
              {isAllSelected ? (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/20 whitespace-nowrap">
                  All Routes {subRoutes.length > 0 ? `(${subRoutes.length})` : ''}
                </span>
              ) : selectedSubRoutes.length === 1 ? (
                <span className="text-[11px] font-semibold text-white bg-white/15 px-2 py-0.5 rounded-full border border-white/25 truncate max-w-[140px] sm:max-w-[240px]">
                  {selectedSubRoutes[0].code}: {selectedSubRoutes[0].name.split(':')[1] || selectedSubRoutes[0].name}
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-white bg-white/15 px-2 py-0.5 rounded-full border border-white/25 truncate max-w-[160px] sm:max-w-[260px]">
                  {selectedSubRoutes.length} of {subRoutes.length} Routes ({selectedSubRoutes.map((s) => s.code).join(', ')})
                </span>
              )}
            </div>
            <button
              onClick={handleClearActiveRoute}
              title="Clear route highlight"
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dedicated Sub-Routes Switcher & Multi-Route Selection Bar */}
          {subRoutes.length > 0 && (
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-xl overflow-x-auto max-w-full no-scrollbar">
              {/* Toggle All Button */}
              <button
                onClick={handleSelectAllRoutes}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isAllSelected
                    ? 'bg-white text-slate-950 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="View all operator routes together"
              >
                <span>All Branches ({subRoutes.length})</span>
              </button>

              <div className="w-[1px] h-4 bg-slate-700 mx-0.5 shrink-0" />

              {/* Individual Dedicated Route Branch Pills (Click to toggle multiple) */}
              {subRoutes.map((sr) => {
                const isSelected = selectedSubRouteCodes.includes(sr.code);
                return (
                  <button
                    key={sr.code}
                    onClick={() => handleToggleSubRoute(sr)}
                    title={`${sr.name} — ${sr.description}\n(Click to select/toggle this route)`}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      isSelected
                        ? 'bg-white text-slate-950 ring-2 ring-white/70 shadow-sm font-extrabold'
                        : isAllSelected
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {isSelected && <span className="text-[9px]">✓</span>}
                    <span>{sr.code}</span>
                  </button>
                );
              })}

              {/* Reset to All if a subset is selected */}
              {!isAllSelected && (
                <button
                  onClick={handleSelectAllRoutes}
                  className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 whitespace-nowrap ml-0.5 cursor-pointer font-medium"
                  title="Reset to All Branches"
                >
                  Show All
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Action Controls */}
      <Controls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onToggleLegend={handleToggleLegend}
        isLegendOpen={isLegendOpen}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Attribution Bar */}
      <AttributionBar />

      {/* Web Format Legend Modal with Full City Route Search & Direct Map Navigation */}
      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
        onNavigateToLocation={handleNavigateToLocation}
        theme={theme}
      />
    </main>
  );
}
