import useDocumentTitle from "../hooks/useDocumentTitle";
import { Aperture } from "lucide-react";

export default function About() {
  useDocumentTitle("About");

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Aperture size={28} strokeWidth={1.25} className="mb-6 text-safelight" />
      <h1 className="mb-6 font-display text-3xl font-700 text-ink dark:text-paper">About</h1>
      <div className="space-y-4 text-ink/90 dark:text-paper/85">
        <p>
          I&rsquo;m a developer and photographer, and this is where I write about
          both &mdash; travel, the occasional lesson learned from a day of work,
          and things worth recommending, from places to books to whatever
          I&rsquo;ve been watching.
        </p>
        <p>
          Everything here &mdash; the writing, the photos, and the site itself &mdash; is
          made by hand. No CMS templates, no stock photography.
        </p>
      </div>
    </div>
  );
}