import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Images, X, Upload, Plus } from "lucide-react";
import { uploadImage } from "../lib/posts";

export default function GalleryUploader({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  async function handleFiles(files) {
    if (!files?.length) return;
    setUploading(true);
    const uploaded = [];
    for (const file of files) {
      try {
        const res = await uploadImage(file);
        uploaded.push(res.data.image);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    if (uploaded.length) {
      onChange([...value, ...uploaded]);
      toast.success(`${uploaded.length} photo${uploaded.length > 1 ? "s" : ""} added`);
    }
    setUploading(false);
  }

  function handleFileChange(e) {
    handleFiles(Array.from(e.target.files));
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }

  function removeImage(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ash">
        <Images size={13} strokeWidth={1.5} />
        Photo gallery
        {value.length > 0 && (
          <span className="rounded-full bg-safelight/10 px-1.5 py-0.5 text-safelight">
            {value.length}
          </span>
        )}
      </label>

      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {value.map((img, i) => (
            <div
              key={img.publicId}
              className="group relative aspect-square overflow-hidden rounded-lg border border-ash/15 dark:border-ash/25"
            >
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 rounded-full bg-ink/70 p-1 text-paper opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

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
        className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed py-4 transition-all disabled:opacity-50 ${
          dragOver
            ? "border-safelight bg-safelight/5 text-safelight"
            : "border-ash/25 text-ash hover:border-safelight hover:text-safelight dark:border-ash/35"
        }`}
      >
        {uploading ? (
          <>
            <Upload size={18} strokeWidth={1.5} className="animate-bounce" />
            <span className="font-mono text-xs">Uploading...</span>
          </>
        ) : (
          <>
            <Plus size={18} strokeWidth={1.5} />
            <span className="font-mono text-xs">
              {value.length ? "Add more photos" : "Add photos"}
            </span>
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
