'use client';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BusquedaPage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtros, setFiltros] = useState({
    ubicacion: '',
    precioMin: '',
    precioMax: '',
    habitaciones: '',
    tipo: '',
  });

  const aplicarFiltros = () => {
    console.log('Filtros aplicados:', filtros);
    setMostrarModal(false);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">Búsqueda de propiedades</h2>

      <div className="d-flex justify-content-center mb-4">
        <Button variant="outline-primary" onClick={() => setMostrarModal(true)}>
          Abrir filtros avanzados
        </Button>
      </div>

      {/* Aquí puedes mostrar resultados de búsqueda */}
      <p className="text-center text-muted">Aquí aparecerán los resultados de búsqueda según tus filtros.</p>

      {/* Modal de filtros */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filtros avanzados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. Tegucigalpa"
                value={filtros.ubicacion}
                onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rango de precio (L)</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  placeholder="Mín"
                  value={filtros.precioMin}
                  onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
                />
                <Form.Control
                  type="number"
                  placeholder="Máx"
                  value={filtros.precioMax}
                  onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Habitaciones</Form.Label>
              <Form.Select
                value={filtros.habitaciones}
                onChange={(e) => setFiltros({ ...filtros, habitaciones: e.target.value })}
              >
                <option value="">Cualquiera</option>
                <option value="1">1 Habitación</option>
                <option value="2">2 Habitaciones</option>
                <option value="3">3 o más</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de propiedad</Form.Label>
              <Form.Select
                value={filtros.tipo}
                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              >
                <option value="">Cualquiera</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="estudio">Estudio</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={aplicarFiltros}>Aplicar filtros</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
