/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import BaseButtonPopoverContext from "../../context/BaseButtonPopoverContext";
// import { getCurrentQueueTime } from "CometEventTimings";
// import CometHeroInteractionContextPassthrough from "CometHeroInteractionContextPassthrough.react";
// import CometHeroInteractionWithDiv from "CometHeroInteractionWithDiv.react";
// import { addMutationRootForTraceId } from "CometInteractionVC";
import BaseScrollableAreaContext from "../../context/BaseScrollableAreaContext";
import gkx from "../../helpers/gkx";
import useCometPrerenderer from "../../hooks/useCometPrerenderer";
import useMatchViewport from "../../hooks/useMatchViewport";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
// import useMergeRefs from "useMergeRefs";
import useVisibilityObserver from "../../hooks/useVisibilityObserver";

import BaseContextualLayer from "./BaseContextualLayer";
import BaseContextualLayerDefaultContainer from "./BaseContextualLayerDefaultContainer";
import BaseMenuContext from "./BaseMenuContext";
import BasePopoverLayerVisibility from "./BasePopoverLayerVisibility";
import BasePopoverReflowSheet from "./BasePopoverReflowSheet";
import CometErrorBoundary from "./CometErrorBoundary";
// import { genHeroInteractionUUIDAndMarkStart } from "CometHeroLogging";
import CometHideLayerOnEscape from "./CometHideLayerOnEscape";
import CometPlaceholder from "./CometPlaceholder.react";
import CometPrerenderer from "./CometPrerenderer";

const shouldUseReflowSheet = gkx("1984");
// const shouldCancelTraceOnClose = gkx("22878");

const DefaultPopoverRenderer = ({ content, fallback }) => (
  <CometPlaceholder fallback={fallback ?? null}>{content}</CometPlaceholder>
);

const RepositionWrapper = ({ contextualLayerRef }) => {
  useLayoutEffect(() => {
    const layer = contextualLayerRef.current;
    layer && layer.reposition({ autoflip: true });
  }, [contextualLayerRef]);
  return null;
};

