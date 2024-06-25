// __d(
//   "GeoPrivateBasePortal.react",
//   [
//     "CometVisualCompletionAttributes",
//     "ExecutionEnvironment",
//     "GeoPrivateBaseDOMContainer.react",
//     "GeoPrivateBasePortalTargetContext",
//     "Promise",
//     "ReactDOMComet",
//     "WebDriverConfig",
//     "cr:2443",
//     "cr:6754",
//     "err",
//     "react",
//     "useStable",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j,
//       k = j || (j = d("react")),
//       l = j.useContext;
//     function a(a) {
//       var e = a.children;
//       a = a.target;
//       var f = l(c("GeoPrivateBasePortalTargetContext"));
//       a = a || f;
//       f = c("useStable")(function () {
//         return (i || (i = c("ExecutionEnvironment"))).canUseDOM
//           ? document.createElement("div")
//           : null;
//       });
//       if (!(i || (i = c("ExecutionEnvironment"))).canUseDOM)
//         throw (h || (h = b("Promise"))).reject();
//       if (a == null) return null;
//       e = e;
//       c("WebDriverConfig").isJestE2ETestRun &&
//         b("cr:6754") != null &&
//         b("cr:2443") != null &&
//         (e = k.jsx(k.Suspense, {
//           fallback: null,
//           suspenseCallback: function (a) {
//             a =
//               (a =
//                 b("cr:2443").HeroPlaceholderUtils.createThenableDescription(
//                   a
//                 )) != null
//                 ? a
//                 : "";
//             b("cr:6754")("react").mustfix(
//               "[FB ONLY] GeoPrivateBasePortal unexpectedly suspended by %s",
//               a
//             );
//             throw c("err")(
//               "[FB ONLY] GeoPrivateBasePortal is suspended by `" +
//                 a +
//                 "`. A suspense fallback outside of the modal would be showing unexpectedly. Please wrap the suspended component with a suspense boundary. See https://fburl.com/wiki/e0vmgfv2"
//             );
//           },
//           children: e,
//         }));
//       return d("ReactDOMComet").createPortal(
//         k.jsxs(
//           "div",
//           babelHelpers["extends"](
//             {},
//             c("CometVisualCompletionAttributes").IGNORE,
//             {
//               children: [
//                 k.jsx(c("GeoPrivateBasePortalTargetContext").Provider, {
//                   value: f,
//                   children: e,
//                 }),
//                 k.jsx(c("GeoPrivateBaseDOMContainer.react"), { node: f }),
//               ],
//             }
//           )
//         ),
//         a
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import {
  CometVisualCompletionAttributes,
  ExecutionEnvironment,
  GeoPrivateBaseDOMContainer,
  GeoPrivateBasePortalTargetContext,
  WebDriverConfig,
  err,
} from "some-module";
import { createPortal, Suspense } from "react-dom";
import React, { useContext } from "react";
import useStable from "some-useStable-hook";
import { HeroPlaceholderUtils, mustfix } from "some-cr-modules";

interface GeoPrivateBasePortalProps {
  children: React.ReactNode;
  target?: Element | null;
}

const GeoPrivateBasePortal: React.FC<GeoPrivateBasePortalProps> = ({
  children,
  target,
}) => {
  const contextTarget = useContext(GeoPrivateBasePortalTargetContext);
  const portalTarget = target || contextTarget;

  const node = useStable(() => {
    return ExecutionEnvironment.canUseDOM
      ? document.createElement("div")
      : null;
  });

  if (!ExecutionEnvironment.canUseDOM) {
    throw Promise.reject();
  }

  if (portalTarget == null) return null;

  let content = children;

  if (
    WebDriverConfig.isJestE2ETestRun &&
    HeroPlaceholderUtils != null &&
    mustfix != null
  ) {
    content = (
      <Suspense
        fallback={null}
        suspenseCallback={(suspenseCallbackArg) => {
          const description =
            HeroPlaceholderUtils.createThenableDescription(
              suspenseCallbackArg
            ) || "";
          mustfix(
            "[FB ONLY] GeoPrivateBasePortal unexpectedly suspended by %s",
            description
          );
          throw err(
            `[FB ONLY] GeoPrivateBasePortal is suspended by \`${description}\`. A suspense fallback outside of the modal would be showing unexpectedly. Please wrap the suspended component with a suspense boundary. See https://fburl.com/wiki/e0vmgfv2`
          );
        }}
      >
        {children}
      </Suspense>
    );
  }

  return createPortal(
    <div {...CometVisualCompletionAttributes.IGNORE}>
      <GeoPrivateBasePortalTargetContext.Provider value={node}>
        {content}
      </GeoPrivateBasePortalTargetContext.Provider>
      <GeoPrivateBaseDOMContainer node={node} />
    </div>,
    portalTarget
  );
};

GeoPrivateBasePortal.displayName = `${GeoPrivateBasePortal.name} [from some-module-id]`;

export default GeoPrivateBasePortal;
