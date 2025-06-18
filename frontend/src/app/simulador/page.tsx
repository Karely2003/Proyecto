'use client';

import { useState } from 'react';

export default function SimuladorPage() {
  const [renta, setRenta] = useState(8500);
  const [meses, setMeses] = useState(6);
  const total = renta * meses;

  return (
    <div className="card">
      <div className="card-header bg-warning text-dark">Simulación de Pago</div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Renta mensual (Lps)</label>
          <input type="number" value={renta} onChange={(e) => setRenta(+e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Meses de renta</label>
          <input type="number" value={meses} onChange={(e) => setMeses(+e.target.value)} className="form-control" />
        </div>
        <h5>Total estimado: <strong>{total.toLocaleString()} Lps</strong></h5>
      </div>
    </div>
  );
}