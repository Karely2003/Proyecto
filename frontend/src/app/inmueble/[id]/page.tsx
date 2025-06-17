// src/app/inmuebles/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Inmueble {
  id: number;
  nombre_publicacion: string;
  direccion: string;
  barrio_colonia: string;
  precio: number;
  imagen: string | null;
}

export default function InmueblesPage() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);

  useEffect(() => {
    const fetchInmuebles = async () => {
      const res = await fetch("http://localhost:3001/api/inmuebles");
      const data = await res.json();
      setInmuebles(data);
    };
    fetchInmuebles();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Propiedades disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inmuebles.map((inmueble) => (
          <Link key={inmueble.id} href={`/inmueble/${inmueble.id}`} className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-200 bg-white">
            {inmueble.imagen && (
              <img src={inmueble.imagen} alt={inmueble.nombre_publicacion} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{inmueble.nombre_publicacion}</h2>
              <p className="text-sm text-gray-600 mb-2">{inmueble.barrio_colonia}, {inmueble.direccion}</p>
              <p className="text-orange-500 font-semibold text-sm">L {Number(inmueble.precio).toLocaleString()} / mes</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
