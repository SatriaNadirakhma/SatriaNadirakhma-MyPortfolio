import { useEffect, useState } from "react";

/**
 * Scrollspy via IntersectionObserver that handles lazy-mounted sections.
 *
 * Previously it collected elements once at mount, so sections wrapped in
 * `InView` (lazy) were not observed until a full re-mount. Now it watches
 * the DOM for new nodes and observes them as they appear.
 */
export const useActiveSection = (sectionIds = [], options = {}) => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const observed = new Set();
    let observer = null;

    const createObserver = () => {
      observer = new IntersectionObserver(
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
    };

    const observeAll = () => {
      sectionIds.forEach((id) => {
        if (observed.has(id)) return;
        const el = document.getElementById(id);
        if (el && observer) {
          observer.observe(el);
          observed.add(id);
        }
      });
    };

    createObserver();
    observeAll();

    // Watch for lazy sections being mounted later (InView)
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    // Also poll once after a short delay for sections that mount via React.lazy
    const t = setTimeout(observeAll, 500);

    return () => {
      clearTimeout(t);
      mo.disconnect();
      if (observer) observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(","), options.rootMargin, options.threshold]);

  return activeId;
};
