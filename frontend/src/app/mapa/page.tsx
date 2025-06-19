"use client";

import dynamic from "next/dynamic";


const MapaInterno = dynamic(() => import("../../components/MapaLeaftlet"), {
  ssr: false,
});

export default function Page() {
  return <MapaInterno />;
}