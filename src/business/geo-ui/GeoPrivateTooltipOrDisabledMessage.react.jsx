// __d(
//   "GeoPrivateTooltipOrDisabledMessage.react",
//   [
//     "GeoPrivateFbtOrTooltip.react",
//     "GeoPrivateTooltipTriggerContext",
//     "GeoTooltip.react",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useMemo;
//     function a(a) {
//       var b = a["data-testid"],
//         d = a.disabledHeading,
//         e = a.disabledMessage,
//         f = a.isDisabled,
//         g = f === void 0 ? !1 : f,
//         h = a.tooltip;
//       f = a.triggerRef;
//       a = j(
//         function () {
//           return g === !0 && e != null
//             ? i.jsx(c("GeoTooltip.react"), {
//                 content: e,
//                 "data-testid": void 0,
//                 heading: d,
//               })
//             : h;
//         },
//         [b, d, e, g, h]
//       );
//       return i.jsx(c("GeoPrivateTooltipTriggerContext").Provider, {
//         value: f,
//         children: i.jsx(c("GeoPrivateFbtOrTooltip.react"), { children: a }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import GeoPrivateFbtOrTooltip from "GeoPrivateFbtOrTooltip.react";
import GeoPrivateTooltipTriggerContext from "GeoPrivateTooltipTriggerContext";
import GeoTooltip from "GeoTooltip.react";
import React, { useMemo, ReactNode, Ref } from "react";

interface GeoPrivateTooltipOrDisabledMessageProps {
  "data-testid"?: string;
  disabledHeading?: string;
  disabledMessage?: string;
  isDisabled?: boolean;
  tooltip?: ReactNode;
  triggerRef?: Ref<HTMLDivElement>;
}

const GeoPrivateTooltipOrDisabledMessage: React.FC<
  GeoPrivateTooltipOrDisabledMessageProps
> = ({
  "data-testid": dataTestId,
  disabledHeading,
  disabledMessage,
  isDisabled = false,
  tooltip,
  triggerRef,
}) => {
  const tooltipContent = useMemo(() => {
    return isDisabled && disabledMessage != null ? (
      <GeoTooltip content={disabledMessage} heading={disabledHeading} />
    ) : (
      tooltip
    );
  }, [dataTestId, disabledHeading, disabledMessage, isDisabled, tooltip]);

  return (
    <GeoPrivateTooltipTriggerContext.Provider value={triggerRef}>
      <GeoPrivateFbtOrTooltip>{tooltipContent}</GeoPrivateFbtOrTooltip>
    </GeoPrivateTooltipTriggerContext.Provider>
  );
};

GeoPrivateTooltipOrDisabledMessage.displayName =
  "GeoPrivateTooltipOrDisabledMessage [from 98]";

export default GeoPrivateTooltipOrDisabledMessage;
