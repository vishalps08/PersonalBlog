import { Component } from "react";
import { AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-paper px-4 dark:bg-night">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-safelight/10">
            <AlertTriangle size={28} className="text-safelight" />
          </div>
          <h1 className="font-display text-xl font-600 text-ink dark:text-paper">
            Something went wrong
          </h1>
          <p className="text-sm text-ash">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
            className="rounded-lg bg-safelight px-5 py-2.5 text-sm font-medium text-paper transition-all hover:bg-safelight/90"
          >
            Back to dashboard
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
