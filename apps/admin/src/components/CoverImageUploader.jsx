import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImagePlus, X, Upload } from "lucide-react";
import { uploadImage } from "../lib/posts";

export default function CoverImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      onChange(res.data.image);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e) {
    handleFile(e.target.files?.[0]);
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  return (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-ash">
        Cover image
      </label>

      {value?.url ? (
        <div className="group relative overflow-hidden rounded-xl border border-ash/15 dark:border-ash/25">
          <img
            src={value.url}
            alt=""
            className="mx-auto max-h-72 w-full object-contain bg-ash/5 dark:bg-ash/10"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/30 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onChange(null)}
              className="rounded-full bg-ink/80 p-2 text-paper transition-transform hover:scale-110"
              title="Remove"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={`flex h-48 w-full flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed transition-all disabled:opacity-50 ${
            dragOver
              ? "border-safelight bg-safelight/5 text-safelight"
              : "border-ash/25 text-ash hover:border-safelight hover:text-safelight dark:border-ash/35"
          }`}
        >
          {uploading ? (
            <>
              <Upload size={24} strokeWidth={1.5} className="animate-bounce" />
              <span className="font-mono text-xs">Uploading...</span>
            </>
          ) : (
            <>
              <ImagePlus size={24} strokeWidth={1.5} />
              <span className="font-mono text-xs">
                Click or drag to upload
              </span>
            </>
          )}
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
