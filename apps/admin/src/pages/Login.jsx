import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Aperture } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="mb-8 text-center">
          <Aperture
            size={36}
            strokeWidth={1.25}
            className="mx-auto mb-4 text-safelight"
          />
          <h1 className="font-display text-3xl font-700 text-paper">
            The Safelight
          </h1>
          <p className="mt-1 font-mono text-xs tracking-wider text-ash">
            ADMIN
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-paper p-8 shadow-2xl dark:bg-night-surface"
        >
          <div className="mb-5">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ash">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-ash/25 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-safelight focus:ring-1 focus:ring-safelight/20 dark:border-ash/35 dark:bg-night dark:text-paper"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ash">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-ash/25 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-safelight focus:ring-1 focus:ring-safelight/20 dark:border-ash/35 dark:bg-night dark:text-paper"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-safelight py-2.5 text-sm font-medium text-paper transition-all hover:bg-safelight/90 disabled:opacity-50"
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
