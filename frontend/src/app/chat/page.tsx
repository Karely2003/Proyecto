"use client";
import { useState, useEffect } from "react";

interface Mensaje {
  id: number;
  remitente_id: number;
  receptor_id: number;
  contenido: string;
  fecha_envio: string;
}

export default function Chat({ remitente_id, receptor_id }: { remitente_id: number; receptor_id: number }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  useEffect(() => {
    const cargarMensajes = async () => {
      const res = await fetch(`http://localhost:3001/api/mensajes/${remitente_id}/${receptor_id}`);
      const data = await res.json();
      setMensajes(data);
    };
    cargarMensajes();

    const intervalo = setInterval(cargarMensajes, 3000);
    return () => clearInterval(intervalo);
  }, [remitente_id, receptor_id]);

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;
    await fetch("http://localhost:3001/api/mensajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remitente_id, receptor_id, contenido: nuevoMensaje }),
    });
    setNuevoMensaje("");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "1rem auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          height: "250px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "0.5rem",
          marginBottom: "1rem",
          backgroundColor: "white",
        }}
      >
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.remitente_id === remitente_id ? "right" : "left",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundColor:
                  msg.remitente_id === remitente_id ? "#d1e7dd" : "#e2e3e5",
                padding: "0.5rem",
                borderRadius: "8px",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {msg.contenido}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje"
          className="form-control"
          style={{ flexGrow: 1 }}
        />
        <button className="btn btn-primary" onClick={enviarMensaje}>
          Enviar
        </button>
      </div>
    </div>
  );
}
