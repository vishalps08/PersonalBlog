import { useEffect, useRef } from "react";
import { trackPostView } from "../lib/posts";

export default function useTrackView(slug, onViewed) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!slug || tracked.current) return;
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;

    tracked.current = true;
    sessionStorage.setItem(key, "1");
    trackPostView(slug)
      .then((res) => {
        if (onViewed) onViewed(res.data.views);
      })
      .catch(() => {});
  }, [slug, onViewed]);
}
