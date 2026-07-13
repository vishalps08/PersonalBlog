import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} — The Safelight` : "The Safelight";
    return () => {
      document.title = previous;
    };
  }, [title]);
}
