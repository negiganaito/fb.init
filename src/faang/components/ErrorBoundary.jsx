/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { Children, PureComponent } from "react";
import { ErrorPubSub } from "ErrorPubSub";
import { ErrorSerializer } from "ErrorSerializer";
import { getErrorSafe } from "getErrorSafe";
import { getReactElementDisplayName } from "getReactElementDisplayName";

class ErrorBoundary extends PureComponent {
  static getDerivedStateFromError(error) {
    return { error: getErrorSafe(error) };
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      moduleName: getModuleName(props.children),
    };
    this.suppressReactDefaultErrorLoggingIUnderstandThisWillMakeBugsHarderToFindAndFix = true;
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.error &&
      this.props.forceResetErrorCount !== prevProps.forceResetErrorCount
    ) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error, info) {
    const {
      augmentError,
      context = {},
      description = "base",
      onError,
    } = this.props;
    const { componentStack } = info;
    const { error: stateError, moduleName } = this.state;

    context.messageFormat =
      context.messageFormat || "caught error in module %s (%s)";
    context.messageParams = context.messageParams || [moduleName, description];

    if (stateError) {
      ErrorSerializer.aggregateError(stateError, {
        componentStack,
        loggingSource: "ERROR_BOUNDARY",
      });
      ErrorSerializer.aggregateError(stateError, context);

      if (typeof augmentError === "function") {
        augmentError(stateError);
      }

      ErrorPubSub.reportError(stateError);

      if (typeof onError === "function") {
        onError(stateError, moduleName);
      }
    }
  }

  render() {
    const { error, moduleName } = this.state;
    const { fallback, children } = this.props;

    if (error) {
      return fallback ? fallback(error, moduleName) : null;
    }

    return children || null;
  }
}

ErrorBoundary.defaultProps = {
  forceResetErrorCount: 0,
};

function getModuleName(children) {
  const child =
    Children.count(children) > 1 ? Children.toArray(children)[0] : children;
  return getReactElementDisplayName(child);
}

export default ErrorBoundary;
