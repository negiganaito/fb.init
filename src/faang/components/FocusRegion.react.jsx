/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable max-depth */

import React, {
  unstable_Scope as Scope,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import ActiveFocusRegionUtilsContext from "../../context/ActiveFocusRegionUtilsContext";
import useUnsafeRef_DEPRECATED from "../../hooks/useUnsafeRef_DEPRECATED";

import {
  focusElement,
  focusFirst,
  focusNextContained,
  focusPreviousContained,
  getAllNodesFromOneOrManyQueries,
  getFirstNodeFromOneOrManyQueries,
} from "./FocusManager";
import { RecoverFocusStrategy } from "./FocusRegionType";
import ReactEventHookPropagation from "./ReactEventHookPropagation";
import ReactFocusEvent from "./ReactFocusEvent.react";
import { useKeyboard } from "./ReactKeyboardEvent.react";
import { setElementCanTab } from "./setElementCanTab";

function focusElementWithDelay(element, preventScroll, focusWithoutUserIntent) {
  const previousActiveElement = document.activeElement;
  window.requestAnimationFrame(() => {
    if (document.activeElement === previousActiveElement) {
      focusElement(element, {
        preventScroll,
        focusWithoutUserIntent,
      });
    }
  });
}

function isElementHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}

const isValidLastFocused = (focusRegionItem) =>
  focusRegionItem.lastFocused !== null &&
  focusRegionItem.lastFocused instanceof Node &&
  focusRegionItem.lastFocused.isConnected;

const activeFocusRegions = new Map();

