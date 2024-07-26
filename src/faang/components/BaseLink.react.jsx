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
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";

// import RecoverableViolationWithComponentStack from "RecoverableViolationWithComponentStack.react";
import { getUri } from "../../business/helpers/ConstUriUtils";
import isTrustedDestination from "../../business/helpers/isTrustedDestination";
import justknobx from "../../business/helpers/justknobx";
import mergeRefs from "../../business/helpers/mergeRefs";
import BaseLinkDefaultTargetContext from "../../context/BaseLinkDefaultTargetContext";
import BaseLinkNestedPressableContext from "../../context/BaseLinkNestedPressableContext";
import CometProductAttributionContext from "../../context/CometProductAttributionContext";
import CometTrackingCodeContext from "../../context/CometTrackingCodeContext";
import CometTrackingNodesContext from "../../context/CometTrackingNodesContext";
import NavChainContentContext from "../../context/NavChainContentContext";
import useCometRouterDispatcher from "../../context/useCometRouterDispatcher";
import appendPersistQueryParamsToUrl from "../../helpers/appendPersistQueryParamsToUrl";
import { decorateHrefWithTrackingInfo } from "../../helpers/CometLinkTrackingUtils";
import isCometRouterUrl from "../../helpers/isCometRouterUrl";
import useApplyEndpointModifiersToHref from "../../hooks/useApplyEndpointModifiersToHref";
import useAttributionSourceForClick from "../../hooks/useAttributionSourceForClick";
// import useCometErrorProject from "../../hooks/useCometErrorProject";
import useCometRouterLinkEventHandlers from "../../hooks/useCometRouterLinkEventHandlers";
import useCometRouterLinkShimEventHandlers from "../../hooks/useCometRouterLinkShimEventHandlers";
// import useCurrentRoute from "../../hooks/useCurrentRoute";
import useFeedPressEventHandler from "../../hooks/useFeedPressEventHandler";
import useTransformRelativeUri from "../../hooks/useTransformRelativeUri";

