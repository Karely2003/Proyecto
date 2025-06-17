"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PublicarPage() {
  const [form, setForm] = useState({
    nombre_publicacion: '',
    descripcion: '',
    direccion: '',
    barrio_colonia: '',
    tipo: 'Apartamento',
    precio: '',
    acepta_mascotas: false,
    servicios_incluidos: '',
    normas_convivencia: ''
  });

  const [foto, setFoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const res = await fetch("http://localhost:3001/api/inmuebles/publicar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.mensaje);
    } catch (err) {
      console.error("Error al publicar", err);
      alert("Error al publicar la propiedad");
    }
  };
  return (
    <div className="container py-5">
      <h2 className="text-primary mb-4">Publicar Propiedad</h2>
      <form style={{ maxWidth: 600 }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input type="text" className="form-control" name="nombre_publicacion" value={form.nombre_publicacion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Foto de la propiedad</label>
          <input type="file" className="form-control" onChange={(e) => setFoto(e.target.files[0])} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="descripcion" rows={3} value={form.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Barrio o Colonia</label>
          <input type="text" className="form-control" name="barrio_colonia" value={form.barrio_colonia} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select className="form-select" name="tipo" value={form.tipo} onChange={handleChange}>
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Cuarto</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" className="form-control" name="precio" value={form.precio} onChange={handleChange} />
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="acepta_mascotas" checked={form.acepta_mascotas} onChange={handleChange} />
          <label className="form-check-label">¿Acepta Mascotas?</label>
        </div>
        <div className="mb-3">
          <label className="form-label">Servicios Incluidos</label>
          <textarea className="form-control" name="servicios_incluidos" value={form.servicios_incluidos} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Normas de Convivencia</label>
          <textarea className="form-control" name="normas_convivencia" value={form.normas_convivencia} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">Publicar</button>
      </form>
    </div>
  );
}
