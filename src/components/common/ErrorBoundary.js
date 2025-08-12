import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-4 right-4 p-4 bg-red-500/90 text-white rounded-lg shadow-lg max-w-sm">
          <h3 className="font-semibold mb-2">Navigation Error</h3>
          <p className="text-sm opacity-90">Touch navigation temporarily unavailable</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;