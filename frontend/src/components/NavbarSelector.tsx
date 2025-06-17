"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarGeneral from "./NavbarGeneral";
import NavbarArrendador from "./NavbarArrendador";
import NavbarArrendatario from "./NavbarArrendatario";

export default function NavbarSelector() {
  const [rol, setRol] = useState<string | null>(null);
  const [cargado, setCargado] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    setRol(rolGuardado?.toLowerCase() || null);
    setCargado(true);
  }, []);

  if (!cargado) return null;
  if (pathname === "/login" || pathname === "/registro") return null;

  if (rol === "arrendador") return <NavbarArrendador />;
  if (rol === "arrendatario") return <NavbarArrendatario />;
  return <NavbarGeneral/>;
}
