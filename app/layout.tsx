import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oluwajuwon Adewuyi — Graduate Architect",
  description:
    "Architectural drafting, Revit and CAD support, visualisation, and interior design by Oluwajuwon Adewuyi.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
