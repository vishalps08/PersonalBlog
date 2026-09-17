import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoGallery({ images }) {
  const [lightbox, setLightbox] = useState(null);

  function prev() {
    setLightbox((i) => (i > 0 ? i - 1 : images.length - 1));
  }
  function next() {
    setLightbox((i) => (i < images.length - 1 ? i + 1 : 0));
  }
  function handleKey(e) {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "Escape") setLightbox(null);
  }

  return (
    <>
      <div className="mt-10">
        <h2 className="mb-4 font-display text-xl font-600 text-ink dark:text-paper">
          Photos
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {images.map((img, i) => (
            <button
              key={img.publicId || i}
              onClick={() => setLightbox(i)}
              className="group aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-safelight"
            >
              <img
                src={img.url}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          onKeyDown={handleKey}
          tabIndex={0}
          ref={(el) => el?.focus()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            className="absolute right-4 top-4 rounded-full bg-paper/10 p-2 text-paper transition-colors hover:bg-paper/20"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 rounded-full bg-paper/10 p-2 text-paper transition-colors hover:bg-paper/20"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={images[lightbox].url}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 rounded-full bg-paper/10 p-2 text-paper transition-colors hover:bg-paper/20"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 font-mono text-xs text-paper/60">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
