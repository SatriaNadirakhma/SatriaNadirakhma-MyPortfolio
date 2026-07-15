import { useEffect } from "react";
import { useLenis } from "@context/LenisContext";

/**
 * Locks page scroll for as long as the calling component is mounted.
 *
 * Setting `overflow: hidden` on <body> alone is not enough once Lenis is
 * running: Lenis drives scroll via transform, not the native scrollbar, so
 * a wheel/trackpad gesture over a "locked" body would still move the page
 * underneath a modal. This stops the Lenis instance itself, and restores
 * both on unmount.
 *
 * Used by Champions.jsx's certificate preview and can be reused anywhere
 * else a modal/overlay needs to trap scroll.
 */
export const useScrollLock = () => {
  const { lenis } = useLenis();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);
};