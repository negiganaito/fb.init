__d(
  "GeoBaseListRow.react",
  [
    "GeoBaseInteractiveRow.react",
    "GeoBaseListRowContext",
    "GeoPrivateBadgeContext",
    "GeoPrivateBaseListRowLayout.react",
    "GeoPrivateMakeComponent",
    "joinDomIDs",
    "react",
    "stylex",
    "useUniqueID",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = i || (i = d("react"));
    b = i;
    var k = b.useContext,
      l = b.useMemo,
      m = { default: { listStyle: "xe8uvvx", $$css: !0 } };
    function a(a) {
      var b = a.accessibilityRole,
        d = a.accessibilityState,
        e = a.badge,
        f = a.containerRef,
        g = a["data-testid"];
      g = a.describedBy;
      var i = a.description,
        p = a.descriptionID,
        q = a.disabledHeading,
        r = a.disabledMessage,
        s = a.hasAnimation;
      s = s === void 0 ? !1 : s;
      var t = a.id,
        u = a.isDisabled;
      u = u === void 0 ? !1 : u;
      var v = a.isFocusable;
      v = v === void 0 ? !1 : v;
      var w = a.isHighlighted;
      w = w === void 0 ? !1 : w;
      var x = a.isHoverable,
        y = a.isReadOnly;
      y = y === void 0 ? !1 : y;
      var z = a.isVisuallyFocused,
        A = a.labelID,
        B = a.link,
        C = a.loggingName,
        D = a.onFocusChange,
        E = a.onHoverChange,
        F = a.onPress,
        G = a.tooltip,
        H = a.trailingContent,
        I = a.xstyle;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "accessibilityRole",
        "accessibilityState",
        "badge",
        "containerRef",
        "data-testid",
        "describedBy",
        "description",
        "descriptionID",
        "disabledHeading",
        "disabledMessage",
        "hasAnimation",
        "id",
        "isDisabled",
        "isFocusable",
        "isHighlighted",
        "isHoverable",
        "isReadOnly",
        "isVisuallyFocused",
        "labelID",
        "link",
        "loggingName",
        "onFocusChange",
        "onHoverChange",
        "onPress",
        "tooltip",
        "trailingContent",
        "xstyle",
      ]);
      var J = k(c("GeoBaseListRowContext"));
      J = J.isNested;
      J = !J && o(b);
      var K = n(b),
        L = c("useUniqueID")();
      L = K ? L : void 0;
      A = (A = A) != null ? A : L;
      L = c("useUniqueID")();
      p = K && i != null ? ((p = p) != null ? p : L) : void 0;
      var M = c("useUniqueID")();
      L = l(
        function () {
          return { id: M, isLive: !1 };
        },
        [M]
      );
      b = j.jsx(c("GeoBaseInteractiveRow.react"), {
        accessibilityRole: b,
        accessibilityState: d,
        containerRef: f,
        "data-testid": void 0,
        describedBy: c("joinDomIDs")(g, p, e != null ? M : null),
        disabledHeading: q,
        disabledMessage: r,
        hasAnimation: s,
        id: t,
        isDisabled: u || y,
        isFocusable: v,
        isHighlighted: w,
        isHoverable: x,
        isVisuallyFocused: z,
        labelledBy: K ? A : null,
        link: B,
        loggingName: C,
        onFocusChange: D,
        onHoverChange: E,
        onPress: F,
        tooltip: G,
        xstyle: J ? null : I,
        children: j.jsx(c("GeoPrivateBadgeContext").Provider, {
          value: L,
          children: j.jsx(
            c("GeoPrivateBaseListRowLayout.react"),
            babelHelpers["extends"](
              {
                badge: e,
                description: i,
                descriptionID: p,
                isDisabled: u,
                labelID: A,
                trailingContent: H,
              },
              a
            )
          ),
        }),
      });
      return J
        ? j.jsx("div", {
            className: (h || (h = c("stylex")))(m["default"], I),
            role: "listitem",
            children: b,
          })
        : b;
    }
    a.displayName = a.name + " [from " + f.id + "]";
    function n(a) {
      return ["label"].includes(a) === !1;
    }
    function o(a) {
      return ["listitem", "option", "label"].includes(a) === !1;
    }
    e = d("GeoPrivateMakeComponent").makeGeoComponent("GeoBaseListRow", a);
    g["default"] = e;
  },
  98
);

