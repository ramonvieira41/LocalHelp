import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface RouteMapProps {
  userLat: number;
  userLng: number;
  destLat: number;
  destLng: number;
  destinationLabel?: string;
}

export function RouteMap({ userLat, userLng, destLat, destLng, destinationLabel }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([userLat, userLng], 13);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    const userIcon = L.divIcon({
      html: '<div style="width:18px;height:18px;border-radius:50%;background:#f97316;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    const destIcon = L.divIcon({
      html: '<div style="width:18px;height:18px;border-radius:50% 50% 50% 0;background:#2563eb;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    L.marker([userLat, userLng], { icon: userIcon })
      .addTo(map)
      .bindPopup('Sua localização');

    L.marker([destLat, destLng], { icon: destIcon })
      .addTo(map)
      .bindPopup(destinationLabel || 'Profissional');

    L.polyline(
      [
        [userLat, userLng],
        [destLat, destLng],
      ],
      { color: '#2563eb', weight: 3, dashArray: '8,8' }
    ).addTo(map);

    const bounds = L.latLngBounds([
      [userLat, userLng],
      [destLat, destLng],
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [userLat, userLng, destLat, destLng, destinationLabel]);

  return <div ref={containerRef} className="h-full w-full rounded-xl" role="region" aria-label="Mapa com trajeto" />;
}
