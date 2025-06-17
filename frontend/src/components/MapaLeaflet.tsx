'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export default function MapaLeaflet() {
  const coords = { lat: 19.4326, lng: -99.1332 };

  return (
    <MapContainer center={[coords.lat, coords.lng]} zoom={13} className="h-100 w-100">
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lng]}>
        <Popup>Inmueble disponible aquí</Popup>
      </Marker>
    </MapContainer>
  );
}