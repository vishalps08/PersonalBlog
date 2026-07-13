import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} — Personal Blog` : "Personal Blog";
    return () => {
      document.title = previous;
    };
  }, [title]);
}