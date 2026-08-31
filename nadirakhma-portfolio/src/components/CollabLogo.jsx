/**
 * Collaboration logo — a quiet link: dimmed at rest, full strength on
 * hover. No magnetic pull, no spotlight; the rail does its job through
 * spacing and a hairline, like everything else on the page.
 */
const CollabLogo = ({ src, alt, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="group inline-flex items-center justify-center rounded-[4px] p-2 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width="80"
        height="32"
        className="h-8 sm:h-10 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-150"
      />
    </a>
  );
};

export default CollabLogo;
