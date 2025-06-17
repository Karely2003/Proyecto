'use client';

export default function ChatPage() {
  return (
    <div className="card">
      <div className="card-header bg-info text-white">Contáctanos</div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Tu nombre</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows={3}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
}