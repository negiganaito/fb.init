/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useMemo } from "react";

import BUIPrivateSidebarNavigationContext from "../contexts/BUIPrivateSidebarNavigationContext";
import BUIPrivateThemeContext from "../contexts/BUIPrivateThemeContext";
import useBUISidebarDisplayContext from "../hooks/useBUISidebarDisplayContext";

function useSidebarLayout(isDense) {
  const themeContext = useContext(BUIPrivateThemeContext);
  const layoutType = isDense ? "dense" : "sparse";
  return themeContext.layout.sidebar[layoutType];
}

function useSidebarDensity() {
  return useContext(BUIPrivateSidebarNavigationContext);
}

function useSidebarGutter(isDense) {
  return parseInt(useSidebarLayout(isDense).gutter, 10);
}

function useSidebarWidth(isDense, isCollapsed) {
  const layout = useSidebarLayout(isDense);
  const width = layout.width;
  return parseInt(isCollapsed ? width.collapsed : width.expanded, 10);
}

function useSidebarItemWidth(isDense, isCollapsed) {
  const gutter = useSidebarGutter(isDense);
  const width = useSidebarWidth(isDense, isCollapsed);
  return width - gutter * 2;
}

function useSidebarItemStyles(isDense) {
  const layout = useSidebarLayout(isDense);
  const { itemPaddingHorz, itemPaddingVert } = layout;
  const minWidth = useSidebarItemWidth(isDense, false);

  return useMemo(
    () => ({
      paddingLeft: itemPaddingHorz,
      paddingRight: itemPaddingHorz,
      paddingTop: itemPaddingVert,
      paddingBottom: itemPaddingVert,
      minWidth,
      width: minWidth,
    }),
    [minWidth, itemPaddingHorz, itemPaddingVert]
  );
}

function useSidebarActionStyles(isDense, noPadding) {
  const itemStyles = useSidebarItemStyles(isDense);
  const { minWidth, /* width, */ ...restStyles } = itemStyles;
  const { isCollapsed } = useBUISidebarDisplayContext();
  const newWidth = useSidebarItemWidth(isDense, isCollapsed);

  return useMemo(
    () => ({
      ...restStyles,
      minWidth: isCollapsed ? "auto" : minWidth,
      width: newWidth,
      ...(!noPadding ? { paddingTop: 0, paddingBottom: 0 } : {}),
    }),
    [isCollapsed, noPadding, minWidth, restStyles, newWidth]
  );
}

function useSidebarActionListStyles(isDense) {
  const layout = useSidebarLayout(isDense);
  const { itemPaddingVert } = layout;

  return useMemo(
    () => ({
      marginTop: itemPaddingVert,
      paddingTop: itemPaddingVert,
    }),
    [itemPaddingVert]
  );
}

function useSidebarContainerStyles(isDense, isCollapsed) {
  const gutter = useSidebarGutter(isDense);
  const width = useSidebarWidth(isDense, isCollapsed);

  return useMemo(
    () => ({
      padding: gutter,
      width,
    }),
    [gutter, width]
  );
}

function useSidebarContentStyles(isDense) {
  const gutter = useSidebarGutter(isDense);

  return useMemo(
    () => ({
      paddingLeft: gutter,
      paddingRight: gutter,
      marginLeft: -gutter,
      marginRight: -gutter,
    }),
    [gutter]
  );
}

function useSidebarHeaderStyles(isDense = false) {
  const density = useSidebarDensity();
  const { isCollapsed } = useBUISidebarDisplayContext();
  const gutter = useSidebarGutter(density);
  const itemWidth = useSidebarItemWidth(density, isCollapsed);

  return {
    marginBottom: gutter,
    width: isDense ? itemWidth : undefined,
  };
}

function useSidebarFooterStyles() {
  const density = useSidebarDensity();
  const gutter = useSidebarGutter(density);

  return {
    marginTop: gutter,
  };
}

export {
  useSidebarActionListStyles,
  useSidebarActionStyles,
  useSidebarContainerStyles,
  useSidebarContentStyles,
  useSidebarDensity,
  useSidebarFooterStyles,
  useSidebarGutter,
  useSidebarHeaderStyles,
  useSidebarItemStyles,
  useSidebarItemWidth,
  useSidebarLayout,
  useSidebarWidth,
};
