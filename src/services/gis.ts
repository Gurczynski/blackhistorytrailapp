// Simple GIS API client for fetching parks and other geospatial features
// Replace BASE_URL and endpoints with your actual GIS service.

export interface GisPark {
  id: number;
  name: string;
  description?: string;
  address?: string;
  latitude: number;
  longitude: number;
}

const BASE_URL = process.env.EXPO_PUBLIC_GIS_BASE_URL || '';
const GIS_TOKEN = process.env.EXPO_PUBLIC_GIS_TOKEN || '';

export async function fetchParksFromGis(signal?: AbortSignal): Promise<GisPark[]> {
  if (!BASE_URL) {
    // No configured GIS URL; return empty list so caller can fallback to bundled data
    return [];
  }
  // Example endpoint: `${BASE_URL}/parks`
  const url = `${BASE_URL.replace(/\/$/, '')}/parks`;
  const headers: Record<string, string> = { 'Accept': 'application/json' };
  if (GIS_TOKEN) headers['Authorization'] = `Bearer ${GIS_TOKEN}`;
  const res = await fetch(url, { signal, headers });
  if (!res.ok) {
    throw new Error(`GIS fetch failed: ${res.status}`);
  }
  const data = await res.json();
  // Expecting an array; map to GisPark shape if needed
  return (Array.isArray(data) ? data : []).map((p: any, i: number) => ({
    id: Number(p.id ?? i + 1),
    name: String(p.name ?? 'Park'),
    description: p.description ?? '',
    address: p.address ?? '',
    latitude: Number(p.latitude ?? p.lat ?? 0),
    longitude: Number(p.longitude ?? p.lng ?? p.lon ?? 0),
  }));
}
