export default function StatusBadge({ status }) {
  const isPublished = status === "published";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs ${
        isPublished ? "bg-safelight/10 text-safelight" : "bg-ash/10 text-ash"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPublished ? "bg-safelight" : "bg-ash"
        }`}
      />
      {status}
    </span>
  );
}