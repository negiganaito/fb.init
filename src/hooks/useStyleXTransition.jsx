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
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import nullthrows from "fbjs/lib/nullthrows";

import differenceSets from "../business/helpers/differenceSets";
import mapMapToArray from "../business/helpers/mapMapToArray";
import mapSet from "../business/helpers/mapSet";
import sortBy from "../business/helpers/sortBy";

import useForceUpdate from "./useForceUpdate";
import useIsMountedRef from "./useIsMountedRef";
import useStable from "./useStable";

function useTimersMap() {
  const timers = useStable(() => new Map());
  useEffect(() => {
    return () =>
      Array.from(timers.values()).forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
  }, []);
  return timers;
}

function useUpdateIfMounted() {
  const forceUpdate = useForceUpdate();
  const isMountedRef = useIsMountedRef();
  return useStable(() => {
    return () => {
      if (isMountedRef.current) {
        forceUpdate();
      }
    };
  });
}

// eslint-disable-next-line max-params
export default function useStyleXTransition(
  items,
  keyExtractor,
  config,
  isFirstMount = true
) {
  const updateIfMounted = useUpdateIfMounted();
  const timers = useTimersMap();
  const elementsMap = useStable(() => new Map());
  const isFirstMountRef = useRef(true);

  const createElement = useCallback(
    (key, item, order) => ({
      item,
      key,
      order,
      xstyle: [config.base, isFirstMountRef.current && config.enter],
      style: {
        transitionDuration: `${config.durationIn ?? config.duration ?? 100}ms`,
      },
    }),
    [config.base, config.enter, config.durationIn, config.duration]
  );

  const newElementsMap = new Map(
    items.map((item, index) => [keyExtractor(item), { item, order: index }])
  );
  const enteringKeys = differenceSets(
    new Set(newElementsMap.keys()),
    new Set(elementsMap.keys())
  );
  const leavingKeys = differenceSets(
    new Set(elementsMap.keys()),
    new Set(newElementsMap.keys())
  );

  const orderAdjustmentMap = new Map();
  const leavingOrders = Array.from(
    mapSet(leavingKeys, (key) => nullthrows(elementsMap.get(key)).order)
  ).sort((a, b) => a - b);

  leavingOrders.forEach((order, index) => {
    order -= index;
    while (order < items.length) {
      const count = orderAdjustmentMap.get(order) ?? 0;
      orderAdjustmentMap.set(order, count + 1);
      order += 1;
    }
  });

  const transitions = sortBy(
    [
      ...mapMapToArray(elementsMap, (element) => {
        const newElement = newElementsMap.get(element.key);
        if (newElement) {
          return {
            ...element,
            item: newElement.item,
            order:
              newElement.order +
              (orderAdjustmentMap.get(newElement.order) ?? 0),
          };
        }
        return element;
      }),
      ...Array.from(
        mapSet(enteringKeys, (key) => {
          const newElement = nullthrows(newElementsMap.get(key));
          return createElement(key, newElement.item, newElement.order);
        })
      ),
    ],
    (element) => element.order
  );

  useLayoutEffect(() => {
    if (isFirstMount) return;
    items.forEach((item, index) => {
      const key = keyExtractor(item);
      let element = elementsMap.get(key) ?? createElement(key, item, index);

      if (enteringKeys.has(key)) {
        requestAnimationFrame(() => {
          element.xstyle = [config.base, config.enter];
          clearTimeout(timers.get(key));
          timers.set(
            key,
            // eslint-disable-next-line max-nested-callbacks
            setTimeout(() => {
              config.onEnterComplete && config.onEnterComplete(item);
            }, config.durationIn ?? config.duration ?? 100)
          );
          // eslint-disable-next-line max-nested-callbacks
          setImmediate(() => {
            element.xstyle = [config.base, config.enter];
            config.onEnter && config.onEnter(item);
            updateIfMounted();
          });
        });
      }

      element.item = item;
      element.order = index + (orderAdjustmentMap.get(index) ?? 0);
      elementsMap.set(key, element);
    });

    Array.from(leavingKeys.values()).forEach((key) => {
      const element = elementsMap.get(key);
      if (!element) return;

      const item = element.item;
      if (element.status !== "leaving") {
        element.status = "leaving";
        element.style = {
          transitionDuration: `${
            config.durationOut ?? config.duration ?? 100
          }ms`,
        };
        requestAnimationFrame(() => {
          element.xstyle = [config.base, config.leave];
          clearTimeout(timers.get(key));
          timers.set(
            key,
            // eslint-disable-next-line max-nested-callbacks
            setTimeout(() => {
              elementsMap.delete(key);
              config.onLeaveComplete && config.onLeaveComplete(item);
              updateIfMounted();
            }, config.durationOut ?? config.duration ?? 100)
          );
          // eslint-disable-next-line max-nested-callbacks
          setImmediate(() => {
            config.onLeave && config.onLeave(item);
            updateIfMounted();
          });
        });
      }
    });

    isFirstMountRef.current = false;
  });

  return transitions;
}
