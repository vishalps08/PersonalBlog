import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  const items = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) {
      items.push(i);
    } else if (items[items.length - 1] !== "...") {
      items.push("...");
    }
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded p-1.5 text-ash transition-colors hover:text-ink disabled:opacity-30 dark:hover:text-paper"
      >
        <ChevronLeft size={18} />
      </button>
      {items.map((item, idx) =>
        item === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-ash">
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`min-w-[32px] rounded px-2 py-1 font-mono text-xs transition-colors ${
              item === page
                ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                : "text-ash hover:text-ink dark:hover:text-paper"
            }`}
          >
            {item}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        className="rounded p-1.5 text-ash transition-colors hover:text-ink disabled:opacity-30 dark:hover:text-paper"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
