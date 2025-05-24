"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

export default function ScrollBlocker() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Detiene el scroll
    lenis.stop();

    // Lo reanuda a los 3 segundos
    const timeout = setTimeout(() => {
      lenis.start();
    }, 3500);

    // Limpieza
    return () => clearTimeout(timeout);
  }, [lenis]);

  return null; // No renderiza nada
}
