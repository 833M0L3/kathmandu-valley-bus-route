import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MAP_LABELS } from '../data/areaLabels';

const MAP_WIDTH = 11667;
const MAP_HEIGHT = 8750;
const NATIVE_MAX_ZOOM = 6;
const MIN_ZOOM = 0;
const MAX_ZOOM = 7.5; // Fluid continuous zoom up to 7.5

// Exact 1-to-1 mapping from operator names to SVG element IDs in Kathmandu_Bus_Route_Map.svg
const OPERATOR_SVG_MAP = {
  'Sajha Yatayat': 'Sajha_Yatayat',
  'Nepal Yatayat': 'Nepal_Yatayat',
  'Mahanagar Yatayat': 'Mahanagar_Yatayat',
  'Bhaktapur Buses': 'Bhaktapur_Buses',
  'Mayur Yatayat': 'Mayur_Yatayat',
  'Kirtipur Yatayat': 'Kirtipur_Yatayat',
  'Chandragiri Yatayat': 'Chandragiri_Yatayat',
  'Tarakeshwar Yatayat': 'Tarakeshwor_Yatayat',
  'Tarakeshwor Yatayat': 'Tarakeshwor_Yatayat',
  'Budhanilkantha Yatayat': 'Budhanilkantha_Yatayat',
  'Digo Yatayat': 'Digo_Yatayat',
  'Balaju Yatayat': 'Balaju_Yatayat_Raniban_',
  'Samakhusi Yatayat': 'Samakhusi_Yatayat',
  'Gokarneshwar Yatayat': 'Gokarneshwor_Yatayat',
  'Gokarneshwor Yatayat': 'Gokarneshwor_Yatayat',
  'Riddhi Siddhi Yatayat': 'Riddhi_Siddhi_Yatayat',
  'Gothatar Yatayat': 'Gothatar_Yatayat_or_Force_Bus',
  'Panchpokhari Yatayat': 'Panchpokhari_Yatayat',
  'Samyukta Yatayat': 'Samyukta_Yatayat',
  'Basuki Yatayat': 'Basuki_Yatayat',
  'Juneli Yatayat': 'Juneli_Yatayat',
  'Bagmati Yatayat': 'Bagmati_Yatayat',
  'Dhumrabaraha Yatayat': 'Dhumrabaraha_Yatayat',
  'Om Janata Yatayat': 'Om_Janata_Yatayat',
};

