"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function NavbarArrendatario() {
  const router = useRouter();

const cerrarSesion = () => {
  localStorage.removeItem("rol");
  router.push("/");
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ fontFamily: "Roboto, sans-serif" }}>
      <div className="container d-flex align-items-center gap-2">
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
          <Image
            src="/images/logo.png"
            alt="Renta Fácil Logo"
            width={120}
            height={40}
            style={{ objectFit: "contain" }}
            className="rounded"
            priority
          />
          <span className="fw-bold">Renta Fácil</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/busqueda">Búsqueda</a></li>
            <li className="nav-item"><a className="nav-link" href="/resultados">Resultados</a></li>
            <li className="nav-item"><a className="nav-link" href="/inmueble/1">Inmueble</a></li>
            <li className="nav-item"><a className="nav-link" href="/chat">Chat</a></li>
            <li className="nav-item"><a className="nav-link" href="/simulador">Simulador</a></li>
            <li className="nav-item"><a className="nav-link" href="/mapa">Mapa</a></li>
            <li className="nav-item"><button onClick={cerrarSesion} className="btn btn-outline-light ms-3">Cerrar sesión</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
