import { LINE_SHAPES } from './data/lineShapes.js';
import { lines, stations, linesAtStop } from './tripPlanner.js';

// What is under a tap: every route line within a finger-sized distance (parallel lines in a bundle are only a few
// pixels apart, so a tap usually covers several), and the nearest stop.

function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

// Bounding box per line, to skip lines far from the tap
const shapes = lines
  .filter((line) => LINE_SHAPES[line.svgId])
  .map((line) => {
    const pieces = LINE_SHAPES[line.svgId];
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const piece of pieces) {
      for (let i = 0; i < piece.length; i += 2) {
        minX = Math.min(minX, piece[i]);
        maxX = Math.max(maxX, piece[i]);
        minY = Math.min(minY, piece[i + 1]);
        maxY = Math.max(maxY, piece[i + 1]);
      }
    }
    return { line, pieces, box: [minX, minY, maxX, maxY] };
  });

function distanceToLine({ pieces, box }, x, y, limit) {
  if (x < box[0] - limit || x > box[2] + limit || y < box[1] - limit || y > box[3] + limit) return Infinity;
  let best = Infinity;
  for (const p of pieces) {
    for (let i = 2; i < p.length; i += 2) best = Math.min(best, distanceToSegment(x, y, p[i - 2], p[i - 1], p[i], p[i + 1]));
  }
  return best;
}

/**
 * Lines within `lineTolerance` and the nearest stop within `stopTolerance` of canvas point (x, y).
 * Lines come nearest first; `stopsHere` says whether the line stops at that stop.
 */
export function findAt(x, y, lineTolerance, stopTolerance) {
  let stop = null;
  let stopDistance = stopTolerance;
  for (const st of stations) {
    const d = Math.hypot(st.x - x, st.y - y);
    if (d <= stopDistance) {
      stop = st;
      stopDistance = d;
    }
  }
  const stopLines = stop ? linesAtStop(stop) : [];
  const stopLineIds = new Set(stopLines.map((l) => l.svgId));

  const hits = [];
  for (const shape of shapes) {
    const distance = distanceToLine(shape, x, y, lineTolerance);
    if (distance <= lineTolerance) hits.push({ line: shape.line, distance, stopsHere: stopLineIds.has(shape.line.svgId) });
  }
  hits.sort((a, b) => a.distance - b.distance || a.line.label.localeCompare(b.line.label, 'en', { numeric: true }));
  return { lines: hits, stop, stopLines };
}
