import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Navigation, Bus, CheckCircle2, GitFork, ChevronRight } from 'lucide-react';
import MapViewer from './components/MapViewer';
import Controls from './components/Controls';
import LegendModal from './components/LegendModal';
import AttributionBar from './components/AttributionBar';
import TripPanel from './components/TripPanel';
import MapSearchBar from './components/MapSearchBar';
import SpotBanner from './components/SpotBanner';
import LineChooser from './components/LineChooser';
import { loadLineFinder } from './usePlanner';
import { getOperatorRoutes } from './data/dedicatedRoutesData';
import { BUS_SERVICES } from './data/legendData';
import { readShareLink, writeShareLink } from './shareLink';

// SVG element IDs for the selected branch codes of an operator
const getSubRouteSvgIds = (operatorName, codes) => [
  ...new Set(
    getOperatorRoutes(operatorName)
      .filter((sr) => codes.includes(sr.code))
      .map((sr) => sr.svgId)
      .filter(Boolean)
  ),
];

export default function App() {
  const [initialLink] = useState(readShareLink);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [tapInfo, setTapInfo] = useState(null); // lines and stop under a map tap, for the line chooser
  // Lines at a spot (tapped point or searched stop), across operators: { title, lines, selectedIds }; [] = all
  const [spot, setSpot] = useState(null);
  const [tripPick, setTripPick] = useState(null); // { kind: 'origin' | 'destination', station, key } for an open planner
  // A shared trip link opens the planner; it takes precedence over a shared route or pin
  const [isTripOpen, setIsTripOpen] = useState(initialLink.trip !== null);
  // Prefilled stops for the trip planner; `key` remounts the panel for each new request
  // origin / destination: station objects, or stop names from a shared link (resolved once the planner loads)
  const [tripRequest, setTripRequest] = useState({
    key: 0,
    origin: initialLink.trip?.from ?? null,
    destination: initialLink.trip?.to ?? null,
    option: initialLink.trip?.option ?? 0,
  });
  const [tripShare, setTripShare] = useState(null); // { from, to, option } reported by the open trip panel
  const [selectedStop, setSelectedStop] = useState(null); // { station, lines } from the stop search
  const [activeRoute, setActiveRoute] = useState(initialLink.trip ? null : initialLink.service);
  const [selectedSubRouteCodes, setSelectedSubRouteCodes] = useState(initialLink.trip ? [] : initialLink.subRouteCodes);
  const [activePlace, setActivePlace] = useState(initialLink.trip ? null : initialLink.place);
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

  // Restore the map view from a shared link (MapViewer registers its controls before this runs)
  useEffect(() => {
    const { service, subRouteCodes, place, trip } = initialLink;
    if (trip) return; // the trip panel restores itself
    if (place) {
      const subRoute = service && subRouteCodes.length === 1
        ? getOperatorRoutes(service.name).find((sr) => sr.code === subRouteCodes[0])
        : null;
      mapControlsRef.current?.flyToLocation(place.x, place.y, 5.8, {
        name: place.name,
        subtitle: subRoute ? subRoute.name : service ? `${service.name} (${service.code})` : place.category,
        color: service?.color,
      });
    }
    if (service) {
      const svgIds = getSubRouteSvgIds(service.name, subRouteCodes);
      mapControlsRef.current?.highlightRoute(service.name, svgIds.length > 0 ? svgIds : null);
    }
  }, [initialLink]);

  // Keep the URL in sync so the current view can be shared
  useEffect(() => {
    writeShareLink({
      service: activeRoute,
      subRouteCodes: selectedSubRouteCodes,
      place: activePlace,
      trip: isTripOpen ? tripShare : null,
    });
  }, [activeRoute, selectedSubRouteCodes, activePlace, isTripOpen, tripShare]);

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

  // The trip planner draws its own highlight, so drop any operator highlight first
  const openTrip = ({ origin = null, destination = null } = {}) => {
    setIsLegendOpen(false);
    setTapInfo(null);
    setSelectedStop(null);
    setActivePlace(null);
    mapControlsRef.current?.clearPlacePin(); // the planner places its own pins
    setSpot(null);
    setActiveRoute(null);
    setSelectedSubRouteCodes([]);
    mapControlsRef.current?.clearRouteHighlight();
    setTripShare(null);
    setTripRequest((prev) => ({ key: prev.key + 1, origin, destination, option: 0 }));
    setIsTripOpen(true);
  };

  const handleToggleTrip = () => {
    if (isTripOpen) setIsTripOpen(false);
    else openTrip();
  };

  // Stop search: fly to the stop and show its buses
  const handleSelectStop = (station, lines) => {
    setTapInfo(null);
    setSpot(null);
    setSelectedStop({ station, lines });
    setActiveRoute(null);
    setSelectedSubRouteCodes([]);
    mapControlsRef.current?.clearRouteHighlight();
    mapControlsRef.current?.flyToLocation(station.x, station.y, 5.4, {
      name: station.name,
      subtitle: `${lines.length} bus route${lines.length === 1 ? '' : 's'}`,
      color: '#0f172a',
    });
    setActivePlace({ name: station.name, x: station.x, y: station.y });
  };

  // Show one of the stop's buses through the regular operator banner
  const handleShowLine = (line) => {
    const service = BUS_SERVICES.find((s) => s.code === line.op);
    if (!service) return;
    const branchCodes = getOperatorRoutes(service.name).map((sr) => sr.code);
    setSelectedStop(null);
    setSpot(null);
    setActiveRoute(service);
    setSelectedSubRouteCodes(line.codes.filter((code) => branchCodes.includes(code)));
    mapControlsRef.current?.highlightRoute(service.name, [line.svgId]);
  };

  // --- Tapping the map: which bus is this line? / start or go from this stop ---
  const TAP_LINE_RADIUS_PX = 22; // finger-sized; parallel lines in a bundle are only a few px apart when zoomed out
  const TAP_STOP_RADIUS_PX = 28;

  const highlightSpot = (next) => {
    const ids = next.selectedIds.length > 0 ? next.selectedIds : next.lines.map((l) => l.svgId);
    mapControlsRef.current?.highlightRoute('Spot', ids, { fly: false });
  };

  // Show the lines at a spot, starting with one of them selected (or all)
  // stop / stopLines: the stop at the spot (if any) and every bus serving it, for Start / Go and "all buses here"
  const openSpot = (title, lines, firstId = null, stop = null, stopLines = null) => {
    const next = { title, lines, selectedIds: firstId ? [firstId] : [], stop, stopLines };
    setSelectedStop(null);
    setActiveRoute(null);
    setSelectedSubRouteCodes([]);
    setSpot(next);
    highlightSpot(next);
  };

  // Like the operator branch bar: from "all", a tap isolates one line; then taps add or remove lines
  const handleToggleSpotLine = (line) => {
    const ids = spot.selectedIds;
    const nextIds = ids.length === 0 ? [line.svgId] : ids.includes(line.svgId) ? ids.filter((id) => id !== line.svgId) : [...ids, line.svgId];
    const next = { ...spot, selectedIds: nextIds };
    setSpot(next);
    highlightSpot(next);
  };

  const handleShowAllSpotLines = () => {
    const next = { ...spot, selectedIds: [] };
    setSpot(next);
    highlightSpot(next);
  };

  const handleCloseSpot = () => {
    setSpot(null);
    mapControlsRef.current?.clearRouteHighlight();
  };

  // Put back the highlight that was showing before a tap preview
  const restoreHighlight = () => {
    if (isTripOpen) return; // the trip panel owns the highlight
    if (spot) {
      highlightSpot(spot);
    } else if (activeRoute) {
      const svgIds = getSubRouteSvgIds(activeRoute.name, selectedSubRouteCodes);
      mapControlsRef.current?.highlightRoute(activeRoute.name, svgIds.length > 0 ? svgIds : null, { fly: false });
    } else {
      mapControlsRef.current?.clearRouteHighlight();
    }
  };

  const previewLines = (lines) => {
    if (isTripOpen || lines.length === 0) return;
    mapControlsRef.current?.highlightRoute('Preview', lines.map((l) => l.svgId), { fly: false });
  };

  const closeTapInfo = () => {
    if (!tapInfo) return;
    setTapInfo(null);
    restoreHighlight();
  };

  const handleMapTap = async (tap) => {
    if (isLegendOpen) return;
    const { findAt } = await loadLineFinder();
    const found = findAt(tap.x, tap.y, TAP_LINE_RADIUS_PX * tap.pxScale, TAP_STOP_RADIUS_PX * tap.pxScale);
    // With the planner open only stops matter: a small card offers Set as start / destination
    if (isTripOpen) {
      if (!found.stop) return closeTapInfo();
      setTapInfo({ ...found, screen: tap.screen });
      return;
    }
    if (!found.stop && found.lines.length === 0) return; // empty map: keep what is showing
    // Otherwise the spot card shows everything at the tapped point (one card, updated on every tap)
    const lines = found.lines.length > 0 ? found.lines.map((h) => h.line) : found.stopLines;
    setTapInfo(null);
    openSpot(found.stop?.name ?? 'Lines here', lines, null, found.stop, found.stopLines);
  };

  const handleShowStopLines = () => {
    const next = { ...spot, lines: spot.stopLines, selectedIds: [] };
    setSpot(next);
    highlightSpot(next);
  };

  // Picking a line keeps the other lines at the spot one tap away
  const handleChooseLine = (line) => {
    const title = tapInfo?.stop?.name ?? 'Lines here';
    const lines = tapInfo?.lines.map((h) => h.line) ?? [line];
    setTapInfo(null);
    openSpot(title, lines, line.svgId);
  };

  const handleTapStart = (stop) => {
    setTapInfo(null);
    if (isTripOpen) setTripPick((prev) => ({ kind: 'origin', station: stop, key: (prev?.key ?? 0) + 1 }));
    else openTrip({ origin: stop });
  };

  const handleTapGo = (stop) => {
    setTapInfo(null);
    if (isTripOpen) setTripPick((prev) => ({ kind: 'destination', station: stop, key: (prev?.key ?? 0) + 1 }));
    else openTrip({ destination: stop });
  };

  const handleTapStopDetails = (stop) => {
    const lines = tapInfo?.stopLines ?? [];
    setTapInfo(null);
    handleSelectStop(stop, lines);
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
      const activeSvgIds = getSubRouteSvgIds(activeRoute.name, nextCodes);
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
    setIsTripOpen(false);
    setSpot(null);
    if (location.x !== undefined && location.y !== undefined) {
      mapControlsRef.current?.flyToLocation(location.x, location.y, 5.8, {
        name: location.name,
        subtitle: location.subtitle,
        color: location.color,
      });
      setActivePlace({ name: location.name, x: location.x, y: location.y });
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
    <main className="relative w-screen h-screen overflow-hidden bg-white dark:bg-neutral-950 select-none">
      {/* Pure Vector Map with Topographic Valley Relief Base */}
      <MapViewer
        registerMapControls={registerMapControls}
        onPlaceCleared={() => {
          setActivePlace(null);
          setSelectedStop(null);
        }}
        onMapTap={handleMapTap}
        onMapMoveStart={closeTapInfo}
      />

      {tapInfo && (
        <LineChooser
          info={tapInfo}
          tripMode={isTripOpen}
          onSelectLine={handleChooseLine}
          onPreview={(line) => previewLines(line ? [line] : tapInfo.lines.map((h) => h.line))}
          onStart={handleTapStart}
          onGo={handleTapGo}
          onStopDetails={handleTapStopDetails}
          onClose={closeTapInfo}
        />
      )}

      {spot && !activeRoute && (
        <SpotBanner
          spot={spot}
          onToggleLine={handleToggleSpotLine}
          onShowAll={handleShowAllSpotLines}
          onShowOperator={handleShowLine}
          onStart={handleTapStart}
          onGo={handleTapGo}
          onShowStopLines={handleShowStopLines}
          onPreview={(line) => (line ? mapControlsRef.current?.highlightRoute('Spot', [line.svgId], { fly: false }) : highlightSpot(spot))}
          onClose={handleCloseSpot}
        />
      )}

      {/* Active Route Floating Banner with Dedicated Route Branches & Multi-Route Selection */}
      {activeRoute && (
        <div className="absolute top-[4.25rem] sm:top-[4.75rem] left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-1.5 max-w-[94vw] sm:max-w-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Main Operator Pill */}
          <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full dark surface text-white">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shadow-sm shrink-0"
              style={{ backgroundColor: activeRoute.color }}
            >
              {activeRoute.code}
            </div>
            <div className="flex items-center gap-2 min-w-0 pr-1">
              <span className="font-bold text-xs sm:text-sm tracking-tight truncate max-w-[130px] sm:max-w-[200px]">
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
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.07] transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dedicated Sub-Routes Switcher & Multi-Route Selection Bar */}
          {subRoutes.length > 0 && (
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl dark surface overflow-x-auto max-w-full no-scrollbar">
              {/* Toggle All Button */}
              <button
                onClick={handleSelectAllRoutes}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isAllSelected
                    ? 'bg-white text-neutral-950 shadow-xs font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.07]'
                }`}
                title="View all operator routes together"
              >
                <span>All Branches ({subRoutes.length})</span>
              </button>

              <div className="w-[1px] h-4 bg-neutral-700 mx-0.5 shrink-0" />

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
                        ? 'bg-white text-neutral-950 ring-2 ring-white/70 shadow-sm font-extrabold'
                        : isAllSelected
                        ? 'text-neutral-300 hover:text-white hover:bg-white/[0.07]/80 border border-neutral-700/60'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.07] border border-white/10'
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
                  className="text-[10px] text-neutral-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.07] whitespace-nowrap ml-0.5 cursor-pointer font-medium"
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
        onToggleTrip={handleToggleTrip}
        isTripOpen={isTripOpen}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {isTripOpen ? (
        <TripPanel
          key={tripRequest.key}
          mapControlsRef={mapControlsRef}
          initialOrigin={tripRequest.origin}
          initialDestination={tripRequest.destination}
          initialOption={tripRequest.option}
          onShareStateChange={setTripShare}
          pick={tripPick}
          onClose={() => {
            setIsTripOpen(false);
            setTripShare(null);
          }}
        />
      ) : (
        <MapSearchBar
          selected={selectedStop}
          onSelectStop={handleSelectStop}
          onClear={() => {
            setSelectedStop(null);
            setActivePlace(null);
            mapControlsRef.current?.clearPlacePin();
          }}
          onShowLine={(line) =>
            selectedStop && openSpot(selectedStop.station.name, selectedStop.lines, line.svgId, selectedStop.station, selectedStop.lines)
          }
          onDirectionsFrom={(station) => openTrip({ origin: station })}
          onDirectionsTo={(station) => openTrip({ destination: station })}
        />
      )}

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