const BasePopoverTrigger = ({
  allowNativePointerEventsOnPreviousLayer,
  children,
  doNotCloseOnOutsideClick = false,
  fallback,
  imperativeRef,
  // interactionTracker,
  onHighIntentPreload,
  onLayerDetached,
  onVisibilityChange,
  popover,
  reflowToPosition = false,
  popoverRenderer = DefaultPopoverRenderer,
  popoverPreloadResource,
  popoverProps,
  popoverType = "dialog",
  preloadTrigger,
  // tracePolicy,
  visibleOnLoad = false,
  triggerOutsideClickOnDrag,
  isAnimationEnabled,
  ...rest
}) => {
  const isNarrowScreen = useMatchViewport("max", "width", 600);
  const shouldUseReflow =
    (shouldUseReflowSheet === true && isNarrowScreen) || reflowToPosition;
  const hasShownOnLoad = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [interactionUUID, setInteractionUUID] = useState(null);
  const contextRef = useRef(null);
  // const interactionRef = useRef(null);

  const handleVisibilityChange = useCallback(
    (visible) => {
      setIsVisible(visible);
      onVisibilityChange && onVisibilityChange(visible);
    },
    [onVisibilityChange]
  );

  const hidePopover = useCallback(() => {
    handleVisibilityChange(false);
    // setInteractionUUID(null);
    // interactionRef.current = null;
  }, [handleVisibilityChange]);

  const showPopover = useCallback(
    (event) => {
      if (!isVisible) {
        handleVisibilityChange(true);

        // if (interactionTracker === null) {
        //   handleVisibilityChange(true);
        // }
        //  else {
        //   const [queueTime, initialTime] = getCurrentQueueTime(
        //     event?.timeStamp
        //   );
        //   interactionTracker(
        //     (interaction) => {
        //       interactionRef.current = interaction;
        //       handleVisibilityChange(true);
        //       setInteractionUUID(
        //         genHeroInteractionUUIDAndMarkStart(interaction.getTraceId())
        //       );
        //     },
        //     queueTime,
        //     initialTime
        //   );
        // }
      }
    },
    [
      isVisible,
      //  interactionTracker,
      handleVisibilityChange,
    ]
  );

  useImperativeHandle(
    imperativeRef,
    () => ({
      hide: hidePopover,
      show: showPopover,
    }),
    [hidePopover, showPopover]
  );

  // const handleMutationRoot = useCallback(
  //   (root) => {
  //     root !== null &&
  //       interactionUUID !== null &&
  //       addMutationRootForTraceId(interactionUUID, root);
  //   },
  //   [interactionUUID]
  // );

  const layerRef = useRef(null);
  const [
    prerenderingProps,
    isPrerenderingComplete,
    isPrerenderingActive,
    isHighIntentPreloading,
    isPreloadingError,
  ] = useCometPrerenderer(
    preloadTrigger,
    isVisible,
    popoverPreloadResource,
    onHighIntentPreload
  );

  useLayoutEffect(() => {
    if (visibleOnLoad === true && hasShownOnLoad.current === false) {
      hasShownOnLoad.current = true;
      showPopover();
    }
  }, [showPopover, visibleOnLoad]);

  const scrollableAreas = useContext(BaseScrollableAreaContext);
  const visibilityObserver = useVisibilityObserver({
    onHidden: useCallback(
      ({ hiddenReason }) => {
        if (hiddenReason === "COMPONENT_UNMOUNTED") return;
        const lastScrollableArea = scrollableAreas[scrollableAreas.length - 1];
        lastScrollableArea !== null && hidePopover();
      },
      [hidePopover, scrollableAreas]
    ),
  });

  const ariaProps = useMemo(() => {
    switch (popoverType) {
      case "menu":
        return { expanded: isVisible, haspopup: "menu" };
      case "dialog":
      default:
        return null;
    }
  }, [isVisible, popoverType]);

  const handleContextRef = useCallback(
    (node) => {
      contextRef.current = node !== null ? node : null;
      visibilityObserver(node);
    },
    [visibilityObserver]
  );

  // const cancelInteractionTrace = () => {
  //   const interaction = interactionRef.current;
  //   const trace = interaction?.getTrace();
  //   if (interaction === null || trace === null) return;
  //   const traceStatus = trace.traceStatus;
  //   if (traceStatus !== null && traceStatus !== "START") return;
  //   const shouldForceComplete = true;
  //   interaction.cancelTrace("close_popover", shouldForceComplete);
  // };

  const handleOutsideClick = useCallback(() => {
    if (!doNotCloseOnOutsideClick) {
      // shouldCancelTraceOnClose && cancelInteractionTrace();
      hidePopover();
    }
  }, [doNotCloseOnOutsideClick, hidePopover]);

  const outsideClickRef = useOnOutsideClick(
    isVisible ? handleOutsideClick : null,
    useMemo(
      () => ({
        isTargetEligible: (target) => {
          const context = contextRef.current;
          return context !== null ? !context.contains(target) : true;
        },
        triggerOutsideClickOnDrag,
      }),
      [triggerOutsideClickOnDrag]
    )
  );

  const handleToggle = useCallback(
    (event) => {
      isVisible ? hidePopover() : showPopover(event);
    },
    [isVisible, hidePopover, showPopover]
  );

  // const mergedRef = useMergeRefs(outsideClickRef, handleMutationRoot);
  const mergedRef = outsideClickRef;

  const menuContextValue = useMemo(
    () => ({ onClose: hidePopover }),
    [hidePopover]
  );

  const isMenuType = popoverType === "menu";

  const renderPopover = (prerenderProps) => (
    <BaseContextualLayer
      {...rest}
      {...prerenderProps}
      containFocus={true}
      contextRef={contextRef}
      customContainer={BaseContextualLayerDefaultContainer}
      imperativeRef={layerRef}
      key="popover"
      onEscapeFocusRegion={isMenuType ? hidePopover : undefined}
      ref={mergedRef}
      reflowToPosition={shouldUseReflow}
    >
      <CometHideLayerOnEscape onHide={hidePopover}>
        <BaseMenuContext.Provider value={menuContextValue}>
          {/* <CometHeroInteractionContextPassthrough clear={true}> */}
          {/* <CometHeroInteractionWithDiv
              interactionDesc={`popover_${
                popoverPreloadResource !== null
                  ? popoverPreloadResource.getModuleId()
                  : "Unknown"
              }`}
              // interactionUUID={interactionUUID}
            > */}
          <BasePopoverLayerVisibility onLayerDetached={onLayerDetached}>
            {popoverRenderer({
              content: (
                <>
                  <RepositionWrapper contextualLayerRef={layerRef} />
                  <popover {...popoverProps} onClose={hidePopover} />
                </>
              ),
              fallback: (
                <>
                  <RepositionWrapper contextualLayerRef={layerRef} />
                  {fallback}
                </>
              ),
            })}
          </BasePopoverLayerVisibility>
          {/* </CometHeroInteractionWithDiv> */}
          {/* </CometHeroInteractionContextPassthrough> */}
        </BaseMenuContext.Provider>
      </CometHideLayerOnEscape>
    </BaseContextualLayer>
  );

  return (
    <>
      <BaseButtonPopoverContext.Provider value={ariaProps}>
        {children(
          handleContextRef,
          handleToggle,
          hidePopover,
          isPrerenderingComplete,
          isPrerenderingActive,
          isHighIntentPreloading,
          isPreloadingError,
          isVisible
        )}
      </BaseButtonPopoverContext.Provider>
      <CometErrorBoundary>
        <CometPrerenderer prerenderingProps={prerenderingProps}>
          {(prerenderProps) =>
            shouldUseReflow ? (
              <BasePopoverReflowSheet>
                {renderPopover(prerenderProps)}
              </BasePopoverReflowSheet>
            ) : (
              renderPopover(prerenderProps)
            )
          }
        </CometPrerenderer>
      </CometErrorBoundary>
    </>
  );
};

BasePopoverTrigger.displayName = `BasePopoverTrigger [from ${__filename}]`;

export default BasePopoverTrigger;
