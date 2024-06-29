__d(
  "BizKitLeftNavSidebarBaseItem.react",
  [
    "BizKitLeftNavLinksSectionBadge.react",
    "BizKitLeftNavSidebarBaseItem_item.graphql",
    "BizKitLeftNavSidebarItemContext",
    "BizKitSidebarItem.react",
    "Image.react",
    "RelayHooks",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = i || (i = d("react"));
    e = i;
    var k = e.useCallback,
      l = e.useContext,
      m = e.useMemo,
      n = 20;
    e = j.forwardRef(a);
    function a(a, e) {
      var f,
        g = a.attachment,
        i = a.clearLCBadgeCount,
        o = a.href,
        p = a.isDisabled,
        q = a.item,
        r = a.onActivate,
        s = a.onPress,
        t = a.openInNewTab;
      a = a.value;
      var u = d("RelayHooks").useFragment(
        h !== void 0 ? h : (h = b("BizKitLeftNavSidebarBaseItem_item.graphql")),
        q
      );
      q = l(c("BizKitLeftNavSidebarItemContext"));
      var v = q.onSelectLink;
      q = q.position;
      var w = k(
          function (a, b) {
            r == null ? void 0 : r(a, b), v();
          },
          [r, v]
        ),
        x = k(
          function (a) {
            s == null ? void 0 : s(a);
          },
          [s]
        ),
        y = u.icon_prefetch_refine,
        z = u.icon_active_prefetch_refine,
        A = u.icon_disabled_prefetch_refine,
        B = m(
          function () {
            return j.jsx(c("Image.react"), { height: n, width: n, src: y });
          },
          [y]
        ),
        C = m(
          function () {
            return j.jsx(c("Image.react"), { height: n, width: n, src: z });
          },
          [z]
        ),
        D = m(
          function () {
            return j.jsx(c("Image.react"), { height: n, width: n, src: A });
          },
          [A]
        ),
        E = m(
          function () {
            var a, b;
            return j.jsx(c("BizKitLeftNavLinksSectionBadge.react"), {
              navigationItem: u,
              "data-testid": void 0,
              clearLCBadgeCount: (b = i) != null ? b : !1,
            });
          },
          [u, i]
        );
      f = (f = u.nav_accessibility_info) == null ? void 0 : f.state;
      return f === "HIDDEN"
        ? null
        : j.jsx(c("BizKitSidebarItem.react"), {
            badge: E,
            href: o,
            icon: B,
            iconActive: C,
            iconDisabled: D,
            isFirst: q === 0,
            onPress: x,
            onActivate: w,
            openInNewTab: t,
            label: (f = u.label) != null ? f : "",
            ref: e,
            value: a,
            attachment: g,
            isDisabled: p,
          });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    a = e;
    g["default"] = a;
  },
  98
);

import React, { useCallback, useContext, useMemo, forwardRef } from "react";
import { useFragment, graphql } from "relay-hooks";
import BizKitLeftNavLinksSectionBadge from "path/to/BizKitLeftNavLinksSectionBadge.react";
import BizKitLeftNavSidebarItemContext from "path/to/BizKitLeftNavSidebarItemContext";
import BizKitSidebarItem from "path/to/BizKitSidebarItem.react";
import BizKitLeftNavSidebarBaseItem_item from "BizKitLeftNavSidebarBaseItem_item";
import Image from "path/to/Image.react";

interface BizKitLeftNavSidebarBaseItemProps {
  attachment?: React.ReactNode;
  clearLCBadgeCount?: boolean;
  href?: string;
  isDisabled?: boolean;
  item: any; // Replace with the correct type if available
  onActivate?: (event: React.MouseEvent, item: any) => void;
  onPress?: (event: React.MouseEvent) => void;
  openInNewTab?: boolean;
  value?: any; // Replace with the correct type if available
}

const ICON_SIZE = 20;

const BizKitLeftNavSidebarBaseItem = forwardRef<
  HTMLDivElement,
  BizKitLeftNavSidebarBaseItemProps
>((props, ref) => {
  const {
    attachment,
    clearLCBadgeCount,
    href,
    isDisabled,
    item,
    onActivate,
    onPress,
    openInNewTab,
    value,
  } = props;

  const data = useFragment(BizKitLeftNavSidebarBaseItem_item, item);

  const sidebarItemContext = useContext(BizKitLeftNavSidebarItemContext);
  const { onSelectLink, position } = sidebarItemContext;

  const handleActivate = useCallback(
    (event: React.MouseEvent, item: any) => {
      onActivate?.(event, item);
      onSelectLink();
    },
    [onActivate, onSelectLink]
  );

  const handlePress = useCallback(
    (event: React.MouseEvent) => {
      onPress?.(event);
    },
    [onPress]
  );

  const icon = useMemo(
    () => (
      <Image
        height={ICON_SIZE}
        width={ICON_SIZE}
        src={data.icon_prefetch_refine}
      />
    ),
    [data.icon_prefetch_refine]
  );
  const iconActive = useMemo(
    () => (
      <Image
        height={ICON_SIZE}
        width={ICON_SIZE}
        src={data.icon_active_prefetch_refine}
      />
    ),
    [data.icon_active_prefetch_refine]
  );
  const iconDisabled = useMemo(
    () => (
      <Image
        height={ICON_SIZE}
        width={ICON_SIZE}
        src={data.icon_disabled_prefetch_refine}
      />
    ),
    [data.icon_disabled_prefetch_refine]
  );

  const badge = useMemo(
    () => (
      <BizKitLeftNavLinksSectionBadge
        navigationItem={data}
        clearLCBadgeCount={clearLCBadgeCount ?? false}
      />
    ),
    [data, clearLCBadgeCount]
  );

  if (data.nav_accessibility_info?.state === "HIDDEN") {
    return null;
  }

  return (
    <BizKitSidebarItem
      badge={badge}
      href={href}
      icon={icon}
      iconActive={iconActive}
      iconDisabled={iconDisabled}
      isFirst={position === 0}
      onPress={handlePress}
      onActivate={handleActivate}
      openInNewTab={openInNewTab}
      label={data.label ?? ""}
      ref={ref}
      value={value}
      attachment={attachment}
      isDisabled={isDisabled}
    />
  );
});

BizKitLeftNavSidebarBaseItem.displayName = `${BizKitLeftNavSidebarBaseItem.name}`;

export default BizKitLeftNavSidebarBaseItem;
