// __d(
//   "useMultiAssetLeftNavEffect",
//   [
//     "fbt",
//     "BizKitRouteContext",
//     "CometRelay",
//     "DownscopingToastDismissedMutation",
//     "GeoLink.react",
//     "GeoToast.react",
//     "react",
//     "useBizKitSelectedAssets",
//     "useGeoToaster",
//     "useMultiAssetLeftNavEffect_Query.graphql",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j,
//       k = j || (j = d("react"));
//     e = j;
//     var l = e.useCallback,
//       m = e.useContext,
//       n = e.useEffect,
//       o = e.useMemo,
//       p = e.useRef,
//       q = e.useState,
//       r =
//         i !== void 0 ? i : (i = b("useMultiAssetLeftNavEffect_Query.graphql"));
//     function a(a) {
//       var b, e;
//       a = d("CometRelay").useFragment(r, a);
//       var f = m(c("BizKitRouteContext")),
//         g = f.prevIsMultiAssetSelectionEnabled;
//       f = f.setIsMultiAssetSelectionEnabled;
//       var h = c("useBizKitSelectedAssets")();
//       h = h.assetsByType;
//       h = h.pageAccount.length > 1 || h.wabAccount.length > 1;
//       b =
//         (b =
//           (b = a.viewer) == null
//             ? void 0
//             : (b = b.bizkit_scoping) == null
//             ? void 0
//             : b.can_tool_use_multiple_assets) != null
//           ? b
//           : !1;
//       f(b);
//       f = t(a);
//       e =
//         (e = (e = a.page) == null ? void 0 : e.name) != null
//           ? e
//           : (e = a.whatsapp_business_account) == null
//           ? void 0
//           : e.name;
//       a = u(
//         ((a = a.viewer) == null
//           ? void 0
//           : (a = a.bizkit_user) == null
//           ? void 0
//           : a.is_downscoping_toast_dismissed) === !0
//       );
//       var i = a.dismissToast;
//       a = a.isToastDismissed;
//       s(!a && h && g === !0 && !b, f, e, i);
//     }
//     function s(a, b, d, e) {
//       var f = p(null),
//         g = c("useGeoToaster")(),
//         h = g.add,
//         i = g.remove,
//         j = l(
//           function () {
//             f.current != null && i(f.current);
//           },
//           [i]
//         );
//       g = l(
//         function () {
//           j(), e();
//         },
//         [e, j]
//       );
//       var m = v(b, d, g);
//       n(
//         function () {
//           if (!a) {
//             j();
//             return;
//           }
//           j();
//           f.current = h(
//             k.jsx(c("GeoToast.react"), {
//               "data-testid": void 0,
//               hasIcon: !1,
//               heading: m,
//             }),
//             { duration: "sticky" }
//           );
//         },
//         [h, m, i, j, a]
//       );
//     }
//     function t(a) {
//       var b,
//         d = m(c("BizKitRouteContext"));
//       d = d.setNavLabel;
//       b =
//         (b = a.viewer) == null
//           ? void 0
//           : (b = b.bizkit_scoping) == null
//           ? void 0
//           : (b = b.navigation_root_route_item) == null
//           ? void 0
//           : (b = b.local_nav_groups) == null
//           ? void 0
//           : (b = b[0]) == null
//           ? void 0
//           : (b = b.child) == null
//           ? void 0
//           : b.label;
//       a =
//         (a =
//           (a = a.viewer) == null
//             ? void 0
//             : (a = a.bizkit_scoping) == null
//             ? void 0
//             : (a = a.navigation_root_route_item) == null
//             ? void 0
//             : a.label) != null
//           ? a
//           : "";
//       b = b != null && a.length > 0 ? a + " > " + b : (b = b) != null ? b : a;
//       d(b);
//       return b;
//     }
//     function u(a) {
//       a = q(a);
//       var b = a[0],
//         c = a[1],
//         e = d("CometRelay").useRelayEnvironment();
//       a = l(
//         function () {
//           c(!0),
//             d(
//               "DownscopingToastDismissedMutation"
//             ).setDownscopingToastDismissedMutation(!0, e);
//         },
//         [e]
//       );
//       return { dismissToast: a, isToastDismissed: b };
//     }
//     function v(a, b, d) {
//       return o(
//         function () {
//           return b != null
//             ? h._(
//                 "You can only select one asset at a time in {=m2}. Based on your previous selection, we've updated your selection to {=m5}. {=m7}",
//                 [
//                   h._implicitParam(
//                     "=m2",
//                     k.jsx("strong", {
//                       children: h._("{Tool name}", [h._param("Tool name", a)]),
//                     })
//                   ),
//                   h._implicitParam(
//                     "=m5",
//                     k.jsx("strong", {
//                       children: h._("{Page name}", [h._param("Page name", b)]),
//                     })
//                   ),
//                   h._implicitParam(
//                     "=m7",
//                     k.jsx(c("GeoLink.react"), {
//                       onClick: d,
//                       showUnderline: "always",
//                       children: h._("Don't show this again"),
//                     })
//                   ),
//                 ]
//               )
//             : h._(
//                 "You can only select one asset at a time in {=m2}. Based on your previous selection, we've updated your selection. {=m4}",
//                 [
//                   h._implicitParam(
//                     "=m2",
//                     k.jsx("strong", {
//                       children: h._("{Tool name}", [h._param("Tool name", a)]),
//                     })
//                   ),
//                   h._implicitParam(
//                     "=m4",
//                     k.jsx(c("GeoLink.react"), {
//                       onClick: d,
//                       showUnderline: "always",
//                       children: h._("Don't show this again"),
//                     })
//                   ),
//                 ]
//               );
//         },
//         [b, d, a]
//       );
//     }
//     g["default"] = a;
//   },
//   226
// );

