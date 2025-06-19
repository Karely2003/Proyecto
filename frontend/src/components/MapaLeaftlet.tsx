"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Inmueble {
  id: number;
  nombre_publicacion: string;
  descripcion: string;
  direccion: string;
  barrio_colonia: string;
  tipo: string;
  precio: number;
  acepta_mascotas: number;
  servicios_incluidos: string;
  normas_convivencia: string;
  imagen: string;
}

export default function MapaInterno() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [filtroDireccion, setFiltroDireccion] = useState("");

  const ubicaciones: [number, number][] = [
    [14.0723, -87.1921], [15.5007, -88.027], [14.6667, -86.2167], [14.7667, -88.7833],
    [13.5899, -87.3497], [15.1372, -86.834], [14.9754, -87.6536], [15.6844, -88.0244],
    [14.1348, -87.7821], [15.6456, -88.0294], [14.8439, -87.9927], [14.0667, -87.2167],
    [14.4178, -87.6817], [14.1019, -87.2195], [15.35, -88.3667], [14.0, -87.2],
    [14.6833, -88.1], [15.0414, -87.2068], [13.8, -87.2], [14.35, -87.65],
  ];

  useEffect(() => {
    const traerInmuebles = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/inmuebles");
        const data = await res.json();
        setInmuebles(data);
      } catch (err) {
        console.error("Error al cargar inmuebles:", err);
      }
    };

    traerInmuebles();
  }, []);

  const inmueblesFiltrados =
    filtroDireccion === ""
      ? inmuebles
      : inmuebles.filter((i) => i.direccion === filtroDireccion);

  const preciosUnicos = Array.from(new Set(inmueblesFiltrados.map(i => i.precio))).sort((a, b) => a - b);
  const [indicePrecio, setIndicePrecio] = useState(0);
  const precioSeleccionado = preciosUnicos[indicePrecio] || 0;

  const handleAlquilar = (id: number) => {
    alert('Has solicitado alquilar la habitación con ID: ${id}');
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", padding: "1rem", overflowY: "auto" }}>
        <h3>Habitaciones: {inmueblesFiltrados.length}</h3>
        <label>Ubicación:</label>
        <select
          onChange={(e) => {
            setFiltroDireccion(e.target.value);
            setIndicePrecio(0);
          }}
          defaultValue=""
        >
          <option value="">-- Elige una opción --</option>
          {Array.from(new Set(inmuebles.map((i) => i.direccion))).map((direccion, index) => (
            <option key={index} value={direccion}>
              {direccion}
            </option>
          ))}
        </select>

        <label>Precio</label>
        {preciosUnicos.length > 0 ? (
          <>
            <input
              type="range"
              min={0}
              max={preciosUnicos.length - 1}
              value={indicePrecio}
              onChange={(e) => setIndicePrecio(Number(e.target.value))}
            />
            <p>
              {preciosUnicos[0]} - {preciosUnicos[preciosUnicos.length - 1]} Lps |
              Seleccionado: {precioSeleccionado} Lps
            </p>
          </>
        ) : (
          <p>No hay precios disponibles</p>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <MapContainer
          center={ubicaciones[0]}
          zoom={9}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {inmueblesFiltrados.map((inmueble, index) => {
            const [lat, lng] = ubicaciones[index % ubicaciones.length];
            return (
              <Marker key={inmueble.id} position={[lat, lng]}>
                <Popup>
                  <strong>{inmueble.nombre_publicacion}</strong><br />
                  {inmueble.descripcion}<br />
                  {inmueble.direccion}<br />
                  {inmueble.precio} Lps<br />
                  <button onClick={() => handleAlquilar(inmueble.id)}>Alquilar</button>
                </Popup>
              </Marker>
            );
          })}
          <Circle
            center={ubicaciones[0]}
            radius={20000}
            pathOptions={{ color: "blue", fillColor: "lightblue", fillOpacity: 0.3 }}
          />
        </MapContainer>
      </div>
    </div>
  );
}