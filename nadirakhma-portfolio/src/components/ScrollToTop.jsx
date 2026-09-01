import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@context/LenisContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { lenis } = useLenis();

  useEffect(() => {
    // Reset scroll on every route change — fixes "See All Projects" landing at bottom
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
    // Also ensure hash is handled after scroll reset
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (lenis) lenis.scrollTo(`#${id}`, { offset: -64 });
          else el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;
