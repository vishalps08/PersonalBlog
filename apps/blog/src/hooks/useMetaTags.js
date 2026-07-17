import { useEffect } from "react";

function setMeta(property, content, isName) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function useMetaTags({ title, description, image, url, type = "website" }) {
  useEffect(() => {
    if (!title) return;

    const fullTitle = `${title} — The Safelight`;

    setMeta("og:title", fullTitle, false);
    setMeta("og:type", type, false);
    setMeta("twitter:title", fullTitle, true);

    if (description) {
      setMeta("og:description", description, false);
      setMeta("twitter:description", description, true);
      setMeta("description", description, true);
    }

    if (image) {
      setMeta("og:image", image, false);
      setMeta("twitter:image", image, true);
      setMeta("twitter:card", "summary_large_image", true);
    }

    if (url) {
      setMeta("og:url", url, false);
    }

    return () => {
      setMeta("og:title", "The Safelight", false);
      setMeta("og:type", "website", false);
      setMeta("twitter:title", "The Safelight", true);
      setMeta("twitter:card", "summary", true);

      const defaults = "A personal blog about technology, travel, photography, and life — written, photographed, and built by hand.";
      setMeta("og:description", defaults, false);
      setMeta("twitter:description", defaults, true);
      setMeta("description", defaults, true);

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.remove();
      const twImage = document.querySelector('meta[name="twitter:image"]');
      if (twImage) twImage.remove();
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.remove();
    };
  }, [title, description, image, url, type]);
}
