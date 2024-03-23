import React, { Component, ErrorInfo } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    this.setState((state) => ({ ...state, hasError: true }));
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log("COMPONENT DID CATCH TRIGGERRED!!!!!!!");
    this.setState((state) => ({ ...state, error, info, hasError: true }));
  }

  render() {
    console.log("LOADING ERROR PROPS HERE IS ", this.props);
    console.log("LOADING ERROR STATE-- HERE IS ", this.state);

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
