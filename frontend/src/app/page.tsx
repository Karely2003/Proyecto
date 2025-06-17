import Image from "next/image";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-orange-50 p-4 sm:p-12 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-4 p-6 sm:p-12 text-center border border-orange-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Renta Fácil Logo"
            width={150}
            height={150}
            className="rounded-circle border border-secondary"
            priority
          />
        </div>

        {/* Título */}
        <h1 className="display-4 fw-bold text-orange-600 mb-3">
          Bienvenido a <span className="text-dark">Renta Fácil</span>
        </h1>

        {/* Subtítulo */}
        <p className="lead text-muted mb-5">
          La forma rápida y segura de conectar arrendadores e inquilinos en Honduras.
        </p>

        {/* Acciones por rol */}
        <div className="d-grid gap-3 mb-4">
          <a href="/registro" className="btn btn-warning btn-lg">
            Soy nuevo: Registrarme
          </a>
          <a href="/login" className="btn btn-outline-primary btn-lg">
            Ya tengo cuenta: Iniciar sesión
          </a>
          <a href="/busqueda" className="btn btn-outline-secondary btn-lg">
            Explorar inmuebles
          </a>
        </div>

        {/* Info adicional */}
        <div className="text-muted mt-4 small">
          Plataforma diseñada para hacer más fácil el proceso de alquiler — estés buscando un hogar o querés publicar el tuyo.
        </div>
      </div>
    </main>
  );
}
