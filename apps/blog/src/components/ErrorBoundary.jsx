import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="mb-4 font-display text-2xl font-700 text-ink dark:text-paper">
            Something went wrong
          </h1>
          <p className="mb-6 text-ash">An unexpected error occurred.</p>
          <Link
            to="/"
            onClick={() => this.setState({ hasError: false })}
            className="font-mono text-sm text-safelight hover:underline"
          >
            &larr; Back home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
