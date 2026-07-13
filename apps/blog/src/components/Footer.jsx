import { Link } from "react-router-dom";
import { Mail, Globe } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Mail, href: "mailto:you@example.com", label: "Email" },
  { icon: Globe, href: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
  { icon: Globe, href: "https://instagram.com/your-handle", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ash/15 py-8 dark:border-ash/25">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
        <p className="font-mono text-xs text-ash">
          &copy; {new Date().getFullYear()} &middot;{" "}
          <Link to="/about" className="hover:text-ink dark:hover:text-paper">
            written, photographed, and built by hand
          </Link>
        </p>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-ash transition-colors hover:text-safelight"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}