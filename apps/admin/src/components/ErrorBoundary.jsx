import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center bg-paper dark:bg-night">
          <h1 className="mb-4 font-display text-2xl font-700 text-ink dark:text-paper">
            Something went wrong
          </h1>
          <p className="mb-6 text-ash">An unexpected error occurred.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
            className="rounded bg-safelight px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Back to dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