import React, { useContext, useMemo } from "react";
import GeoBaseInteractiveRow from "GeoBaseInteractiveRow.react";
import { GeoBaseListRowContext } from "GeoBaseListRowContext";
import { GeoPrivateBadgeContext } from "GeoPrivateBadgeContext";
import GeoPrivateBaseListRowLayout from "GeoPrivateBaseListRowLayout.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { joinDomIDs } from "joinDomIDs";
import stylex from "stylex";
import { useUniqueID } from "useUniqueID";

type Props = {
  accessibilityRole?: string;
  accessibilityState?: object;
  badge?: React.ReactNode;
  containerRef?: React.Ref<HTMLDivElement>;
  "data-testid"?: string;
  describedBy?: string;
  description?: string;
  descriptionID?: string;
  disabledHeading?: string;
  disabledMessage?: string;
  hasAnimation?: boolean;
  id?: string;
  isDisabled?: boolean;
  isFocusable?: boolean;
  isHighlighted?: boolean;
  isHoverable?: boolean;
  isReadOnly?: boolean;
  isVisuallyFocused?: boolean;
  labelID?: string;
  link?: string;
  loggingName?: string;
  onFocusChange?: (focus: boolean) => void;
  onHoverChange?: (hover: boolean) => void;
  onPress?: () => void;
  tooltip?: string;
  trailingContent?: React.ReactNode;
  xstyle?: any;
};

const styles = {
  default: { listStyle: "xe8uvvx", $$css: true },
};

const GeoBaseListRow: React.FC<Props> = ({
  accessibilityRole,
  accessibilityState,
  badge,
  containerRef,
  "data-testid": dataTestId,
  describedBy,
  description,
  descriptionID,
  disabledHeading,
  disabledMessage,
  hasAnimation = false,
  id,
  isDisabled = false,
  isFocusable = false,
  isHighlighted = false,
  isHoverable,
  isReadOnly = false,
  isVisuallyFocused,
  labelID,
  link,
  loggingName,
  onFocusChange,
  onHoverChange,
  onPress,
  tooltip,
  trailingContent,
  xstyle,
  ...rest
}) => {
  const listRowContext = useContext(GeoBaseListRowContext);
  const isNested = listRowContext.isNested;
  const shouldUseListItem =
    !isNested &&
    !["listitem", "option", "label"].includes(accessibilityRole || "");
  const shouldLabel = !["label"].includes(accessibilityRole || "");
  const uniqueID = useUniqueID();
  const generatedLabelID = shouldLabel ? uniqueID : undefined;
  const finalLabelID = labelID ?? generatedLabelID;
  const descriptionUniqueID = useUniqueID();
  const finalDescriptionID =
    shouldLabel && description != null
      ? descriptionID ?? descriptionUniqueID
      : undefined;
  const badgeUniqueID = useUniqueID();
  const badgeContextValue = useMemo(
    () => ({ id: badgeUniqueID, isLive: false }),
    [badgeUniqueID]
  );

  const content = (
    <GeoBaseInteractiveRow
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      containerRef={containerRef}
      describedBy={joinDomIDs(
        describedBy,
        finalDescriptionID,
        badge ? badgeUniqueID : null
      )}
      disabledHeading={disabledHeading}
      disabledMessage={disabledMessage}
      hasAnimation={hasAnimation}
      id={id}
      isDisabled={isDisabled || isReadOnly}
      isFocusable={isFocusable}
      isHighlighted={isHighlighted}
      isHoverable={isHoverable}
      isVisuallyFocused={isVisuallyFocused}
      labelledBy={shouldLabel ? finalLabelID : null}
      link={link}
      loggingName={loggingName}
      onFocusChange={onFocusChange}
      onHoverChange={onHoverChange}
      onPress={onPress}
      tooltip={tooltip}
      xstyle={shouldUseListItem ? null : xstyle}
    >
      <GeoPrivateBadgeContext.Provider value={badgeContextValue}>
        <GeoPrivateBaseListRowLayout
          badge={badge}
          description={description}
          descriptionID={finalDescriptionID}
          isDisabled={isDisabled}
          labelID={finalLabelID}
          trailingContent={trailingContent}
          {...rest}
        />
      </GeoPrivateBadgeContext.Provider>
    </GeoBaseInteractiveRow>
  );

  return shouldUseListItem ? (
    <div className={stylex(styles.default, xstyle)} role="listitem">
      {content}
    </div>
  ) : (
    content
  );
};

GeoBaseListRow.displayName = "GeoBaseListRow";

export default makeGeoComponent("GeoBaseListRow", GeoBaseListRow);
