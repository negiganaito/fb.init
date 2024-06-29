// __d(
//   "getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED",
//   ["Locale"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = d("Locale").isRTL();
//     function a(a) {
//       var b = a.adjustment,
//         c = a.align,
//         d = a.contextRect,
//         e = a.fixed,
//         f = a.offsetRect;
//       a = a.position;
//       e = {
//         height: void 0,
//         position: e ? "fixed" : "absolute",
//         transform: "",
//         width: void 0,
//       };
//       var g = 0,
//         i = 0,
//         j = 0,
//         k = 0,
//         l = (d.bottom + d.top) / 2,
//         m = (d.left + d.right) / 2,
//         n = h ? "start" : "end",
//         o = h ? "end" : "start";
//       switch (a) {
//         case "above":
//           i = d.top - f.top;
//           k = "-100%";
//           break;
//         case "below":
//           i = d.bottom - f.top;
//           break;
//         case o:
//           g = d.left - f.left;
//           j = "-100%";
//           break;
//         case n:
//           g = d.right - f.left;
//           break;
//       }
//       if (a === "start" || a === "end")
//         switch (c) {
//           case "start":
//             i = d.top - f.top;
//             break;
//           case "middle":
//             i = l - f.top;
//             k = "-50%";
//             break;
//           case "end":
//             i = d.bottom - f.top;
//             k = "-100%";
//             break;
//           case "stretch":
//             i = d.top - f.top;
//             e.height = d.bottom - d.top + "px";
//             break;
//         }
//       else if (a === "above" || a === "below")
//         switch (c) {
//           case o:
//             g = d.left - f.left;
//             break;
//           case "middle":
//             g = m - f.left;
//             j = "-50%";
//             break;
//           case n:
//             g = d.right - f.left;
//             j = "-100%";
//             break;
//           case "stretch":
//             g = d.left - f.left;
//             e.width = d.right - d.left + "px";
//             break;
//         }
//       b != null &&
//         (a === "start" || a === "end"
//           ? (i += b)
//           : (a === "above" || a === "below") && (g += b));
//       l = "";
//       (g !== 0 || i !== 0) &&
//         (l += "translate(" + Math.round(g) + "px, " + Math.round(i) + "px) ");
//       (j !== 0 || k !== 0) && (l += "translate(" + j + ", " + k + ") ");
//       e.transform = l;
//       return e;
//     }
//     g["default"] = a;
//   },
//   98
// );

import { Locale } from "Locale";

interface ContextualLayerPositioningStylesArgs {
  adjustment?: number;
  align?: "start" | "middle" | "end" | "stretch";
  contextRect: DOMRect;
  fixed?: boolean;
  offsetRect: DOMRect;
  position: "above" | "below" | "start" | "end";
}

interface PositioningStyles {
  height?: string;
  position: string;
  transform: string;
  width?: string;
}

const getGeoPrivateBaseContextualLayerPositioningStyles = ({
  adjustment,
  align,
  contextRect,
  fixed,
  offsetRect,
  position,
}: ContextualLayerPositioningStylesArgs): PositioningStyles => {
  const isRTL = Locale.isRTL();

  const styles: PositioningStyles = {
    height: undefined,
    position: fixed ? "fixed" : "absolute",
    transform: "",
    width: undefined,
  };

  let translateX = 0;
  let translateY = 0;
  let translateXPercent = 0;
  let translateYPercent = 0;

  const contextCenterY = (contextRect.bottom + contextRect.top) / 2;
  const contextCenterX = (contextRect.left + contextRect.right) / 2;
  const horizontalStart = isRTL ? "start" : "end";
  const horizontalEnd = isRTL ? "end" : "start";

  switch (position) {
    case "above":
      translateY = contextRect.top - offsetRect.top;
      translateYPercent = -100;
      break;
    case "below":
      translateY = contextRect.bottom - offsetRect.top;
      break;
    case horizontalEnd:
      translateX = contextRect.left - offsetRect.left;
      translateXPercent = -100;
      break;
    case horizontalStart:
      translateX = contextRect.right - offsetRect.left;
      break;
  }

  if (position === "start" || position === "end") {
    switch (align) {
      case "start":
        translateY = contextRect.top - offsetRect.top;
        break;
      case "middle":
        translateY = contextCenterY - offsetRect.top;
        translateYPercent = -50;
        break;
      case "end":
        translateY = contextRect.bottom - offsetRect.top;
        translateYPercent = -100;
        break;
      case "stretch":
        translateY = contextRect.top - offsetRect.top;
        styles.height = `${contextRect.bottom - contextRect.top}px`;
        break;
    }
  } else if (position === "above" || position === "below") {
    switch (align) {
      case horizontalEnd:
        translateX = contextRect.left - offsetRect.left;
        break;
      case "middle":
        translateX = contextCenterX - offsetRect.left;
        translateXPercent = -50;
        break;
      case horizontalStart:
        translateX = contextRect.right - offsetRect.left;
        translateXPercent = -100;
        break;
      case "stretch":
        translateX = contextRect.left - offsetRect.left;
        styles.width = `${contextRect.right - contextRect.left}px`;
        break;
    }
  }

  if (adjustment != null) {
    if (position === "start" || position === "end") {
      translateY += adjustment;
    } else if (position === "above" || position === "below") {
      translateX += adjustment;
    }
  }

  let transform = "";
  if (translateX !== 0 || translateY !== 0) {
    transform += `translate(${Math.round(translateX)}px, ${Math.round(
      translateY
    )}px) `;
  }
  if (translateXPercent !== 0 || translateYPercent !== 0) {
    transform += `translate(${translateXPercent}%, ${translateYPercent}%) `;
  }
  styles.transform = transform.trim();

  return styles;
};

export default getGeoPrivateBaseContextualLayerPositioningStyles;