function FocusRegion({
  autoRestoreFocus,
  autoFocusQuery,
  children,
  containFocusQuery,
  forwardRef,
  id,
  onEscapeFocusRegion,
  recoverFocusStrategy = RecoverFocusStrategy.Nearest,
  recoverFocusQuery,
  stopOnFocusWithinPropagation = true,
}) {
  const activeFocusRegionUtils = useContext(ActiveFocusRegionUtilsContext);
  const scopeRef = useRef(null);
  const recoveryRef = useRef(null);
  const idRef = useRef(null);

  const initialActiveElement =
    activeFocusRegionUtils === null &&
    (autoRestoreFocus === true || onEscapeFocusRegion !== null)
      ? document.activeElement
      : null;
  const lastActiveElementRef = useUnsafeRef_DEPRECATED(initialActiveElement);
  const lastActiveElement =
    lastActiveElementRef.current ?? initialActiveElement;

  const focusRegionItem = useMemo(
    () => ({
      lastFocused: null,
      scope: null,
      restorationFocusRegionItem: null,
      triggeredFocusRegionItems: new Set(),
    }),
    []
  );

  const updateActiveFocusRegion = useCallback(() => {
    if (activeFocusRegionUtils !== null) {
      const activeFocusRegion = activeFocusRegionUtils.getActiveFocusRegion();
      if (activeFocusRegion !== focusRegionItem) {
        if (focusRegionItem.restorationFocusRegionItem !== activeFocusRegion) {
          if (
            activeFocusRegion?.lastFocused !== null &&
            !scopeRef.current?.containsNode(activeFocusRegion.lastFocused)
          ) {
            activeFocusRegion !== null &&
              activeFocusRegion.triggeredFocusRegionItems.add(focusRegionItem);
            focusRegionItem.restorationFocusRegionItem = activeFocusRegion;
          } else if (focusRegionItem.restorationFocusRegionItem === null) {
            const restorationItem =
              activeFocusRegion?.restorationFocusRegionItem;

            focusRegionItem.restorationFocusRegionItem = restorationItem;
            focusRegionItem.triggeredFocusRegionItems.delete(activeFocusRegion);
            focusRegionItem.triggeredFocusRegionItems.add(focusRegionItem);
            activeFocusRegionUtils.setActiveFocusRegion(focusRegionItem);
            return;
          }
        }

        if (
          activeFocusRegion === null ||
          (activeFocusRegion !== null &&
            focusRegionItem !== null &&
            activeFocusRegion.lastFocused !== focusRegionItem.lastFocused)
        ) {
          activeFocusRegionUtils.setActiveFocusRegion(focusRegionItem);
        }
      }
    }
  }, [activeFocusRegionUtils, focusRegionItem]);

  const handleScopeRef = useCallback(
    (ref) => {
      scopeRef.current = ref;
      focusRegionItem.scope = ref;

      const currentId = idRef.current;
      if (forwardRef) {
        forwardRef.current = ref;
      }
      if (
        currentId !== null &&
        currentId !== id &&
        activeFocusRegions.get(currentId) === null
      ) {
        activeFocusRegions.delete(currentId);
      }
      if (id !== null) {
        if (ref !== null) {
          idRef.current = id;
          activeFocusRegions.set(id, ref);
        } else if (activeFocusRegions.get(id) === null) {
          activeFocusRegions.delete(id);
        }
      }
    },
    [forwardRef, id, focusRegionItem]
  );

  const focusWithinHandlers = ReactFocusEvent.useFocusWithin(
    handleScopeRef,
    useMemo(() => {
      return {
        onBeforeBlurWithin: function (event) {
          const scope = scopeRef.current;
          if (scope !== null && recoverFocusQuery !== void 0) {
            event.stopPropagation();
            if (recoverFocusQuery === null) {
              return;
            }
            const target = event.target;
            const recoveryNodes = getAllNodesFromOneOrManyQueries(
              recoverFocusQuery,
              scope
            );

            if (recoveryNodes === null) {
              return;
            }

            const recoveryIndex = recoveryNodes.indexOf(target);
            const tabIndexState = target._tabIndexState;
            recoveryRef.current = {
              detachedCanTab: tabIndexState !== null && tabIndexState.canTab,
              recoveryIndex,
              recovery: recoveryNodes,
            };
          }
        },
        // eslint-disable-next-line complexity
        onAfterBlurWithin: function () {
          const currentScope = scopeRef.current;
          const recoveryData = recoveryRef.current;
          const gkx_4050 = true;
          if (gkx_4050 && !isValidLastFocused(focusRegionItem)) {
            focusRegionItem.lastFocused = null;
          }
          recoveryRef.current = null;
          const activeElement = document.activeElement;

          if (
            currentScope !== null &&
            recoverFocusQuery !== null &&
            recoveryData !== null &&
            (activeElement === null ||
              activeElement === document.body ||
              !currentScope.containsNode(activeElement))
          ) {
            const preventScroll = true;
            const focusWithoutUserIntent = true;
            const { recovery, recoveryIndex } = recoveryData;
            const currentNodes = getAllNodesFromOneOrManyQueries(
              recoverFocusQuery,
              currentScope
            );
            if (currentNodes !== null && recovery !== null) {
              const currentNodeSet = new Set(currentNodes);
              const recoveryNodeSet = new Set(recovery);
              for (let i = recoveryIndex - 1; i >= 0; i--) {
                const recoverNode = recovery[i];
                if (currentNodeSet.has(recoverNode)) {
                  const nextIndex = currentNodes.indexOf(recoverNode) + 1;

                  if (nextIndex < currentNodes.length) {
                    const nextNode = currentNodes[nextIndex];

                    // eslint-disable-next-line max-depth
                    if (!recoveryNodeSet.has(nextNode)) {
                      recoveryData.detachedCanTab &&
                        setElementCanTab(nextNode, true);
                      focusElementWithDelay(
                        nextNode,
                        preventScroll,
                        focusWithoutUserIntent
                      );
                      return;
                    }
                  }

                  if (recovery.detachedCanTab) {
                    setElementCanTab(recoverNode, true);
                  }
                  focusElementWithDelay(
                    recoverNode,
                    preventScroll,
                    focusWithoutUserIntent
                  );
                  return;
                }
              }
              if (recoverFocusStrategy === RecoverFocusStrategy.Nearest) {
                for (let i = recoveryIndex + 1; i < recovery.length; i++) {
                  const recoverNode = recovery[i];
                  if (currentNodeSet.has(recoverNode)) {
                    const prevIndex = currentNodes.indexOf(recoverNode) - 1;
                    if (prevIndex >= 0) {
                      const prevNode = currentNodes[prevIndex];

                      if (recovery.detachedCanTab) {
                        setElementCanTab(prevNode, true);
                      }
                      focusElementWithDelay(
                        prevNode,
                        preventScroll,
                        focusWithoutUserIntent
                      );
                      return;
                    }
                  }
                }
              }
              const firstNode = getFirstNodeFromOneOrManyQueries(
                recoverFocusQuery,
                currentScope
              );
              if (firstNode) {
                recoveryData.detachedCanTab &&
                  setElementCanTab(firstNode, true);
                focusElementWithDelay(
                  firstNode,
                  preventScroll,
                  focusWithoutUserIntent
                );
              }
            }
          }
        },
        onFocusWithin: function (event) {
          stopOnFocusWithinPropagation &&
            ReactEventHookPropagation.stopEventHookPropagation(
              event,
              "useFocusWithin"
            );
          focusRegionItem.lastFocused = event.target;
          updateActiveFocusRegion();
        },
      };
    }),
    [
      recoverFocusQuery,
      recoverFocusStrategy,
      stopOnFocusWithinPropagation,
      focusRegionItem,
      updateActiveFocusRegion,
    ]
  );

  const autoFocus = useCallback(() => {
    const scope = scopeRef.current;
    const activeElement = document.activeElement;
    if (
      autoFocusQuery !== null &&
      scope !== null &&
      (!activeElement || !scope.containsNode(activeElement))
    ) {
      const lastFocused = focusRegionItem.lastFocused;
      if (
        lastFocused !== null &&
        scope.containsNode(lastFocused) &&
        !isElementHidden(lastFocused)
      ) {
        focusElement(lastFocused, {
          focusWithAutoFocus: true,
          focusWithoutUserIntent: true,
          preventScroll: true,
        });
      } else {
        focusFirst(autoFocusQuery, scope, {
          focusWithAutoFocus: true,
          focusWithoutUserIntent: true,
          preventScroll: true,
        });
      }
    }
  }, [autoFocusQuery, focusRegionItem]);

  useLayoutEffect(autoFocus, [autoFocus]);
  useEffect(autoFocus, [autoFocus]);

  const restoreFocus = useCallback(
    (item, immediate = false) => {
      const currentScope = scopeRef.current;
      const currentActiveElement = document.activeElement;
      const lastActiveElement = lastActiveElementRef.current;
      lastActiveElementRef.current = null;

      const triggeredItems = item?.triggeredFocusRegionItems;
      const restorationItem = item?.restorationFocusRegionItem;

      if (triggeredItems?.size) {
        triggeredItems?.forEach((item) => {
          item.restorationFocusRegionItem = restorationItem;
        });
      }

      if (item !== null && restorationItem !== null) {
        restorationItem.triggeredFocusRegionItems.delete(item);
        if (triggeredItems?.size) {
          triggeredItems.forEach((triggeredItem) =>
            restorationItem.triggeredFocusRegionItems.add(triggeredItem)
          );
        }
      }

      focusRegionItem.lastFocused = null;

      const currentActiveFocusRegion =
        activeFocusRegionUtils?.getActiveFocusRegion();
      const lastFocused =
        currentActiveFocusRegion !== null
          ? currentActiveFocusRegion.restorationFocusRegionItem
          : { lastFocused: lastActiveElement };

      if (currentActiveFocusRegion === item) {
        activeFocusRegionUtils?.setActiveFocusRegion(restorationItem);
      }

      const isFocusWithinScope =
        currentScope !== null &&
        currentActiveElement !== null &&
        currentScope.containsNode(currentActiveElement);

      if (
        (autoRestoreFocus === true || onEscapeFocusRegion !== null) &&
        isFocusWithinScope
      ) {
        const performFocusRestore = (isImmediate = false) => {
          if (lastFocused?.lastFocused !== null) {
            const preventScroll = true;
            const focusWithoutUserIntent = true;
            const currentActiveElement = document.activeElement;
            if (
              isImmediate ||
              currentActiveElement === null ||
              currentActiveElement === document.body
            ) {
              focusElement(lastFocused.lastFocused, {
                preventScroll,
                focusWithoutUserIntent,
              });
            }
          }
        };

        if (immediate) {
          performFocusRestore(immediate);
        } else {
          window.requestAnimationFrame(() => {
            performFocusRestore();
          });
        }
      }
    },
    [activeFocusRegionUtils, autoRestoreFocus, onEscapeFocusRegion]
  );

  const handleEscapeFocusRegion = useCallback(() => {
    restoreFocus(lastActiveElementRef, true);
    onEscapeFocusRegion && onEscapeFocusRegion();
  }, [restoreFocus, onEscapeFocusRegion, lastActiveElementRef]);

  const handleKeyDown = useCallback(
    (event) => {
      if (
        containFocusQuery === null ||
        event.key !== "Tab" ||
        event.isDefaultPrevented()
      ) {
        return;
      }
      const scope = scopeRef.current;
      if (scope !== null) {
        if (event.shiftKey) {
          focusPreviousContained(
            containFocusQuery,
            scope,
            event,
            true,
            onEscapeFocusRegion !== null ? handleEscapeFocusRegion : undefined
          );
        } else {
          focusNextContained(
            containFocusQuery,
            scope,
            event,
            true,
            onEscapeFocusRegion !== null ? handleEscapeFocusRegion : undefined
          );
        }
      }
    },
    [containFocusQuery, onEscapeFocusRegion, handleEscapeFocusRegion]
  );

  useKeyboard(scopeRef, () => ({
    onKeyDown: handleKeyDown,
  }));

  useLayoutEffect(() => {
    lastActiveElementRef.current = lastActiveElement;
    const currentFocusRegion = focusRegionItem;

    return restoreFocus(currentFocusRegion);
  }, [
    activeFocusRegionUtils,
    autoRestoreFocus,
    restoreFocus,
    focusRegionItem,
    initialActiveElement,
  ]);

  return (
    <Scope ref={focusWithinHandlers} id={id}>
      {children}
    </Scope>
  );
}

function focusRegionById(id, query, preventScroll) {
  const focusRegion = activeFocusRegions.get(id);
  if (focusRegion) {
    const element = focusRegion.DO_NOT_USE_queryFirstNode(query);
    if (element !== null) {
      focusElement(element, { preventScroll: preventScroll });
      return element;
    }
  }
  return null;
}

export { FocusRegion, focusRegionById };
