import { ArrowUp } from "lucide-react";
import { useLenis } from "@context/LenisContext";

/**
 * Back-to-top — a quiet bordered control, no progress ring, no magnetic
 * pull. One job, clearly labelled.
 */
const BackToTopButton = () => {
  const { lenis } = useLenis();

  return (
    <button
      onClick={() => lenis?.scrollTo(0, { duration: 1.2 })}
      aria-label="Back to top"
      className="inline-flex items-center gap-1.5 rounded-[4px] border border-gray-300 dark:border-white/15 px-3 py-1.5 text-xs font-normal text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:border-gray-500 dark:hover:border-white/35 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <ArrowUp className="w-3 h-3" />
      Back to top
    </button>
  );
};

export default BackToTopButton;
