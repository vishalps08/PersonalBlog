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
    <div className="mt-12 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded-full p-2 text-ash transition-all hover:bg-ash/10 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-ash/20 dark:hover:text-paper"
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
            className={`min-w-[36px] rounded-full px-2 py-1.5 font-mono text-xs transition-all duration-200 ${
              item === page
                ? "bg-ink text-paper shadow-sm dark:bg-paper dark:text-ink"
                : "text-ash hover:bg-ash/10 hover:text-ink dark:hover:bg-ash/20 dark:hover:text-paper"
            }`}
          >
            {item}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        className="rounded-full p-2 text-ash transition-all hover:bg-ash/10 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-ash/20 dark:hover:text-paper"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
