"use client";

import dynamic from "next/dynamic";

// 🔄 Carga dinámica para evitar SSR
const MapaInterno = dynamic(() => import("../../components/MapaLeaftlet"), {
  ssr: false,
});

export default function Page() {
  return <MapaInterno />;
}