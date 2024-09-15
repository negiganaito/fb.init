/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext, useMemo, useRef } from "react";
import { Locale } from "fbjs/lib/Locale";

import {
  hasFocusKeyboardEventPropagationStopped,
  stopFocusKeyboardEventPropagation,
} from "../../helpers/focusKeyboardEventPropagation";
import gkx from "../../helpers/gkx";

import { focusElement } from "./FocusManager";
import { useFocusWithin } from "./ReactFocusEvent.react";
import { useKeyboard } from "./ReactKeyboardEvent.react";
import { canElementTab, setElementCanTab } from "./setElementCanTab";

const DEFAULT_PAGE_JUMP_SIZE = 5;

function isSingleItem(key) {
  return key.length === 1;
}

function focusItem(query, scopeRef, event, preventScroll) {
  stopFocusKeyboardEventPropagation(event);
  const node = scopeRef.current.DO_NOT_USE_queryFirstNode(query);

  if (node !== null) {
    const activeElement = document.activeElement;
    if (activeElement !== null) {
      setElementCanTab(activeElement, false);
    }
    setElementCanTab(node, true);
    focusElement(node, { preventScroll });
    event.preventDefault();
  }
}

function getItemByTag(items, currentIndex, tag) {
  const itemCount = items.length;
  let index = currentIndex + 1;

  while (true) {
    if (index === currentIndex) return null;

    if (index > itemCount - 1) {
      index = 0;
      continue;
    }

    const item = items[index];
    if (item) {
      const { disabled, scopeRef, tag: itemTag } = item;
      const itemScope = scopeRef.current;

      if (itemScope && !disabled && itemTag === tag) {
        return item;
      }
    }

    index++;
  }
}

function handleNavigation(type, context, event, items, currentScope, query) {
  const { onNavigate } = context;

  if (onNavigate && event) {
    let stopPropagation = false;
    const currentIndex = findItemIndex(items, currentScope);

    const navigationEvent = {
      currentIndex,
      event,
      focusItem: (item, specificContainer) => {
        const containerElement = context.scopeRef.current;
        if (containerElement) {
          focusItem(specificContainer || query, containerElement, event);
        }
      },
      getItem: (index) => getPreviousItem(items, index),
      getItemByTag: (tag) => getItemByTag(items, currentIndex, tag),
      preventDefault: () => {
        stopPropagation = true;
      },
      type,
    };

    onNavigate(navigationEvent);

    if (stopPropagation) {
      return true;
    }
  }
  return false;
}

function findItemIndex(items, scope) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item && item.scopeRef.current === scope) {
      return i;
    }
  }
  return -1;
}

function getPreviousItem(context, currentScope, items) {
  const scope = context.scopeRef.current;

  if (scope === null) return null;

  if (items !== null) {
    const currentIndex = findItemIndex(items, currentScope);
    const { wrap } = context;
    const prevItem = getItemAtIndex(items, currentIndex - 1);
    return !prevItem && wrap
      ? getItemAtIndex(items, items.length - 1)
      : prevItem;
  }
  return null;
}

function getNextItem(context, currentScope, items) {
  const currentElement = context.scopeRef.current;

  if (currentElement === null) return null;

  if (items.length > 0) {
    const currentIndex = findItemIndex(items, currentScope);
    const { wrap } = context;
    const nextItem = getNextEnabledItem(items, currentIndex + 1);
    return !nextItem && wrap ? getNextEnabledItem(items, 0) : nextItem;
  }
  return null;
}

function getNextEnabledItem(items, startIndex) {
  const itemCount = items.length;

  if (startIndex > itemCount) return null;
  let index = startIndex;

  while (index < itemCount) {
    const item = items[index];
    if (gkx("21059")) {
      if (item !== null) return item.scopeRef.current;
    } else if (item !== null && !item.disabled) return item.scopeRef.current;
    index++;
  }
  return null;
}

function getItemAtIndex(items, index) {
  while (index >= 0) {
    const item = items[index];
    if (gkx("21059")) {
      if (item !== null) return item;
    } else if (item !== null && !item.disabled) return item;
    index--;
  }
  return null;
}

function getScopeAtIndex(items, index) {
  const item = getItemAtIndex(items, index);
  return item ? item.scopeRef.current : null;
}

function hasModifierKeys(event) {
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  return (
    altKey === true || ctrlKey === true || metaKey === true || shiftKey === true
  );
}

