'use client'; 
import Link from "next/link";
import React, { useState } from 'react';
import { FiMessageSquare } from "react-icons/fi"; 
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


interface Inmueble {
  id: number;
  nombre_publicacion: string;
  descripcion: string;
  direccion: string;
  barrio_colonia: string;
  tipo: 'Apartamento' | 'Casa' | 'Cuarto'; 
  precio: number;
  acepta_mascotas: boolean;
  servicios_incluidos: string;
  normas_convivencia: string;
  fotos: string[]; 
}

export default function BusquedaPage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtros, setFiltros] = useState({
    ubicacion: '',
    precioMin: '',
    precioMax: '',
    habitaciones: '',
    tipo: '',
  });
  
  const [resultados, setResultados] = useState<Inmueble[]>([]);

  const aplicarFiltros = async () => {
    console.log('Filtros aplicados:', filtros);
    setMostrarModal(false);

    const queryParams = new URLSearchParams();
    if (filtros.ubicacion) queryParams.append('ubicacion', filtros.ubicacion);
    if (filtros.precioMin) queryParams.append('precioMin', filtros.precioMin);
    if (filtros.precioMax) queryParams.append('precioMax', filtros.precioMax);
    if (filtros.tipo) queryParams.append('tipo', filtros.tipo);

    try {
     
      const response = await fetch(`http://localhost:3001/api/inmuebles/buscar?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Inmueble[] = await response.json(); 
      setResultados(data);
      console.log('Resultados de la búsqueda:', data);
    } catch (error) {
      console.error('Error al buscar inmuebles en el frontend:', error);
      setResultados([]);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">Búsqueda de propiedades</h2>

      <div className="d-flex justify-content-center mb-4">
        <Button variant="outline-primary" onClick={() => setMostrarModal(true)}>
          Abrir filtros avanzados
        </Button>
      </div>

      {resultados.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {resultados.map((inmueble) => (
            <Col key={inmueble.id}>
              <Card>
                {inmueble.fotos && inmueble.fotos.length > 0 ? (
                  <Card.Img variant="top" src={inmueble.fotos[0]} alt={inmueble.nombre_publicacion} style={{ height: '200px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '200px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    No hay foto disponible
                  </div>
                )}
               <Card.Body>
                    <Card.Title>{inmueble.nombre_publicacion}</Card.Title>
                    <Card.Text>
                      <strong>Dirección:</strong> {inmueble.direccion}, {inmueble.barrio_colonia}<br />
                      <strong>Tipo:</strong> {inmueble.tipo}<br />
                      <strong>Precio:</strong> L. {inmueble.precio.toLocaleString()}<br />
                      <strong>Mascotas:</strong> {inmueble.acepta_mascotas ? 'Sí' : 'No'}<br />
                      <small className="text-muted">{inmueble.descripcion.substring(0, 100)}...</small>
                    </Card.Text>

                    <div className="mt-3 d-flex justify-content-between">
                      <Link href={`/inmueble/${inmueble.id}`} className="btn btn-outline-primary btn-sm">
                        Ver más
                      </Link>
                      <Link href={`/chat`} className="btn btn-outline-secondary btn-sm">
                        <FiMessageSquare className="me-1" /> Mensaje
                      </Link>
                    </div>
                  </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">Aquí aparecerán los resultados de búsqueda según tus filtros. No se encontraron inmuebles con los filtros aplicados.</p>
      )}

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