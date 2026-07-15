import { useEffect, useRef } from "react";
import { trackPostView } from "../lib/posts";

export default function useTrackView(slug) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!slug || tracked.current) return;
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;

    tracked.current = true;
    sessionStorage.setItem(key, "1");
    trackPostView(slug).catch(() => {
      // non-critical — don't block reading if this fails
    });
  }, [slug]);
}
