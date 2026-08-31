import { ExternalLink } from "lucide-react";

/**
 * Quiet skill chip: bordered, no spotlight, no magnetic pull. Linked
 * skills get a pointer and a blue shift on hover; unlinked soft skills
 * stay deliberately passive.
 */
const SkillPill = ({ icon: Icon, name, url }) => {
  const content = (
    <>
      {Icon && (
        <Icon aria-hidden="true" focusable="false" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
      )}
      <span className="text-xs sm:text-sm font-normal whitespace-nowrap">{name}</span>
      {url && (
        <ExternalLink aria-hidden="true" focusable="false" className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity duration-150 shrink-0" />
      )}
    </>
  );

  const className = `group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-150 ${
    url
      ? "border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-gray-600 dark:text-white/60 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      : "border-gray-200 dark:border-white/[0.07] text-gray-500 dark:text-white/50 cursor-default"
  }`;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name}`} className={className}>
        {content}
      </a>
    );
  }
  return <span className={className}>{content}</span>;
};

export default SkillPill;
