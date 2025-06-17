import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const propiedadesDemo = [
  {
    id: '1',
    titulo: 'Casa en San Pedro Sula',
    descripcion: '3 habitaciones, 2 baños, amplio jardín.',
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    precio: 'L 15,000 / mes',
  },
  {
    id: '2',
    titulo: 'Apartamento en Tegucigalpa',
    descripcion: '2 habitaciones, 1 baño, cocina equipada.',
    imagen: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    precio: 'L 10,500 / mes',
  },
];

export default function ResultadosPage() {
  return (
    <div className="container py-5">
      <h2 className="text-primary mb-4">Resultados de Búsqueda</h2>
      <div className="row">
        {propiedadesDemo.map((prop) => (
          <div className="col-md-6 mb-4" key={prop.id}>
            <div className="card h-100 shadow">
              <img src={prop.imagen} className="card-img-top" alt={prop.titulo} />
              <div className="card-body">
                <h5 className="card-title">{prop.titulo}</h5>
                <p className="card-text">{prop.descripcion}</p>
                <p className="text-primary fw-bold">{prop.precio}</p>
                <a href={`/inmueble/${prop.id}`} className="btn btn-outline-primary btn-sm">
                  Ver detalles
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
