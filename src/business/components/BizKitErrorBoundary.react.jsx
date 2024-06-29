// __d(
//   "BizKitErrorBoundary.react",
//   [
//     "BizKitConstants",
//     "BizKitErrorLoggerContext",
//     "FBLogger",
//     "getErrorSafe",
//     "logBizKitError",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     a = h || d("react");
//     b = (function (a) {
//       babelHelpers.inheritsLoose(b, a);
//       function b() {
//         var b, c;
//         for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++)
//           e[f] = arguments[f];
//         return (
//           ((b = c = a.call.apply(a, [this].concat(e)) || this),
//           (c.state = { error: null }),
//           (c.suppressReactDefaultErrorLoggingIUnderstandThisWillMakeBugsHarderToFindAndFix =
//             !0),
//           b) || babelHelpers.assertThisInitialized(c)
//         );
//       }
//       b.getDerivedStateFromError = function (a) {
//         return { error: c("getErrorSafe")(a) };
//       };
//       var e = b.prototype;
//       e.componentDidCatch = function (a, b) {
//         b = b.componentStack;
//         a = c("getErrorSafe")(a);
//         a.componentStack = b;
//         b = this.context;
//         var e = this.props,
//           f = e.onError;
//         e = e.project;
//         e == null || e === d("BizKitConstants").BIZKIT_PROJECT_NAME
//           ? c("logBizKitError")(a)
//           : (b(a), c("FBLogger")(e).catching(a).mustfix(a.message));
//         f != null && f(a);
//       };
//       e.render = function () {
//         var a = this.props,
//           b = a.children;
//         a = a.fallback;
//         var c = this.state.error;
//         return c ? (typeof a === "function" ? a(c) : a) : b;
//       };
//       return b;
//     })(a.PureComponent);
//     b.contextType = c("BizKitErrorLoggerContext");
//     g["default"] = b;
//   },
//   98
// );

import BizKitConstants from "BizKitConstants";
import BizKitErrorLoggerContext from "BizKitErrorLoggerContext";
import FBLogger from "FBLogger";
import getErrorSafe from "getErrorSafe";
import logBizKitError from "logBizKitError";
import React, { PureComponent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error) => void;
  project?: string;
}

interface State {
  error: Error | null;
}

class BizKitErrorBoundary extends PureComponent<Props, State> {
  static contextType = BizKitErrorLoggerContext;
  context!: React.ContextType<typeof BizKitErrorLoggerContext>;

  state: State = { error: null };
  suppressReactDefaultErrorLoggingIUnderstandThisWillMakeBugsHarderToFindAndFix =
    true;

  static getDerivedStateFromError(error: Error) {
    return { error: getErrorSafe(error) };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    const { componentStack } = info;
    const safeError = getErrorSafe(error);
    safeError.componentStack = componentStack;

    const errorLoggerContext = this.context;
    const { onError, project } = this.props;

    if (project == null || project === BizKitConstants.BIZKIT_PROJECT_NAME) {
      logBizKitError(safeError);
    } else {
      errorLoggerContext(safeError);
      FBLogger(project).catching(safeError).mustfix(safeError.message);
    }

    if (onError != null) {
      onError(safeError);
    }
  }

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (error) {
      return typeof fallback === "function" ? fallback(error) : fallback;
    }

    return children;
  }
}

export default BizKitErrorBoundary;