import BaseNestedPressableHack_DO_NOT_USE from "./BaseNestedPressableHack_DO_NOT_USE.react";
import { getLinkShimInfo, useRelNoReferrer } from "./CometLinkShimUtils";
import Pressable from "./Pressable.react";
import PressableText from "./PressableText.react";
// eslint-disable-next-line complexity
const BaseLink = forwardRef((props, ref) => {
  const {
    "aria-activedescendant": ariaActiveDescendant,
    "aria-checked": ariaChecked,
    "aria-controls": ariaControls,
    "aria-current": ariaCurrent,
    "aria-describedby": ariaDescribedBy,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    "aria-hidden": ariaHidden,
    "aria-invalid": ariaInvalid,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-owns": ariaOwns,
    "aria-selected": ariaSelected,
    attributionsrc,
    children,
    className_DEPRECATED,
    disabled,
    disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
    disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
    display = "inline",
    download,
    fbclid,
    focusable,
    href,
    id,
    label,
    lynxMode,
    onBlur,
    onClick,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onNavigate,
    onPressChange,
    onPressEnd,
    onPressStart,
    passthroughProps,
    prefetchQueriesOnHover,
    preloadCodeOnMount,
    preserveQueryInShim,
    preventContextMenu,
    preventLocalNavigation,
    productAttribution,
    rel,
    replace,
    role,
    routeTarget,
    style,
    suppressFocusRing,
    suppressHydrationWarning,
    target,
    testid,
    testOnly_pressed = false,
    traceParams,
    xstyle,
  } = props;

  const dispatcher = useCometRouterDispatcher();
  const linkRef = useRef(null);

  const defaultTarget = useContext(BaseLinkDefaultTargetContext);
  const trackingNodes = useContext(CometTrackingNodesContext);
  const navChainContent = useContext(NavChainContentContext);
  const trackingCode = useContext(CometTrackingCodeContext);

  const {
    click_tracking_linkshim_cb: clickTrackingCb,
    encrypted_click_tracking: encryptedClickTracking,
    encrypted_tracking: encryptedTracking,
  } = trackingCode;

  const productAttributionContext = useContext(CometProductAttributionContext);

  const decorateHref = useCallback(
    (href) =>
      decorateHrefWithTrackingInfo(href, trackingNodes, encryptedClickTracking),
    [encryptedClickTracking, trackingNodes]
  );

  const applyModifiers = useApplyEndpointModifiersToHref();

  const isDownload = download === true || typeof download === "string";

  const linkInfo = useMemo(() => {
    let hrefWithPersist =
      href !== null && justknobx._("144")
        ? appendPersistQueryParamsToUrl(href)
        : href;

    let isExternal = false;
    if (hrefWithPersist !== null) {
      const uri = getUri(hrefWithPersist);
      if (uri !== null) {
        const protocol = uri.getProtocol();
        const domain = uri.getDomain();
        if (!protocol.length && !domain.length) {
          isExternal = true;
        } else {
          const qualifiedUri = protocol.length ? uri : uri.getQualifiedUri();
          isExternal =
            qualifiedUri !== null && isTrustedDestination(qualifiedUri);
        }
      } else {
        isExternal = true;
      }
    }

    if (
      isDownload ||
      disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV ===
        true
    ) {
      return {
        clickIDAppended: false,
        ghlEncrypted: false,
        href: hrefWithPersist,
        isExternalLink: isExternal,
        isRouterLink: false,
        shimmed: false,
        unshimmedHref: null,
      };
    }

    if (hrefWithPersist !== null && isCometRouterUrl(hrefWithPersist)) {
      const trackedHref = decorateHref(applyModifiers(hrefWithPersist));
      return {
        clickIDAppended: false,
        ghlEncrypted: false,
        href: trackedHref,
        isExternalLink: isExternal,
        isRouterLink: true,
        shimmed: false,
        unshimmedHref: null,
      };
    }

    const linkInfo = getLinkShimInfo(
      hrefWithPersist,
      clickTrackingCb,
      trackingNodes,
      fbclid,
      disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
      preserveQueryInShim
    );

    const trackedHref = linkInfo.shimmed
      ? linkInfo.href
      : decorateHref(linkInfo.href);

    return {
      clickIDAppended: linkInfo.clickIDAppended,
      ghlEncrypted: linkInfo.ghlEncrypted ?? false,
      href: trackedHref,
      isExternalLink: isExternal,
      isRouterLink: false,
      shimmed: linkInfo.shimmed,
      unshimmedHref: linkInfo.shimmed ? linkInfo.unshimmedHref : null,
    };
  }, [
    clickTrackingCb,
    disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
    disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
    download,
    fbclid,
    href,
    preserveQueryInShim,
    trackingNodes,
    decorateHref,
    applyModifiers,
  ]);

  const {
    clickIDAppended,
    ghlEncrypted,
    href: _href,
    isExternalLink,
    isRouterLink,
    shimmed,
    unshimmedHref,
  } = linkInfo;

  let openInNewWindow = false;
  let addNoReferrer = false;
  let _target;

  if (defaultTarget) {
    _target = target ?? defaultTarget;
  }
  if (
    shimmed ||
    ghlEncrypted ||
    (isExternalLink &&
      disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV !==
        true)
  ) {
    openInNewWindow = true;
    _target = target ?? "_blank";
    addNoReferrer = !!useRelNoReferrer && target === "_blank";
  }

  let _rel = Array.isArray(rel) ? rel.join(" ") : rel;

  if (openInNewWindow && (rel === null || rel.indexOf("nofollow") < 0)) {
    _rel = rel !== null ? `${rel} nofollow` : "nofollow";
  }

  if (addNoReferrer && (rel === null || rel.indexOf("noreferrer") < 0)) {
    _rel = rel !== null ? `${rel} noreferrer` : "noreferrer";
  }

  const clickRef = useAttributionSourceForClick(null, encryptedTracking[0]);
  const nestedContext = useContext(BaseLinkNestedPressableContext);
  const accessibilityRole = role === "presentation" ? "none" : role;
  const accessibilityLabel =
    label !== null && accessibilityRole !== "none" ? label : ariaLabel;

  const onPress = useFeedPressEventHandler(onClick, _href);
  const _onPressStart = useFeedPressEventHandler(onPressStart, _href);
  const _onContextMenu = useFeedPressEventHandler(onContextMenu, _href);

  const forwardedRef = useMemo(() => mergeRefs(ref, linkRef), [ref, linkRef]);

  const shimHandlers = useCometRouterLinkShimEventHandlers({
    href,
    lynxMode,
    onContextMenu: _onContextMenu,
    onHoverStart,
    onPress,
    shimmed,
    unshimmedHref,
  });

  const dispatcherExtras = useMemo(() => {
    return {
      linkRef,
      onNavigate,
      passthroughProps,
      productAttributionUpdateProps: {
        fromLink: productAttribution,
        linkContext: productAttributionContext,
        navChainContent,
        trackingNodes,
      },
      replace,
      target: routeTarget,
      traceParams,
    };
  }, [
    linkRef,
    productAttribution,
    productAttributionContext,
    trackingNodes,
    onNavigate,
    replace,
    routeTarget,
    traceParams,
    passthroughProps,
  ]);

  const linkHandlers = useCometRouterLinkEventHandlers({
    dispatcherExtras,
    href,
    isRouterLink,
    onHoverEnd,
    onHoverStart: shimHandlers.onHoverStart,
    onPress: shimHandlers.onPress,
    onPressStart: _onPressStart,
    prefetchQueriesOnHover,
    preloadCodeOnMount,
    preventLocalNavigation,
    rel: _rel,
    target: _target,
  });

  const origHref = shimmed && unshimmedHref ? unshimmedHref : href;
  const preventDefault =
    (isRouterLink && _target !== "blank" && dispatcher !== null) ||
    origHref === null ||
    origHref === "#" ||
    preventLocalNavigation === true;
  const transformedHref = useTransformRelativeUri(
    shimmed && unshimmedHref ? unshimmedHref : href
  );

  const pressableProps = {
    accessibilityLabel,
    accessibilityRelationship: {
      activedescendant: ariaActiveDescendant,
      controls: ariaControls,
      current: ariaCurrent,
      describedby: ariaDescribedBy,
      haspopup: ariaHasPopup,
      labelledby: ariaLabelledBy,
      owns: ariaOwns,
    },
    accessibilityState: {
      checked: ariaChecked,
      disabled: disabled,
      expanded: ariaExpanded,
      hidden: ariaHidden,
      invalid: ariaInvalid,
      selected: ariaSelected,
    },
    className_DEPRECATED,
    disabled,
    forwardedRef,
    link: {
      attributionsrc: clickRef ?? attributionsrc,
      download,
      rel: _rel,
      target: _target,
      url: transformedHref,
    },
    nativeID: id,
    onBlur,
    onContextMenu: shimHandlers.onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd: linkHandlers.onHoverEnd,
    onHoverStart: shimHandlers.onHoverStart,
    onPress: linkHandlers.onPress,
    onPressChange,
    onPressEnd,
    onPressStart: shimHandlers.onPressStart,
    preventContextMenu,
    preventDefault,
    style,
    suppressHydrationWarning:
      suppressHydrationWarning === true || clickIDAppended === true
        ? true
        : undefined,
    testID: testid,
    testOnly_state: {
      disabled: false,
      focused: false,
      focusVisible: false,
      hovered: false,
      pressed: testOnly_pressed,
    },
    xstyle,
  };

  let content;

  if (display === "block") {
    const roleValue =
      accessibilityRole === "button" ||
      accessibilityRole === "menuitem" ||
      accessibilityRole === "none" ||
      accessibilityRole === "switch" ||
      accessibilityRole === "checkbox" ||
      accessibilityRole === "article" ||
      accessibilityRole === "radio" ||
      accessibilityRole === "tab"
        ? accessibilityRole
        : "link";

    content = (
      <Pressable
        {...pressableProps}
        accessibilityRole={roleValue}
        suppressFocusRing={suppressFocusRing}
        tabbable={focusable}
      >
        <BaseLinkNestedPressableContext.Provider value>
          {children}
        </BaseLinkNestedPressableContext.Provider>
      </Pressable>
    );
  } else {
    const roleValue =
      accessibilityRole === "button" ||
      accessibilityRole === "menuitem" ||
      accessibilityRole === "menuitemradio" ||
      accessibilityRole === "menuitemcheckbox" ||
      accessibilityRole === "none" ||
      accessibilityRole === "tab"
        ? accessibilityRole
        : "link";

    content = (
      <PressableText
        {...pressableProps}
        accessibilityRole={roleValue}
        direction="none"
        focusable={focusable}
        suppressFocusRing={suppressFocusRing}
      >
        <BaseLinkNestedPressableContext.Provider value>
          {children}
        </BaseLinkNestedPressableContext.Provider>
      </PressableText>
    );
  }

  return (
    <>
      {/* {routeTarget === "content" && renderContentLinkGuard} */}

      {nestedContext ? (
        // eslint-disable-next-line react/jsx-pascal-case
        <BaseNestedPressableHack_DO_NOT_USE>
          {content}
        </BaseNestedPressableHack_DO_NOT_USE>
      ) : (
        { content }
      )}
    </>
  );
});

// function renderContentLinkGuard() {
//   const route = useCurrentRoute();
//   const project = useCometErrorProject();

//   if (route && !route.isCometRootContainer) {
//     return (
//       <RecoverableViolationWithComponentStack
//         projectName={project || "comet_infra"}
//         errorMessage="A link with target=content was rendered in a non-tab-container"
//       />
//     );
//   }
// }

export default BaseLink;
