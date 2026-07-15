import { useEffect, useState } from "react";

/**
 * Replacement for react-scroll's `spy` prop.
 *
 * react-scroll highlighted the active nav item by listening to scroll and
 * comparing element offsets on every tick. This does the same job with an
 * IntersectionObserver instead — cheaper, and doesn't care whether the
 * scroll driving it is native or Lenis-smoothed.
 *
 * `rootMargin: "-40% 0px -50% 0px"` shrinks the observed viewport to a
 * thin band around its vertical center, so "active" means "currently near
 * the middle of the screen" rather than "barely visible at the edge".
 *
 * Usage:
 *   const activeId = useActiveSection(Object.values(SECTION_IDS));
 *   <a className={activeId === SECTION_IDS.about ? "active" : ""}>About</a>
 */
export const useActiveSection = (sectionIds = [], options = {}) => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: options.rootMargin ?? "-40% 0px -50% 0px",
        threshold: options.threshold ?? [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(","), options.rootMargin, options.threshold]);

  return activeId;
};