"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi"; 

interface Inmueble {
  id: number;
  nombre_publicacion: string;
  descripcion: string;
  direccion: string;
  barrio_colonia: string;
  tipo: string;
  precio: number;
  acepta_mascotas: boolean;
  servicios_incluidos: string;
  normas_convivencia: string;
 fotos: string[]; // 👈 esta línea

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
    <div className="container py-4">
      <h1 className="text-center text-warning mb-4 fs-2 fw-bold">Propiedades disponibles</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {inmuebles.map((inmueble) => (
          <div className="col" key={inmueble.id}>
            <div className="card h-100 shadow-sm border-0">
              {inmueble.fotos.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${inmueble.nombre_publicacion} foto ${index + 1}`}
                  style={{ height: "200px", objectFit: "cover", marginRight: 10 }}
                />
              ))}
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{inmueble.nombre_publicacion}</h5>
                  <p className="card-text">
                    <strong>Dirección:</strong> {inmueble.direccion}<br />
                    <strong>Barrio/Colonia:</strong> {inmueble.barrio_colonia}
                  </p>
                  <p><strong>Tipo:</strong> {inmueble.tipo}</p>
                  <p><strong>Descripción:</strong> {inmueble.descripcion}</p>
                  <p><strong>Servicios incluidos:</strong> {inmueble.servicios_incluidos}</p>
                  <p><strong>Normas de convivencia:</strong> {inmueble.normas_convivencia}</p>
                  <p><strong>¿Acepta mascotas?:</strong> {inmueble.acepta_mascotas ? "Si " : "No "}</p>
                  <p className="text-primary fw-semibold">
                    L {Number(inmueble.precio).toLocaleString()} / mes
                  </p>
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <Link href="/chat" className="btn btn-outline-secondary btn-sm" title="Enviar mensaje">
                    <FiMessageSquare className="me-1" /> Mensaje
                  </Link>
                  <Link href="/simulador" className="btn btn-outline-success btn-sm ms-2">
                    Rentar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
