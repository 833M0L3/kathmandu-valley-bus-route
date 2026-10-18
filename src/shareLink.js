import { BUS_SERVICES } from './data/legendData';
import { getOperatorRoutes } from './data/dedicatedRoutesData';
import { getPlaceCoordinates } from './data/placesData';

// Shareable links: the selected operator, route branches and pinned place live in the URL query,
// e.g. ?op=S&r=S1,S2&p=Lagankhel

// Reads the URL and returns only the parts that match known data
export function readShareLink(search = window.location.search) {
  const params = new URLSearchParams(search);

  const opCode = params.get('op');
  const service = opCode ? BUS_SERVICES.find((s) => s.code === opCode.toUpperCase()) || null : null;

  const branchCodes = service ? getOperatorRoutes(service.name).map((sr) => sr.code) : [];
  const subRouteCodes = (params.get('r') || '')
    .split(',')
    .map((code) => code.trim().toUpperCase())
    .filter((code) => branchCodes.includes(code));

  const placeName = params.get('p');
  const place = placeName ? getPlaceCoordinates(placeName) : null;

  return { service, subRouteCodes: [...new Set(subRouteCodes)], place };
}

export function buildShareUrl({ service, subRouteCodes, place }) {
  const url = new URL(window.location.href);
  for (const key of ['op', 'r', 'p']) url.searchParams.delete(key);
  if (service) url.searchParams.set('op', service.code);
  if (service && subRouteCodes.length > 0) url.searchParams.set('r', subRouteCodes.join(','));
  if (place) url.searchParams.set('p', place.name);
  // Keep commas readable in the link
  return url.toString().replace(/%2C/g, ',');
}

export function writeShareLink(state) {
  const next = buildShareUrl(state);
  if (next !== window.location.href) window.history.replaceState(null, '', next);
}
