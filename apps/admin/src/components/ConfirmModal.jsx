import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-paper p-6 shadow-2xl animate-scale-in dark:bg-night-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-safelight/10">
            <AlertTriangle size={20} className="text-safelight" />
          </div>
          <div>
            <h3 className="font-display text-base font-600 text-ink dark:text-paper">
              {title}
            </h3>
            <p className="mt-0.5 text-sm text-ash">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-ash/25 px-4 py-2 text-sm text-ink transition-colors hover:bg-ash/5 dark:border-ash/35 dark:text-paper dark:hover:bg-ash/10"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-safelight px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
