import { ReactNode } from "react";
import NavbarSelector from "@/components/NavbarSelector";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Renta Fácil",
  description: "App de renta de apartamentos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "Roboto, sans-serif" }}>
        <NavbarSelector />
        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
