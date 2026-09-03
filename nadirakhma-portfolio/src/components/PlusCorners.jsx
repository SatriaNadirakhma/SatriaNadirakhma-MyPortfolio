/**
 * Blueprint plus corners — Stripe ledger style.
 * Four small crosses at the outer corners of a bordered container.
 * Parent must be `relative`. Corners sit on the top layer (z-20)
 * so content/backgrounds never cover them.
 */
const PlusCorners = ({ className = "text-gray-300 dark:text-white/15" }) => {
  return (
    <>
      <span aria-hidden="true" className={`absolute -top-1.5 -left-1.5 z-20 w-3 h-3 pointer-events-none ${className}`}>
        <span className="absolute top-1/2 left-0 w-3 h-px bg-current -translate-y-1/2" />
        <span className="absolute left-1/2 top-0 w-px h-3 bg-current -translate-x-1/2" />
      </span>
      <span aria-hidden="true" className={`absolute -top-1.5 -right-1.5 z-20 w-3 h-3 pointer-events-none ${className}`}>
        <span className="absolute top-1/2 left-0 w-3 h-px bg-current -translate-y-1/2" />
        <span className="absolute left-1/2 top-0 w-px h-3 bg-current -translate-x-1/2" />
      </span>
      <span aria-hidden="true" className={`absolute -bottom-1.5 -left-1.5 z-20 w-3 h-3 pointer-events-none ${className}`}>
        <span className="absolute top-1/2 left-0 w-3 h-px bg-current -translate-y-1/2" />
        <span className="absolute left-1/2 top-0 w-px h-3 bg-current -translate-x-1/2" />
      </span>
      <span aria-hidden="true" className={`absolute -bottom-1.5 -right-1.5 z-20 w-3 h-3 pointer-events-none ${className}`}>
        <span className="absolute top-1/2 left-0 w-3 h-px bg-current -translate-y-1/2" />
        <span className="absolute left-1/2 top-0 w-px h-3 bg-current -translate-x-1/2" />
      </span>
    </>
  );
};

export default PlusCorners;