// useMultiAssetLeftNavEffect.ts

import { fbt } from "fbt";
import { BizKitRouteContext } from "BizKitRouteContext";
import { useFragment, useRelayEnvironment } from "CometRelay";
import { setDownscopingToastDismissedMutation } from "DownscopingToastDismissedMutation";
import GeoLink from "GeoLink.react";
import GeoToast from "GeoToast.react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useBizKitSelectedAssets from "useBizKitSelectedAssets";
import useGeoToaster from "useGeoToaster";
import { useMultiAssetLeftNavEffect_Query } from "useMultiAssetLeftNavEffect_Query.graphql";

type Props = {
  data: any;
};

function useMultiAssetLeftNavEffect(props: Props) {
  const { data } = props;
  const fragmentData = useFragment(useMultiAssetLeftNavEffect_Query, data);
  const {
    prevIsMultiAssetSelectionEnabled,
    setIsMultiAssetSelectionEnabled,
    setNavLabel,
  } = useContext(BizKitRouteContext);
  const { assetsByType } = useBizKitSelectedAssets();
  const isMultiAssetSelection =
    assetsByType.pageAccount.length > 1 || assetsByType.wabAccount.length > 1;

  const canToolUseMultipleAssets =
    fragmentData.viewer?.bizkit_scoping?.can_tool_use_multiple_assets ?? false;
  setIsMultiAssetSelectionEnabled(canToolUseMultipleAssets);

  const navLabel = getNavLabel(fragmentData);
  const pageName =
    fragmentData.page?.name ?? fragmentData.whatsapp_business_account?.name;
  const { dismissToast, isToastDismissed } = useToastDismissed(
    fragmentData.viewer?.bizkit_user?.is_downscoping_toast_dismissed === true
  );

  useEffect(() => {
    showLeftNavEffect(
      !isToastDismissed &&
        isMultiAssetSelection &&
        prevIsMultiAssetSelectionEnabled &&
        !canToolUseMultipleAssets,
      navLabel,
      pageName,
      dismissToast
    );
  }, [
    isToastDismissed,
    isMultiAssetSelection,
    prevIsMultiAssetSelectionEnabled,
    canToolUseMultipleAssets,
    navLabel,
    pageName,
    dismissToast,
  ]);
}

function showLeftNavEffect(
  showToast: boolean,
  toolName: string,
  pageName: string | undefined,
  dismissToast: () => void
) {
  const toastRef = useRef<string | null>(null);
  const toaster = useGeoToaster();
  const { add, remove } = toaster;

  const dismiss = useCallback(() => {
    if (toastRef.current != null) {
      remove(toastRef.current);
    }
  }, [remove]);

  const handleDismiss = useCallback(() => {
    dismiss();
    dismissToast();
  }, [dismiss, dismissToast]);

  const toastContent = useMemo(
    () => getToastContent(toolName, pageName, handleDismiss),
    [toolName, pageName, handleDismiss]
  );

  useEffect(() => {
    if (!showToast) {
      dismiss();
      return;
    }
    dismiss();
    toastRef.current = add(
      <GeoToast hasIcon={false} heading={toastContent} />,
      { duration: "sticky" }
    );
  }, [showToast, add, toastContent, remove, dismiss]);
}

function getNavLabel(fragmentData: any): string {
  const { setNavLabel } = useContext(BizKitRouteContext);
  const localNavGroups =
    fragmentData.viewer?.bizkit_scoping?.navigation_root_route_item
      ?.local_nav_groups?.[0]?.child?.label;
  const rootLabel =
    fragmentData.viewer?.bizkit_scoping?.navigation_root_route_item?.label ??
    "";

  const navLabel =
    localNavGroups != null && rootLabel.length > 0
      ? `${rootLabel} > ${localNavGroups}`
      : localNavGroups ?? rootLabel;
  setNavLabel(navLabel);
  return navLabel;
}

function useToastDismissed(initialState: boolean) {
  const [isToastDismissed, setToastDismissed] = useState(initialState);
  const environment = useRelayEnvironment();

  const dismissToast = useCallback(() => {
    setToastDismissed(true);
    setDownscopingToastDismissedMutation(true, environment);
  }, [environment]);

  return { dismissToast, isToastDismissed };
}

function getToastContent(
  toolName: string,
  pageName: string | undefined,
  handleDismiss: () => void
) {
  return pageName != null
    ? fbt(
        "You can only select one asset at a time in {=m2}. Based on your previous selection, we've updated your selection to {=m5}. {=m7}",
        [
          fbt._implicitParam(
            "=m2",
            <strong>
              {fbt("{Tool name}", [fbt.param("Tool name", toolName)])}
            </strong>
          ),
          fbt._implicitParam(
            "=m5",
            <strong>
              {fbt("{Page name}", [fbt.param("Page name", pageName)])}
            </strong>
          ),
          fbt._implicitParam(
            "=m7",
            <GeoLink onClick={handleDismiss} showUnderline="always">
              {fbt("Don't show this again")}
            </GeoLink>
          ),
        ]
      )
    : fbt(
        "You can only select one asset at a time in {=m2}. Based on your previous selection, we've updated your selection. {=m4}",
        [
          fbt._implicitParam(
            "=m2",
            <strong>
              {fbt("{Tool name}", [fbt.param("Tool name", toolName)])}
            </strong>
          ),
          fbt._implicitParam(
            "=m4",
            <GeoLink onClick={handleDismiss} showUnderline="always">
              {fbt("Don't show this again")}
            </GeoLink>
          ),
        ]
      );
}

export default useMultiAssetLeftNavEffect;
