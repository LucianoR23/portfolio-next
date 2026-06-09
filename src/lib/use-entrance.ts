"use client";

import { useEffect, useState } from "react";

// Persiste durante la sesión de JS (no sobrevive a un reload completo de la
// página). Se vuelve true después del primer montaje.
let hasPlayedEntrance = false;

/**
 * Devuelve `true` solo en el primer montaje de la sesión (la primera carga de
 * la página) y `false` en montajes posteriores —por ejemplo cuando se cambia
 * de idioma con navegación soft, que re-monta el árbol—.
 *
 * Sirve para que las animaciones de entrada (framer-motion) se reproduzcan en
 * la primera impresión pero NO se repitan al alternar EN/ES: en ese caso solo
 * cambia el texto (con su parpadeo) y el resto queda fijo en su lugar.
 */
export function useEntrance() {
  const [animate] = useState(() => !hasPlayedEntrance);

  useEffect(() => {
    hasPlayedEntrance = true;
  }, []);

  return animate;
}
