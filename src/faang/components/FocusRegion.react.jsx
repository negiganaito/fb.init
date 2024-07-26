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
import React, {
  unstable_Scope as Scope,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import useUnsafeRef_DEPRECATED from "../../hooks/useUnsafeRef_DEPRECATED";

import ActiveFocusRegionUtilsContext from "./ActiveFocusRegionUtilsContext";
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
  const triggerRef = useRef(null);
  const currentActiveFocusRegionRef = useRef(null);

  const activeFocusRegion =
    activeFocusRegionUtils === null &&
    (autoRestoreFocus === true || onEscapeFocusRegion !== null)
      ? document.activeElement
      : null;
  const activeFocusRegionRef = useUnsafeRef_DEPRECATED(activeFocusRegion);
  const activeFocusRegionData = useMemo(
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
      const currentActiveFocusRegion =
        activeFocusRegionUtils.getActiveFocusRegion();
      if (currentActiveFocusRegion !== activeFocusRegionData) {
        if (
          activeFocusRegionData.restorationFocusRegionItem !==
          currentActiveFocusRegion
        ) {
          let container;
          if (
            currentActiveFocusRegion?.lastFocused !== null &&
            !scopeRef.current?.containsNode(
              currentActiveFocusRegion.lastFocused
            )
          ) {
            currentActiveFocusRegion !== null &&
              currentActiveFocusRegion.triggeredFocusRegionItems.add(
                activeFocusRegionData
              );
            activeFocusRegionData.restorationFocusRegionItem =
              currentActiveFocusRegion;
          } else if (
            activeFocusRegionData.restorationFocusRegionItem === null
          ) {
            container = currentActiveFocusRegion?.restorationFocusRegionItem;
            activeFocusRegionData.restorationFocusRegionItem = container;
            currentActiveFocusRegion !== null &&
              container !== null &&
              container.triggeredFocusRegionItems.delete(
                currentActiveFocusRegion
              );
            container !== null &&
              container.triggeredFocusRegionItems.add(activeFocusRegionData);
            activeFocusRegionUtils.setActiveFocusRegion(activeFocusRegionData);
            return;
          }
        }

        if (
          currentActiveFocusRegion === null ||
          (currentActiveFocusRegion !== null &&
            activeFocusRegionData !== null &&
            currentActiveFocusRegion.lastFocused !==
              activeFocusRegionData.lastFocused)
        ) {
          activeFocusRegionUtils.setActiveFocusRegion(activeFocusRegionData);
        }
      }
    }
  }, [activeFocusRegionUtils, activeFocusRegionData]);

  const scopeRefCallback = useCallback(
    (ref) => {
      scopeRef.current = ref;
      activeFocusRegionData.scope = ref;

      const previousActiveFocusRegionId = currentActiveFocusRegionRef.current;
      if (forwardRef) {
        forwardRef.current = ref;
      }
      if (
        previousActiveFocusRegionId !== null &&
        previousActiveFocusRegionId !== id &&
        activeFocusRegions.get(previousActiveFocusRegionId) === null
      ) {
        activeFocusRegions.delete(previousActiveFocusRegionId);
      }
      if (id !== null) {
        if (ref !== null) {
          currentActiveFocusRegionRef.current = id;
          activeFocusRegions.set(id, ref);
        } else if (activeFocusRegions.get(id) === null) {
          activeFocusRegions.delete(id);
        }
      }
    },
    [forwardRef, id, activeFocusRegionData]
  );

  const focusWithinHandlers = ReactFocusEvent.useFocusWithin(
    scopeRefCallback,
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
            const queryScope = getAllNodesFromOneOrManyQueries(
              recoverFocusQuery,
              scope
            );

            if (queryScope === null) {
              return;
            }

            const recoveryIndex = queryScope.indexOf(target);
            const tabIndexState = target._tabIndexState;
            scopeRef.current = {
              detachedCanTab: tabIndexState !== null && tabIndexState.canTab,
              recoveryIndex,
              recovery: queryScope,
            };
          }
        },
        onAfterBlurWithin: function () {
          const currentScope = scopeRef.current;
          const recoveryData = triggerRef.current;
          triggerRef.current = null;
          const activeElement = document.activeElement;

          if (
            currentScope !== null &&
            autoFocusQuery !== null &&
            recoveryData !== null &&
            (activeElement === null ||
              activeElement === document.body ||
              !currentScope.containsNode(activeElement))
          ) {
            const preventScroll = true;
            const focusWithoutUserIntent = true;
            const { recovery, recoveryIndex } = recoveryData;
            const focusableNodes = getAllNodesFromOneOrManyQueries(
              recoverFocusQuery,
              currentScope
            );
            if (focusableNodes !== null && recovery !== null) {
              const focusableSet = new Set(focusableNodes);
              const recoverSet = new Set(recovery);
              for (let i = recoveryIndex - 1; i >= 0; i--) {
                const recoverNode = recovery[i];
                if (focusableSet.has(recoverNode)) {
                  const nextIndex = focusableNodes.indexOf(recoverNode) + 1;

                  if (nextIndex < focusableNodes.length) {
                    const nextNode = focusableNodes[nextIndex];

                    // eslint-disable-next-line max-depth
                    if (!recoverSet.has(nextNode)) {
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
                }
              }
              if (recoverFocusStrategy === RecoverFocusStrategy.Nearest) {
                for (let i = recoveryIndex + 1; i < recovery.length; i++) {
                  const recoverNode = recovery[i];
                  if (focusableSet.has(recoverNode)) {
                    const previousFocusNode =
                      focusableNodes[focusableNodes.indexOf(recoverNode) - 1];
                    recoveryData.detachedCanTab &&
                      setElementCanTab(previousFocusNode, true);
                    focusElementWithDelay(
                      previousFocusNode,
                      preventScroll,
                      focusWithoutUserIntent
                    );
                    return;
                  }
                }
              }
              const firstFocusNode = getFirstNodeFromOneOrManyQueries(
                recoverFocusQuery,
                currentScope
              );
              if (firstFocusNode) {
                recoveryData.detachedCanTab &&
                  setElementCanTab(firstFocusNode, true);
                focusElementWithDelay(
                  firstFocusNode,
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
          activeFocusRegionData.lastFocused = event.target;
          updateActiveFocusRegion();
        },
      };
    }),
    [
      recoverFocusQuery,
      recoverFocusStrategy,
      stopOnFocusWithinPropagation,
      activeFocusRegionData,
      updateActiveFocusRegion,
    ]
  );

  const autoRestoreFocusCallback = useCallback(() => {
    const scope = scopeRef.current;
    const activeElement = document.activeElement;
    if (
      autoFocusQuery !== null &&
      scope !== null &&
      (!activeElement || !scope.containsNode(activeElement))
    ) {
      const lastFocused = activeFocusRegionData.lastFocused;
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
  }, [autoFocusQuery, activeFocusRegionData]);

  useLayoutEffect(autoRestoreFocusCallback, [autoRestoreFocusCallback]);
  useEffect(autoRestoreFocusCallback, [autoRestoreFocusCallback]);

  const handleBlur = useCallback(
    (previousActiveFocusRegion, shouldPreventScroll = false) => {
      const currentScope = scopeRef.current;
      const currentActiveElement = document.activeElement;
      const previousActiveScope = activeFocusRegionRef.current;
      activeFocusRegionRef.current = null;

      const triggeredFocusRegionItems =
        previousActiveFocusRegion?.triggeredFocusRegionItems;
      const restorationFocusRegionItem =
        previousActiveFocusRegion?.restorationFocusRegionItem;

      triggeredFocusRegionItems?.forEach((item) => {
        item.restorationFocusRegionItem = restorationFocusRegionItem;
      });

      if (
        previousActiveFocusRegion !== null &&
        restorationFocusRegionItem !== null
      ) {
        restorationFocusRegionItem.triggeredFocusRegionItems.delete(
          previousActiveFocusRegion
        );
        triggeredFocusRegionItems?.forEach((item) => {
          restorationFocusRegionItem.triggeredFocusRegionItems.add(item);
        });
      }

      activeFocusRegionData.lastFocused = null;

      const currentActiveFocusRegion =
        activeFocusRegionUtils?.getActiveFocusRegion();
      const lastFocused =
        currentActiveFocusRegion !== null
          ? currentActiveFocusRegion.restorationFocusRegionItem
          : { lastFocused: previousActiveScope.current };

      if (currentActiveFocusRegion === previousActiveFocusRegion) {
        activeFocusRegionUtils?.setActiveFocusRegion(
          restorationFocusRegionItem
        );
      }

      const isFocusWithinScope =
        currentScope !== null &&
        currentActiveElement !== null &&
        currentScope.containsNode(currentActiveElement);

      if (
        (autoRestoreFocus === true || onEscapeFocusRegion !== null) &&
        isFocusWithinScope
      ) {
        const focusAfterBlur = (shouldPreventScroll = false) => {
          if (lastFocused?.lastFocused !== null) {
            const preventScroll = true;
            const focusWithoutUserIntent = true;
            const currentActiveElement = document.activeElement;
            if (
              shouldPreventScroll ||
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

        if (shouldPreventScroll) {
          focusAfterBlur(shouldPreventScroll);
        } else {
          window.requestAnimationFrame(() => {
            focusAfterBlur();
          });
        }
      }
    },
    [activeFocusRegionUtils, autoRestoreFocus, onEscapeFocusRegion]
  );

  const handleEscapeFocusRegion = useCallback(() => {
    handleBlur(activeFocusRegionRef, true);
    onEscapeFocusRegion && onEscapeFocusRegion();
  }, [handleBlur, onEscapeFocusRegion, activeFocusRegionRef]);

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
    activeFocusRegionRef.current = activeFocusRegionRef.current
      ? activeFocusRegionRef.current
      : activeFocusRegion;
    const currentFocusRegion = activeFocusRegionData;

    return handleBlur(currentFocusRegion);
  }, [
    activeFocusRegionUtils,
    autoRestoreFocus,
    handleBlur,
    activeFocusRegionData,
    activeFocusRegion,
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
