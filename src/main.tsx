import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ExhibitErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Camera Obscura Explorer caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-xl mx-auto my-12 bg-white border border-rose-300 text-stone-900 font-sans shadow-sm">
          <span className="text-xs uppercase font-mono tracking-widest text-rose-600 block mb-1">
            Display Render Exception
          </span>
          <h2 className="text-xl font-serif font-bold text-rose-950 mb-2">
            The exhibit apparatus encountered an error
          </h2>
          <pre className="p-3 bg-stone-100 text-xs font-mono text-stone-800 overflow-x-auto border border-stone-200">
            {this.state.error?.message || 'Unknown render error'}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-xs font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors"
          >
            Reload Exhibit
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ExhibitErrorBoundary>
        <App />
      </ExhibitErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Fatal: #root DOM container not found');
}
