import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080808] text-gray-100 flex items-center justify-center px-5">
          <div className="text-center max-w-md">
            <h1 className="font-stylish italic text-white text-4xl mb-4">
              Something went wrong
            </h1>
            <p className="text-sm text-white/40 font-modern mb-6 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/25 rounded-full font-modern text-sm text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
