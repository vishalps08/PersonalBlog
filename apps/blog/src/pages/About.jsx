import useDocumentTitle from "../hooks/useDocumentTitle";
import { Aperture, Camera, Code, BookOpen } from "lucide-react";

export default function About() {
  useDocumentTitle("About");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="animate-fade-in-up">
        <Aperture
          size={32}
          strokeWidth={1.25}
          className="mb-6 text-safelight"
        />
        <h1 className="mb-8 font-display text-3xl font-700 text-ink dark:text-paper sm:text-4xl">
          About
        </h1>
        <div className="space-y-5 text-base leading-relaxed text-ink/85 dark:text-paper/80">
          <p>
            I&rsquo;m a developer and photographer, and this is where I write
            about both &mdash; travel, the occasional lesson learned from a day
            of work, and things worth recommending, from places to books to
            whatever I&rsquo;ve been watching.
          </p>
          <p>
            Everything here &mdash; the writing, the photos, and the site itself
            &mdash; is made by hand. No CMS templates, no stock photography.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3 animate-fade-in-up animate-delay-200">
        {[
          {
            icon: Code,
            title: "Building",
            text: "Full-stack development, one problem at a time.",
          },
          {
            icon: Camera,
            title: "Capturing",
            text: "Street photography and travel moments.",
          },
          {
            icon: BookOpen,
            title: "Writing",
            text: "Turning experiences into stories worth sharing.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border border-ash/15 p-5 transition-colors hover:border-safelight/30 dark:border-ash/25 dark:hover:border-safelight/30"
          >
            <Icon
              size={20}
              strokeWidth={1.5}
              className="mb-3 text-safelight"
            />
            <h3 className="mb-1 font-display text-sm font-600 text-ink dark:text-paper">
              {title}
            </h3>
            <p className="text-xs leading-relaxed text-ash">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
