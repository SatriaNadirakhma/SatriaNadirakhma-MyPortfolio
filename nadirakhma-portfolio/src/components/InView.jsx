import { useEffect, useRef, useState } from "react";

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

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
};

export default InView;
