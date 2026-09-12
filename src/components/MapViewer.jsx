import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MAP_LABELS } from '../data/areaLabels';

const MAP_WIDTH = 11667;
const MAP_HEIGHT = 8750;
const TILE_SIZE = 256;
const MIN_ZOOM = 0;
const NATIVE_MAX_ZOOM = 6;
const MAX_ZOOM = 6; // Capped at Level 6 (native tile resolution)

export default function MapViewer({ registerMapControls }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const targetPinMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet with CRS.Simple on pure white canvas
    const map = L.map(mapContainerRef.current, {
      crs: L.CRS.Simple,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      zoomControl: false,
      attributionControl: false,
      zoomSnap: 0.1,
      zoomDelta: 0.4,
      wheelPxPerZoomLevel: 100,
      maxBoundsViscosity: 1.0,
      bounceAtZoomLimits: false,
      fadeAnimation: false, // Fix: Firefox CSS opacity fade keeps tiles invisible
    });

    mapInstanceRef.current = map;

    // Coordinate mapping for 11667 x 8750 px clean map (based on native zoom 6)
    const southWest = map.unproject([0, MAP_HEIGHT], NATIVE_MAX_ZOOM);
    const northEast = map.unproject([MAP_WIDTH, 0], NATIVE_MAX_ZOOM);
    const imageBounds = new L.LatLngBounds(southWest, northEast);

    // Geographic center of Kathmandu Valley transit bowl
    const valleyCenter = map.unproject([4850, 4550], NATIVE_MAX_ZOOM);

    // Calculate COVER zoom so the map fills 100% of viewport with ZERO white blank borders
    const calculateCoverZoom = () => {
      const size = map.getSize();
      if (!size.x || !size.y) return 2.6;
      const unitW = MAP_WIDTH / Math.pow(2, NATIVE_MAX_ZOOM);
      const unitH = MAP_HEIGHT / Math.pow(2, NATIVE_MAX_ZOOM);
      const zW = Math.log2(size.x / unitW);
      const zH = Math.log2(size.y / unitH);
      return Math.ceil(Math.max(zW, zH) * 10) / 10;
    };

    const coverZoom = calculateCoverZoom();

    // Center map precisely on Kathmandu Valley at full-screen cover
    map.setView(valleyCenter, coverZoom);

    // Lock minimum zoom to coverZoom so zooming out can NEVER show white blank borders
    map.setMinZoom(coverZoom);
    map.setMaxBounds(imageBounds);

    // Dynamically update minZoom on window resize
    map.on('resize', () => {
      const newCoverZoom = calculateCoverZoom();
      map.setMinZoom(newCoverZoom);
      if (map.getZoom() < newCoverZoom) {
        map.setZoom(newCoverZoom);
      }
    });

    // Deep Zoom tile layer (native tiles up to Level 6, allow scaling up to 7.5 to prevent blank screen)
    const tileLayer = L.tileLayer('./tiles/{z}/{x}/{y}.png', {
      tileSize: TILE_SIZE,
      minZoom: 0,
      maxZoom: 7.5,
      maxNativeZoom: NATIVE_MAX_ZOOM,
      bounds: imageBounds,
      noWrap: true,
      keepBuffer: 8,
      updateWhenZooming: false, // Fix: prevents Firefox white tile frames during zoom
      updateWhenIdle: false,
    });

    tileLayer.addTo(map);

    // --- Google Maps Exact Typographic Labels Layer (Only Original Labels) ---
    const labelsLayer = L.layerGroup();

    MAP_LABELS.forEach((item) => {
      const latLng = map.unproject([item.x, item.y], NATIVE_MAX_ZOOM);

      let markerHtml = '';
      if (item.tier === 'city') {
        markerHtml = `
          <div class="gmap-label-wrapper tier-city" data-id="${item.id}">
            <div class="gmap-city-name gmap-halo-text">${item.name}</div>
            <div class="gmap-city-nepali gmap-halo-text">${item.nepali}</div>
          </div>
        `;
      } else if (item.tier === 'hub') {
        markerHtml = `
          <div class="gmap-label-wrapper tier-hub" data-id="${item.id}">
            <div class="gmap-hub-name gmap-halo-text">${item.name}</div>
            <div class="gmap-hub-nepali gmap-halo-text">${item.nepali}</div>
          </div>
        `;
      } else if (item.tier === 'local') {
        markerHtml = `
          <div class="gmap-label-wrapper tier-local" data-id="${item.id}">
            <div class="gmap-local-name gmap-halo-text">${item.name}</div>
            <div class="gmap-local-nepali gmap-halo-text">${item.nepali}</div>
          </div>
        `;
      } else if (item.tier === 'peak') {
        markerHtml = `
          <div class="gmap-label-wrapper tier-peak" data-id="${item.id}">
            <div class="gmap-peak-header gmap-halo-text">
              <span class="gmap-peak-icon">▲</span>
              <span class="gmap-peak-name">${item.name}</span>
            </div>
            <div class="gmap-peak-sub gmap-halo-text">${item.nepali}</div>
          </div>
        `;
      }

      const icon = L.divIcon({
        className: 'leaflet-gmap-label-root',
        html: markerHtml,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker(latLng, {
        icon,
        interactive: true,
        riseOnHover: true,
      });

      // Smooth pan on click
      marker.on('click', () => {
        const currentZoom = map.getZoom();
        const targetZoom = Math.max(currentZoom, item.tier === 'city' ? 3.4 : 3.8);
        map.flyTo(latLng, targetZoom, { duration: 0.6 });
      });

      labelsLayer.addLayer(marker);
    });

    labelsLayer.addTo(map);

    // Pinpoint marker creator for navigation from legend
    const setNavigatedMarker = (latLng, placeInfo) => {
      if (targetPinMarkerRef.current) {
        targetPinMarkerRef.current.remove();
        targetPinMarkerRef.current = null;
      }

      const markerHtml = `
        <div class="gmap-pin-root">
          <div class="gmap-pin-pulse-container">
            <div class="gmap-pin-ripple" style="background-color: ${placeInfo.color || '#e11d48'}55"></div>
            <svg class="gmap-pin-svg" viewBox="0 0 24 30" fill="none">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 8.5 12 18 12 18s12-9.5 12-18c0-6.63-5.37-12-12-12z" fill="${placeInfo.color || '#e11d48'}"/>
              <circle cx="12" cy="11" r="4.5" fill="#ffffff"/>
            </svg>
            <div class="gmap-pin-badge">
              <span class="gmap-pin-badge-name">${placeInfo.name}</span>
              ${placeInfo.subtitle ? `<span class="gmap-pin-badge-category">${placeInfo.subtitle}</span>` : ''}
            </div>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'leaflet-gmap-pin-layer',
        html: markerHtml,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker(latLng, { icon, zIndexOffset: 10000 });
      marker.addTo(map);
      targetPinMarkerRef.current = marker;

      // Click pin to dismiss
      marker.on('click', () => {
        marker.remove();
        targetPinMarkerRef.current = null;
      });
    };

    // --- Calibrated Dynamic Zoom Controller (Prevents Clustering) ---
    const updateZoomVisibility = () => {
      if (!mapInstanceRef.current || !mapContainerRef.current) return;
      const zoom = mapInstanceRef.current.getZoom();

      // 1. Primary Cities: Visible at overview and max zoom out
      let cityOpacity = 1;
      if (zoom >= 5.2) {
        cityOpacity = 0;
      } else if (zoom > 4.6) {
        cityOpacity = (5.2 - zoom) / (5.2 - 4.6);
      } else {
        cityOpacity = 1;
      }

      // 2. Perimeter Peaks: Visible on valley rim at overview
      let peakOpacity = 1;
      if (zoom >= 4.5) {
        peakOpacity = 0;
      } else if (zoom > 3.8) {
        peakOpacity = (4.5 - zoom) / (4.5 - 3.8);
      } else {
        peakOpacity = 1;
      }

      // 3. Gateways & Hubs: Visible on max zoom out & overview
      let hubOpacity = 1;
      if (zoom >= 5.2) {
        hubOpacity = 0;
      } else if (zoom > 4.6) {
        hubOpacity = (5.2 - zoom) / (5.2 - 4.6);
      } else {
        hubOpacity = 1;
      }

      // 4. Neighborhoods: Fades in at medium zoom (Zoom 3.8+) and remains visible at high zoom
      let localOpacity = 0;
      if (zoom < 3.8) {
        localOpacity = 0;
      } else if (zoom < 4.2) {
        localOpacity = (zoom - 3.8) / (4.2 - 3.8);
      } else {
        localOpacity = 1;
      }

      const container = mapContainerRef.current;
      container.style.setProperty('--city-opacity', cityOpacity.toFixed(3));
      container.style.setProperty('--city-visibility', cityOpacity <= 0.01 ? 'hidden' : 'visible');
      container.style.setProperty('--city-pointer', cityOpacity <= 0.05 ? 'none' : 'auto');

      container.style.setProperty('--peak-opacity', peakOpacity.toFixed(3));
      container.style.setProperty('--peak-visibility', peakOpacity <= 0.01 ? 'hidden' : 'visible');
      container.style.setProperty('--peak-pointer', peakOpacity <= 0.05 ? 'none' : 'auto');

      container.style.setProperty('--hub-opacity', hubOpacity.toFixed(3));
      container.style.setProperty('--hub-visibility', hubOpacity <= 0.01 ? 'hidden' : 'visible');
      container.style.setProperty('--hub-pointer', hubOpacity <= 0.05 ? 'none' : 'auto');

      container.style.setProperty('--local-opacity', localOpacity.toFixed(3));
      container.style.setProperty('--local-visibility', localOpacity <= 0.01 ? 'hidden' : 'visible');
      container.style.setProperty('--local-pointer', localOpacity <= 0.05 ? 'none' : 'auto');
    };

    map.on('zoom', updateZoomVisibility);
    map.on('zoomend', updateZoomVisibility);
    updateZoomVisibility();

    // Register external control hooks
    if (registerMapControls) {
      registerMapControls({
        zoomIn: () => {
          const next = Math.min(map.getZoom() + 0.4, MAX_ZOOM);
          map.setZoom(next);
        },
        zoomOut: () => {
          const next = Math.max(map.getZoom() - 0.4, map.getMinZoom());
          map.setZoom(next);
        },
        resetView: () => {
          if (targetPinMarkerRef.current) {
            targetPinMarkerRef.current.remove();
            targetPinMarkerRef.current = null;
          }
          const currentCoverZoom = calculateCoverZoom();
          map.flyTo(valleyCenter, currentCoverZoom, { duration: 0.8 });
        },
        flyToLocation: (x, y, zoom = 5.8, placeInfo = null) => {
          const targetZoom = Math.min(zoom, MAX_ZOOM);
          const latLng = map.unproject([x, y], NATIVE_MAX_ZOOM);
          map.flyTo(latLng, targetZoom, { duration: 0.8 });
          if (placeInfo) {
            setNavigatedMarker(latLng, placeInfo);
          }
        },
      });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [registerMapControls]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <div ref={mapContainerRef} className="w-full h-full bg-white" />
    </div>
  );
}
