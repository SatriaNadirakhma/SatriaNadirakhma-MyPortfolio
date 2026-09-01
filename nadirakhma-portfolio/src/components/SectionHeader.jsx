/**
 * The repeating section-header pattern, Stripe-style: a small uppercase
 * label, then a whisper-weight heading, with the supporting paragraph
 * bottom-aligned in the right column. Everything left-aligned; the label
 * carries the section's orientation color where the content calls for it
 * (emerald = Experience, orange = Champions).
 */
const SectionHeader = ({ label, title, description, labelClassName = "", children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
      <div>
        <p className={`section-label mb-4 ${labelClassName}`}>{label}</p>
        <h2
          className="font-modern font-light text-gray-900 dark:text-white leading-[1.08] tracking-[-0.02em]"
          style={{ fontSize: "clamp(32px, 3.8vw, 46px)" }}
        >
          {title}
        </h2>
      </div>
      {(description || children) && (
        <div className="flex flex-col gap-6">
          {description && (
            <p className="text-lg sm:text-xl font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-md">
              {description}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
