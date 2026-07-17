import { Eye } from "lucide-react";

export default function ViewCount({ views = 0 }) {
  return (
    <span className="inline-flex items-center gap-1 tabular-nums">
      <Eye size={13} strokeWidth={1.75} />
      {views.toLocaleString()}
    </span>
  );
}
