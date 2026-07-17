import { CATEGORIES } from "../lib/posts";

export default function CategoryFilter({ active, onChange }) {
  const options = ["All", ...CATEGORIES];
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {options.map((cat) => {
        const value = cat === "All" ? "" : cat;
        const isActive = active === value;
        return (
          <button
            key={cat}
            onClick={() => onChange(value)}
            className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
              isActive
                ? "bg-ink text-paper shadow-sm dark:bg-paper dark:text-ink"
                : "border border-ash/20 text-ash hover:border-safelight hover:text-safelight dark:border-ash/30"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
