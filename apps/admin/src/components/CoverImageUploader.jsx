import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImagePlus, X } from "lucide-react";
import { uploadImage } from "../lib/posts";

export default function CoverImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImage(file);
      onChange(res.data.image);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-ash">
        Cover image
      </label>

      {value?.url ? (
        <div className="group relative overflow-hidden rounded-lg border border-ash/20 dark:border-ash/30">
          <img src={value.url} alt="" className="h-64 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 rounded-full bg-ink/70 p-1.5 text-paper opacity-0 transition-opacity group-hover:opacity-100"
            title="Remove"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ash/30 text-ash transition-colors hover:border-safelight hover:text-safelight disabled:opacity-50 dark:border-ash/40"
        >
          <ImagePlus size={22} strokeWidth={1.5} />
          <span className="font-mono text-xs">
            {uploading ? "Uploading…" : "Click to upload"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}