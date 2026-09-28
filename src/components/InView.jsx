import { useEffect, useRef, useState } from "react";

/**
 * Event global untuk memaksa semua <InView> me-render anaknya sekaligus.
 * Dipakai saat navigasi (mis. klik menu mobile) ke section lazy yang belum
 * ter-mount — tanpa ini getElementById(target) gagal dan scroll tak terjadi.
 */
export const REVEAL_SECTIONS_EVENT = "reveal-sections";

/**
 * Render children only when the wrapper is near the viewport.
 * Used to defer heavy below-fold chunks (Skills/Github) so they don't
 * count as unused JavaScript for LCP.
 */
const InView = ({ children, rootMargin = "400px", minHeight = 200 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, rootMargin]);

  // Navigasi ke section lazy yang belum mount (menu mobile / deep-link):
  // Sidebar & App me-dispatch event ini agar target benar-benar ada di DOM.
  useEffect(() => {
    const force = () => setVisible(true);
    window.addEventListener(REVEAL_SECTIONS_EVENT, force);
    return () => window.removeEventListener(REVEAL_SECTIONS_EVENT, force);
  }, []);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
};

export default InView;