export function createFocusGroup(focusableItemQuery) {
  const Scope = React.unstable_Scope;
  const FocusGroupContext = React.createContext(null);
  const FocusItemContext = React.createContext(null);

  function FocusGroup({
    children,
    orientation,
    wrap,
    tabScopeQuery,
    allowModifiers,
    preventScrollOnFocus = false,
    pageJumpSize = DEFAULT_PAGE_JUMP_SIZE,
    onNavigate,
  }) {
    const scopeRef = useRef(null);
    const hasFocused = useRef(false);

    const contextValue = useMemo(
      () => ({
        scopeRef,
        orientation,
        wrap,
        tabScopeQuery,
        allowModifiers,
        pageJumpSize,
        preventScrollOnFocus,
        onNavigate,
      }),
      [
        orientation,
        wrap,
        tabScopeQuery,
        allowModifiers,
        pageJumpSize,
        preventScrollOnFocus,
        onNavigate,
      ]
    );

    const focusWithinProps = useMemo(
      () => ({
        onFocusWithin: (event) => {
          if (!hasFocused.current) {
            hasFocused.current = true;
            if (scopeRef.current && focusableItemQuery) {
              initializeFocusGroup(scopeRef.current, focusableItemQuery);
              setElementCanTab(event.target, true);
            }
          }
        },
      }),
      [hasFocused]
    );
    const scope = useFocusWithin(scopeRef, focusWithinProps);

    return (
      <FocusGroupContext.Provider value={contextValue}>
        <Scope ref={scope}>{children}</Scope>
      </FocusGroupContext.Provider>
    );
  }
  FocusGroup.displayName = `${FocusGroup.name}`;

  function initializeFocusGroup(scope, query) {
    const activeElement = document.activeElement;
    const nodes = scope.DO_NOT_USE_queryAllNodes(query);
    if (nodes !== null) {
      for (const node of nodes) {
        setElementCanTab(node, node === activeElement);
      }
    }
  }

  function FocusItem({ children, disabled, tag }) {
    const itemRef = useRef(null);
    const groupContext = useContext(FocusGroupContext);

    const keyboardProps = useMemo(
      () => ({
        // eslint-disable-next-line complexity
        onKeyDown: (event) => {
          if (hasFocusKeyboardEventPropagationStopped(event)) return;

          const currentScope = itemRef.current;
          if (currentScope !== null && groupContext !== null) {
            const isVertical =
              groupContext.orientation === "vertical" ||
              groupContext.orientation === "both";
            const isHorizontal =
              groupContext.orientation === "horizontal" ||
              groupContext.orientation === "both";
            const groupScope = groupContext.scopeRef.current;
            let key = event.key;
            const preventScroll = groupContext.preventScrollOnFocus;

            if (key === "Tab" && groupScope !== null) {
              const tabScopeQuery = groupContext.tabScopeQuery;
              if (tabScopeQuery) {
                if (groupContext.onNavigate) {
                  const items =
                    groupScope.getChildContextValues(FocusItemContext);
                  if (
                    handleNavigation(
                      "TAB",
                      groupContext,
                      event,
                      items,
                      currentScope,
                      tabScopeQuery
                    )
                  )
                    return;
                }
                initializeFocusGroup(groupScope, tabScopeQuery);
              }
              return;
            }

            if (hasModifierKeys(event)) {
              if (!groupContext.allowModifiers) return;
            }

            if (groupScope === null) return;

            let normalizedKey = key;
            if (Locale.isRTL()) {
              if (key === "ArrowRight") {
                normalizedKey = "ArrowLeft";
              } else if (key === "ArrowLeft") {
                normalizedKey = "ArrowRight";
              }
            }

            switch (normalizedKey) {
              case "Home": {
                const items =
                  groupScope.getChildContextValues(FocusItemContext);
                if (
                  handleNavigation(
                    "HOME",
                    groupContext,
                    event,
                    items,
                    currentScope,
                    focusableItemQuery
                  )
                )
                  return;
                const firstItemScope = getNextEnabledItem(items, 0);
                if (firstItemScope) {
                  focusItem(
                    focusableItemQuery,
                    firstItemScope,
                    event,
                    preventScroll
                  );
                  return;
                }
                break;
              }
              case "End": {
                const items =
                  groupScope.getChildContextValues(FocusItemContext);
                if (
                  handleNavigation(
                    "END",
                    groupContext,
                    event,
                    items,
                    currentScope,
                    focusableItemQuery
                  )
                )
                  return;
                const lastItemScope = getScopeAtIndex(items, items.length - 1);
                if (lastItemScope) {
                  focusItem(
                    focusableItemQuery,
                    lastItemScope,
                    event,
                    preventScroll
                  );
                  return;
                }
                break;
              }
              case "PageUp": {
                const items =
                  groupScope.getChildContextValues(FocusItemContext);
                if (
                  handleNavigation(
                    "PAGE_UP",
                    groupContext,
                    event,
                    items,
                    currentScope,
                    focusableItemQuery
                  )
                )
                  return;
                const pageJumpSize = groupContext.pageJumpSize;
                const currentIndex = findItemIndex(items, currentScope);
                const targetScope = getNextEnabledItem(
                  items,
                  Math.max(0, currentIndex - pageJumpSize)
                );
                if (targetScope) {
                  focusItem(
                    focusableItemQuery,
                    targetScope,
                    event,
                    preventScroll
                  );
                  return;
                }
                break;
              }
              case "PageDown": {
                const items =
                  groupScope.getChildContextValues(FocusItemContext);
                if (
                  handleNavigation(
                    "PAGE_DOWN",
                    groupContext,
                    event,
                    items,
                    currentScope,
                    focusableItemQuery
                  )
                )
                  return;
                const pageJumpSize = groupContext.pageJumpSize;
                const currentIndex = findItemIndex(items, currentScope);
                const targetScope = getScopeAtIndex(
                  items,
                  Math.min(items.length - 1, currentIndex + pageJumpSize)
                );
                if (targetScope) {
                  focusItem(
                    focusableItemQuery,
                    targetScope,
                    event,
                    preventScroll
                  );
                  return;
                }
                break;
              }
              case "ArrowUp":
                if (isVertical) {
                  const items =
                    groupScope.getChildContextValues(FocusItemContext);
                  if (
                    handleNavigation(
                      "PREV_ITEM",
                      groupContext,
                      event,
                      items,
                      currentScope,
                      focusableItemQuery
                    )
                  )
                    return;
                  const targetScope =
                    event.metaKey || event.ctrlKey
                      ? getNextEnabledItem(items, 0)
                      : getPreviousItem(groupContext, currentScope, items);
                  if (targetScope) {
                    focusItem(
                      focusableItemQuery,
                      targetScope,
                      event,
                      preventScroll
                    );
                    return;
                  }
                }
                break;
              case "ArrowDown":
                if (isVertical) {
                  const items =
                    groupScope.getChildContextValues(FocusItemContext);
                  if (
                    handleNavigation(
                      "NEXT_ITEM",
                      groupContext,
                      event,
                      items,
                      currentScope,
                      focusableItemQuery
                    )
                  )
                    return;
                  const targetScope =
                    event.metaKey || event.ctrlKey
                      ? getScopeAtIndex(items, items.length - 1)
                      : getNextItem(groupContext, currentScope, items);
                  if (targetScope) {
                    focusItem(
                      focusableItemQuery,
                      targetScope,
                      event,
                      preventScroll
                    );
                    return;
                  }
                }
                break;
              case "ArrowLeft":
                if (isHorizontal) {
                  const items =
                    groupScope.getChildContextValues(FocusItemContext);
                  if (
                    handleNavigation(
                      "PREV_ITEM",
                      groupContext,
                      event,
                      items,
                      currentScope,
                      focusableItemQuery
                    )
                  )
                    return;
                  const targetScope =
                    event.metaKey || event.ctrlKey
                      ? getNextEnabledItem(items, 0)
                      : getPreviousItem(groupContext, currentScope, items);
                  if (targetScope) {
                    focusItem(
                      focusableItemQuery,
                      targetScope,
                      event,
                      preventScroll
                    );
                    return;
                  }
                }
                break;
              case "ArrowRight":
                if (isHorizontal) {
                  const items =
                    groupScope.getChildContextValues(FocusItemContext);
                  if (
                    handleNavigation(
                      "NEXT_ITEM",
                      groupContext,
                      event,
                      items,
                      currentScope,
                      focusableItemQuery
                    )
                  )
                    return;
                  const targetScope =
                    event.metaKey || event.ctrlKey
                      ? getScopeAtIndex(items, items.length - 1)
                      : getNextItem(groupContext, currentScope, items);
                  if (targetScope) {
                    focusItem(
                      focusableItemQuery,
                      targetScope,
                      event,
                      preventScroll
                    );
                  }
                }
                break;
              default:
                if (isSingleItem(key) && groupContext.onNavigate) {
                  const items =
                    groupScope.getChildContextValues(FocusItemContext);
                  handleNavigation(
                    "PRINT_CHAR",
                    groupContext,
                    event,
                    items,
                    currentScope,
                    focusableItemQuery
                  );
                }
            }
          }
        },
      }),
      [groupContext]
    );

    useKeyboard(itemRef, keyboardProps);

    const focusWithinProps = useMemo(
      () => ({
        onFocusWithin: (event) => {
          if (focusableItemQuery !== null) {
            const targetNode =
              itemRef.current?.DO_NOT_USE_queryFirstNode(focusableItemQuery);
            const isTargetFocused = event.target === targetNode;
            if (isTargetFocused && targetNode && !canElementTab(targetNode)) {
              const groupScope = groupContext?.scopeRef.current;
              if (groupScope) {
                initializeFocusGroup(groupScope, focusableItemQuery);
              }
            }
          }
        },
      }),
      [groupContext?.scopeRef]
    );

    const itemScope = useFocusWithin(itemRef, focusWithinProps);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const itemValue = { scopeRef: itemRef, disabled, tag };

    return (
      <FocusItemContext.Provider value={itemValue}>
        <Scope ref={itemScope}>{children}</Scope>
      </FocusItemContext.Provider>
    );
  }
  FocusItem.displayName = `${FocusItem.name}`;

  return [FocusGroup, FocusItem];
}
