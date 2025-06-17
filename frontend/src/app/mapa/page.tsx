'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MapaLeaflet = dynamic(() => import('@/components/MapaLeaflet'), {
  ssr: false,
});

export default function MapaPage() {
  return (
    <div className="card">
      <div className="card-header bg-success text-white">Ubicación del Inmueble</div>
      <div className="card-body" style={{ height: '400px' }}>
        <Suspense fallback={<p>Cargando mapa...</p>}>
          <MapaLeaflet />
        </Suspense>
      </div>
    </div>
  );
}