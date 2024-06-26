/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useLayoutEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useStable } from "@fb-hook/use-stable";
import executionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { CometSuspenseHUD } from "./comet-suspense-hud";
import { CometSSRHydrationMarkerUtils } from "./cometssr-hydration-marker-utils";
import { HeroPlaceholder } from "./hero-placeholder";

function useLayoutEffectCallback(props) {
  const { cb } = props;

  const hasCallbackBeenCalled = useRef(false);
  useLayoutEffect(() => {
    if (!hasCallbackBeenCalled.current) {
      cb();
      hasCallbackBeenCalled.current = true;
    }
  });
  return null;
}

// eslint-disable-next-line no-unused-vars
const _1863055 = false;

export function useCometPlaceholderImpl(props) {
  const {
    children,
    fallback,
    name,
    unstable_avoidThisFallback,
    unstable_onSuspense,
  } = props;

  // let e = b.children,
  //   f = b.fallback,
  //   g = b.name,
  //   i = b.unstable_avoidThisFallback,
  //   l = b.unstable_onSuspense;

  const element = useStable(() => {
    return CometSuspenseHUD && executionEnvironment.canUseDOM
      ? window.document.createElement("div")
      : null;
  });

  const fallbackCounter = useRef(0);
  const currentContent = useRef(null);
  const isPlaceholderActive = useRef(false);

  let _children = children;
  let _fallback = fallback;

  // b = e;
  // e = f;

  // d('CometSSRHydrationMarkerUtils').addMarkersToChildren != null &&
  //   d('CometSSRHydrationMarkerUtils').addMarkersToFallback != null &&
  //   ((b = d('CometSSRHydrationMarkerUtils').addMarkersToChildren(b)),
  //   (e = d('CometSSRHydrationMarkerUtils').addMarkersToFallback(e)))

  if (
    CometSSRHydrationMarkerUtils.addMarkersToChildren &&
    CometSSRHydrationMarkerUtils.addMarkersToFallback
  ) {
    _children = CometSSRHydrationMarkerUtils.addMarkersToChildren(_children);
    _fallback = CometSSRHydrationMarkerUtils.addMarkersToFallback(_fallback);
  }

  const onSuspense = useCallback(
    (content) => {
      if (element) {
        element.textContent = content;
      }
      currentContent.current = content;
      unstable_onSuspense && unstable_onSuspense(content);
    },
    [element, unstable_onSuspense]
  );

  let CometSuspenseHUDComponent = null;

  if (element && CometSuspenseHUD) {
    CometSuspenseHUDComponent = jsx(CometSuspenseHUD, {
      desc: element,
    });
  }

  let fallbackCallback = useCallback(() => {
    fallbackCounter.current += 1;
    // _1863055 &&
    //   t.current &&
    //   r.current <= o &&
    //   n.onReady(function (a) {
    //     a.log(function () {
    //       return {
    //         event: 'unexpected_suspense',
    //         is_backup_placeholder: i === !0,
    //         placeholder_name: g,
    //         promise_name: s.current,
    //         suspense_count: String(r.current),
    //       }
    //     })
    //   })
  }, [name, unstable_avoidThisFallback]);
  const placeholderCallback = useCallback(() => {
    isPlaceholderActive.current = true;
  }, []);

  return jsxs(HeroPlaceholder, {
    children: [
      jsx(useLayoutEffectCallback, {
        cb: placeholderCallback,
      }),
      _children,
    ],
    fallback: jsxs(React.Fragment, {
      children: [
        _fallback,
        jsx(useLayoutEffectCallback, {
          cb: fallbackCallback,
        }),
        CometSuspenseHUDComponent,
      ],
    }),
    name,
    unstable_avoidThisFallback,
    unstable_onSuspense: onSuspense,
  });
}
