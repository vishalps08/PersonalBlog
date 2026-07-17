import { Link } from "react-router-dom";
import { Mail, Globe } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Mail, href: "mailto:you@example.com", label: "Email" },
  {
    icon: Globe,
    href: "https://linkedin.com/in/your-profile",
    label: "LinkedIn",
  },
  {
    icon: Globe,
    href: "https://instagram.com/your-handle",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ash/15 dark:border-ash/25">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-ash">
            &copy; {new Date().getFullYear()} &middot;{" "}
            <Link
              to="/about"
              className="transition-colors hover:text-ink dark:hover:text-paper"
            >
              written, photographed, and built by hand
            </Link>
          </p>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full p-2 text-ash transition-all duration-200 hover:bg-ash/10 hover:text-safelight dark:hover:bg-ash/20"
              >
                <Icon size={15} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
