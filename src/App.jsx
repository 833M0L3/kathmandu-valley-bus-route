import React, { useState, useRef, useCallback } from 'react';
import MapViewer from './components/MapViewer';
import Controls from './components/Controls';
import LegendModal from './components/LegendModal';
import AttributionBar from './components/AttributionBar';

export default function App() {
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const mapControlsRef = useRef(null);

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

  const handleNavigateToLocation = (location) => {
    setIsLegendOpen(false);
    mapControlsRef.current?.flyToLocation(location.x, location.y, 5.8, {
      name: location.name,
      subtitle: location.subtitle,
      color: location.color,
    });
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white select-none">
      {/* Pure Map Canvas (Original Labels Only) */}
      <MapViewer registerMapControls={registerMapControls} />

      {/* Floating Action Controls */}
      <Controls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onToggleLegend={handleToggleLegend}
        isLegendOpen={isLegendOpen}
      />

      {/* Google Maps Exact Attribution Bar */}
      <AttributionBar />

      {/* Web Format Legend Modal with Full City Route Search & Direct Map Navigation */}
      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
        onNavigateToLocation={handleNavigateToLocation}
      />
    </main>
  );
}
