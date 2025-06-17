"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegistroPage() {
  const [rolSeleccionado, setRolSeleccionado] = useState<"arrendador" | "arrendatario" | null>(null);
  const [form, setForm] = useState({ nombre_usuario: "", correo: "", contraseña: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rolSeleccionado) {
      alert("Por favor selecciona un rol.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario: form.nombre_usuario,
          correo: form.correo,
          contraseña: form.contraseña,
          Rol: rolSeleccionado,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const rolNormalizado = rolSeleccionado.toLowerCase();
        localStorage.setItem("rol", rolNormalizado);
        alert("Usuario registrado exitosamente");
        router.push("/login"); // 👈 Redirigir al login
      } else {
        alert("Error al registrar: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light p-4">
      <div className="bg-white shadow rounded p-4 p-md-5 w-100" style={{ maxWidth: 600 }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Crear cuenta</h2>
        <p className="text-center mb-4 text-muted">Selecciona tu rol:</p>

        <div className="d-flex justify-content-around mb-4">
          <div
            className={`text-center p-2 rounded ${rolSeleccionado === "arrendador" ? "border border-primary" : "border"}`}
            onClick={() => setRolSeleccionado("arrendador")}
            style={{ cursor: "pointer", width: 130 }}
          >
            <Image src="https://cdn-icons-png.flaticon.com/512/706/706830.png" alt="Arrendador" width={80} height={80} className="mb-2 rounded-circle" />
            <div className={rolSeleccionado === "arrendador" ? "text-primary fw-semibold" : "fw-semibold"}>Arrendador</div>
          </div>
          <div
            className={`text-center p-2 rounded ${rolSeleccionado === "arrendatario" ? "border border-success" : "border"}`}
            onClick={() => setRolSeleccionado("arrendatario")}
            style={{ cursor: "pointer", width: 130 }}
          >
            <Image src="https://cdn-icons-png.flaticon.com/512/706/706797.png" alt="Arrendatario" width={80} height={80} className="mb-2 rounded-circle" />
            <div className={rolSeleccionado === "arrendatario" ? "text-success fw-semibold" : "fw-semibold"}>Arrendatario</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre de usuario"
              value={form.nombre_usuario}
              onChange={(e) => setForm({ ...form, nombre_usuario: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={form.correo}
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={form.contraseña}
              onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Registrarse como {rolSeleccionado || "..."}
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}