export default function MapViewer({ registerMapControls }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const targetPinMarkerRef = useRef(null);
  const svgOverlayRef = useRef(null);
  const svgElementRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet with CRS.Simple and buttery-smooth GPU-accelerated zooming
    const map = L.map(mapContainerRef.current, {
      crs: L.CRS.Simple,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      zoomControl: false,
      attributionControl: false,
      zoomSnap: 0.25, // 0.25 micro-increments enable GPU CSS transform scaling without thrashing DOM
      zoomDelta: 0.25, // Smooth, granular zoom steps
      wheelPxPerZoomLevel: 120, // Controlled trackpad & mouse wheel dampening
      wheelDebounceTime: 45, // Batches scroll events so GPU animation executes at full 60fps
      zoomAnimation: true,
      zoomAnimationThreshold: 4,
      fadeAnimation: true,
      maxBoundsViscosity: 1.0,
      bounceAtZoomLimits: false,
    });

    mapInstanceRef.current = map;

    // Coordinate mapping for 11667 x 8750 px canvas space (matches SVG 1584 x 1224 pt)
    const southWest = map.unproject([0, MAP_HEIGHT], NATIVE_MAX_ZOOM);
    const northEast = map.unproject([MAP_WIDTH, 0], NATIVE_MAX_ZOOM);
    const imageBounds = new L.LatLngBounds(southWest, northEast);

    // Geographic center of Kathmandu Valley transit bowl
    const valleyCenter = map.unproject([4850, 4550], NATIVE_MAX_ZOOM);

    // Calculate COVER zoom so the map fills 100% of viewport with ZERO blank borders
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

    // Center map on Kathmandu Valley at full-screen cover
    map.setView(valleyCenter, coverZoom);
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

    // 1. BASE LAYER: High-Performance Multi-Resolution Tile Pyramid (Zoom 0-6)
    // Bakes the high-res topographic relief (hills, mountain ridges, rivers) with the clean transit map
    // Delivers 60-120fps GPU texture blitting with zero DOM layout overhead
    const tileLayer = L.tileLayer('./tiles/{z}/{x}/{y}.png', {
      tileSize: 256,
      minZoom: 0,
      maxZoom: 7.5,
      maxNativeZoom: NATIVE_MAX_ZOOM,
      bounds: imageBounds,
      noWrap: true,
      keepBuffer: 8,
      updateWhenZooming: false,
      updateWhenIdle: false,
    });
    tileLayer.addTo(map);

    // 2. VECTOR ROUTE REPOSITORY: Preload SVG for on-demand 100% accurate vector route highlighting
    let svgDoc = null;
    let activeHighlightOverlay = null;

    fetch('./Kathmandu_Bus_Route_Map.svg')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.text();
      })
      .then((svgText) => {
        const parser = new DOMParser();
        svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      })
      .catch((err) => {
        console.error('Failed to preload SVG vector routes:', err);
      });

    // 3. REGIONAL GEOGRAPHIC LABELS: Cities, Gateways/Hubs, Localities, & Peaks
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

      marker.on('click', () => {
        const currentZoom = map.getZoom();
        const targetZoom = Math.max(currentZoom, item.tier === 'city' ? 3.4 : 4.0);
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
            <div class="gmap-stop-dot" style="background-color: ${placeInfo.color || '#e11d48'};"></div>
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

      marker.on('click', () => {
        marker.remove();
        targetPinMarkerRef.current = null;
      });
    };

    // --- Dynamic Zoom Visibility for Cities, Gateways/Hubs, Localities, & Mountain Peaks ---
    const updateZoomVisibility = () => {
      if (!mapInstanceRef.current || !mapContainerRef.current) return;
      const zoom = mapInstanceRef.current.getZoom();

      // 1. Primary Cities: Visible at overview & max zoom out
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

      // 3. Major Transit Hubs & Gateways: Visible at overview and medium zoom
      let hubOpacity = 1;
      if (zoom >= 5.2) {
        hubOpacity = 0;
      } else if (zoom > 4.6) {
        hubOpacity = (5.2 - zoom) / (5.2 - 4.6);
      } else {
        hubOpacity = 1;
      }

      // 4. Neighborhoods & Localities: Fades in smoothly at medium zoom (Zoom 3.8+)
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

    // --- 100% Accurate Native SVG Route Highlighting on Top of Tiles ---
    // Supports highlighting an operator group, a single route branch, or multiple selected branches simultaneously
    const highlightRoute = (operatorName, specificRouteSvgIds = null) => {
      // Remove any existing active vector highlight overlay
      if (activeHighlightOverlay) {
        map.removeLayer(activeHighlightOverlay);
        activeHighlightOverlay = null;
      }

      if (!operatorName) {
        tileLayer.setOpacity(1.0);
        return;
      }

      if (!svgDoc) return;

      const targetElements = [];

      // Normalize specificRouteSvgIds into an array of ID strings
      let idsToFind = [];
      if (Array.isArray(specificRouteSvgIds)) {
        idsToFind = specificRouteSvgIds.filter(Boolean);
      } else if (typeof specificRouteSvgIds === 'string' && specificRouteSvgIds.trim() && specificRouteSvgIds !== 'ALL') {
        idsToFind = [specificRouteSvgIds];
      }

      // Query for specific dedicated sub-routes
      if (idsToFind.length > 0) {
        idsToFind.forEach((id) => {
          const el = svgDoc.querySelector(`[id="${id}"]`);
          if (el) targetElements.push(el);
        });
      }

      // If no specific branch element was requested (or matched), fallback to the operator's common group
      if (targetElements.length === 0) {
        const svgId =
          OPERATOR_SVG_MAP[operatorName] ||
          OPERATOR_SVG_MAP[operatorName.replace(/shwar/i, 'shwor')] ||
          OPERATOR_SVG_MAP[operatorName.replace(/shwor/i, 'shwar')];
        if (svgId) {
          const groupEl = svgDoc.querySelector(`[id="${svgId}"]`);
          if (groupEl) targetElements.push(groupEl);
        }
      }

      if (targetElements.length > 0) {
        // Subtle, minimalist base map dimming and desaturation (clean transit style)
        tileLayer.setOpacity(0.42);
        if (map.getPanes()?.tilePane) {
          map.getPanes().tilePane.style.filter = 'saturate(0.55) brightness(0.98)';
        }

        // Create an isolated SVG overlay containing ONLY the target route paths (zero layout lag)
        const highlightSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        highlightSvg.setAttribute('viewBox', '0 0 1584 1224');
        highlightSvg.setAttribute('preserveAspectRatio', 'none');
        highlightSvg.setAttribute('class', 'active-route-vector-root');

        const defs = svgDoc.querySelector('defs');
        if (defs) {
          highlightSvg.appendChild(defs.cloneNode(true));
        }

        let combinedMinX = Infinity;
        let combinedMinY = Infinity;
        let combinedMaxX = -Infinity;
        let combinedMaxY = -Infinity;
        let hasValidBBox = false;

        targetElements.forEach((el) => {
          const routeClone = el.cloneNode(true);
          routeClone.classList.add('svg-route-highlighted');
          highlightSvg.appendChild(routeClone);

          try {
            const bbox = el.getBBox ? el.getBBox() : null;
            if (bbox && bbox.width > 0 && bbox.height > 0) {
              combinedMinX = Math.min(combinedMinX, bbox.x);
              combinedMinY = Math.min(combinedMinY, bbox.y);
              combinedMaxX = Math.max(combinedMaxX, bbox.x + bbox.width);
              combinedMaxY = Math.max(combinedMaxY, bbox.y + bbox.height);
              hasValidBBox = true;
            }
          } catch (e) {
            // Ignore bbox query issues safely
          }
        });

        activeHighlightOverlay = L.svgOverlay(highlightSvg, imageBounds, {
          interactive: false,
          zIndex: 1000,
        });
        activeHighlightOverlay.addTo(map);
        activeHighlightOverlay.bringToFront();

        // Smoothly fly to center of route(s) if bounding box is accessible
        if (hasValidBBox) {
          const cx = ((combinedMinX + combinedMaxX) / 2) * (MAP_WIDTH / 1584);
          const cy = ((combinedMinY + combinedMaxY) / 2) * (MAP_HEIGHT / 1224);
          const targetLatLng = map.unproject([cx, cy], NATIVE_MAX_ZOOM);
          map.flyTo(targetLatLng, Math.max(map.getZoom(), 3.5), { duration: 0.8 });
        }
      }
    };

    const clearRouteHighlight = () => {
      tileLayer.setOpacity(1.0);
      if (map.getPanes()?.tilePane) {
        map.getPanes().tilePane.style.filter = 'none';
      }
      if (activeHighlightOverlay) {
        map.removeLayer(activeHighlightOverlay);
        activeHighlightOverlay = null;
      }
    };

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
        highlightRoute,
        clearRouteHighlight,
      });
    }

    return () => {
      if (activeHighlightOverlay) {
        map.removeLayer(activeHighlightOverlay);
        activeHighlightOverlay = null;
      }
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
