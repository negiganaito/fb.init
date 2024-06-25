// __d(
//   "GeoPrivateLoggingRegion.react",
//   [
//     "GeoPrivateLoggingRegionContext",
//     "GeoPrivateLoggingRegionHierarchyContext",
//     "react",
//     "useMergeRefs",
//     "useRefEffect",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useContext,
//       k = b.useMemo;
//     function a(a) {
//       var b = a.children,
//         d = a.inputRef,
//         e = a.isDependentRegion,
//         f = e === void 0 ? !1 : e,
//         g = a.name;
//       e = j(c("GeoPrivateLoggingRegionContext"));
//       a = e.renderer;
//       var h = e.setupElement,
//         l = j(c("GeoPrivateLoggingRegionHierarchyContext"));
//       e = k(
//         function () {
//           return l.concat(g);
//         },
//         [l, g]
//       );
//       var m = c("useRefEffect")(
//         function (a) {
//           return h == null ? void 0 : h(a, g, f);
//         },
//         [f, g, h]
//       );
//       d = c("useMergeRefs")(d, m);
//       m = b(d);
//       return i.jsx(c("GeoPrivateLoggingRegionHierarchyContext").Provider, {
//         value: e,
//         children: a != null ? a({ name: g, children: m }) : m,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, {
  useContext,
  useMemo,
  ReactNode,
  MutableRefObject,
  Ref,
} from "react";
import GeoPrivateLoggingRegionContext from "GeoPrivateLoggingRegionContext";
import GeoPrivateLoggingRegionHierarchyContext from "GeoPrivateLoggingRegionHierarchyContext";
import useMergeRefs from "useMergeRefs";
import useRefEffect from "useRefEffect";

interface GeoPrivateLoggingRegionProps {
  children: (ref: Ref<any>) => ReactNode;
  inputRef?: MutableRefObject<any> | ((instance: any) => void);
  isDependentRegion?: boolean;
  name: string;
}

const GeoPrivateLoggingRegion: React.FC<GeoPrivateLoggingRegionProps> = ({
  children,
  inputRef,
  isDependentRegion = false,
  name,
}) => {
  const { renderer, setupElement } = useContext(GeoPrivateLoggingRegionContext);
  const hierarchy = useContext(GeoPrivateLoggingRegionHierarchyContext);

  const combinedHierarchy = useMemo(
    () => hierarchy.concat(name),
    [hierarchy, name]
  );

  const refEffect = useRefEffect(
    (element: any) => setupElement?.(element, name, isDependentRegion),
    [isDependentRegion, name, setupElement]
  );

  const mergedRefs = useMergeRefs(inputRef, refEffect);

  const content = children(mergedRefs);

  return (
    <GeoPrivateLoggingRegionHierarchyContext.Provider value={combinedHierarchy}>
      {renderer ? renderer({ name, children: content }) : content}
    </GeoPrivateLoggingRegionHierarchyContext.Provider>
  );
};

GeoPrivateLoggingRegion.displayName = `${GeoPrivateLoggingRegion.name} [from some-module-id]`;

export default GeoPrivateLoggingRegion;
