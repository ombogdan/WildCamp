import React from "react";
import * as Sentry from "@sentry/react-native";
import {Fallback} from "./components/fallback/index";

class ErrorBoundary extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {error: null};

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    FallbackComponent: Fallback,
  };

  static getDerivedStateFromError(error) {
    return {error};
  }

  componentDidCatch(error, info) {
    const {onError} = this.props;
    if (typeof onError === "function") {
      onError.call(this, error, info.componentStack);
    }
    Sentry.captureException(error, {
      extra: info,
    });
  }

  resetError = () => {
    this.setState({error: null});
  };

  render() {
    const {FallbackComponent, children} = this.props;
    const {error} = this.state;

    return (
      <>
        {children}
        {error &&
          <FallbackComponent
            error={error}
            resetError={this.resetError}
          />
        }
      </>
    );
  }
}

export {ErrorBoundary};
