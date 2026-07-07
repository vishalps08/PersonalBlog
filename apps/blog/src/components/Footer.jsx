export default function Footer() {
  return (
    <footer className="border-t border-ash/15 py-8">
      <p className="mx-auto max-w-3xl px-6 font-mono text-xs text-ash">
        © {new Date().getFullYear()} — written, photographed, and built by hand.
      </p>
    </footer>
  );
}