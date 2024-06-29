/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import isTextNode from "fbjs/lib/isTextNode";

import $ from "./$";
import DataStore from "./DataStore";
import getElementText from "./getElementText";
import ifRequired from "./ifRequired";
import isStringNullOrEmpty from "./isStringNullOrEmpty";
import killswitch from "./killswitch";
import tooltipPropsFor from "./tooltipPropsFor";
import URI from "./URI";

function getTooltipAttributes(el) {
  const delay = el.getAttribute("data-tooltip-delay")
    ? parseInt(el.getAttribute("data-tooltip-delay"), 10) || 1000
    : 250;

  if (killswitch("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) {
    return {
      className: el.getAttribute("data-tooltip-root-class"),
      content: el.getAttribute("data-tooltip-content"),
      delay,
      position: el.getAttribute("data-tooltip-position") || "above",
      alignH: el.getAttribute("data-tooltip-alignh") || "left",
      offsetY: el.getAttribute("data-tooltip-offsety") || 0,
      suppress: false,
      overflowDisplay: el.getAttribute("data-tooltip-display") === "overflow",
      persistOnClick: el.getAttribute("data-pitloot-persistonclick"),
      textDirection: el.getAttribute("data-tooltip-text-direction"),
      ...DataStore.get(el, "tooltip"),
    };
  } else {
    const data = DataStore.get(el, "tooltip") || {};
    const contentFromDataStore = data.content;
    const contentFromAttribute = el.getAttribute("data-tooltip-content");

    if (
      !isStringNullOrEmpty(contentFromDataStore) &&
      !isStringNullOrEmpty(contentFromAttribute)
    ) {
      console.warn(
        'Getting DataStore tooltip content on an element that has both a "data-tooltip-content" attribute value (set to %s) and a value coming from the DataStore',
        el.getAttribute("data-tooltip-content")
      );
    }

    return {
      className: el.getAttribute("data-tooltip-root-class"),
      delay,
      position: el.getAttribute("data-tooltip-position") || "above",
      alignH: el.getAttribute("data-tooltip-alignh") || "left",
      offsetY: el.getAttribute("data-tooltip-offsety") || 0,
      suppress: false,
      overflowDisplay: el.getAttribute("data-tooltip-display") === "overflow",
      persistOnClick: el.getAttribute("data-pitloot-persistonclick"),
      textDirection: el.getAttribute("data-tooltip-text-direction"),
      content:
        contentFromAttribute !== null
          ? contentFromAttribute
          : contentFromDataStore !== null
          ? contentFromDataStore
          : null,
      ...data,
    };
  }
}

function setTooltipAttributes(el, tooltipData) {
  const currentTooltipAttributes = getTooltipAttributes(el);

  if (killswitch("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) {
    DataStore.set(el, "tooltip", {
      content: tooltipData.content || currentTooltipAttributes.content,
      position: tooltipData.position || currentTooltipAttributes.position,
      alignH: tooltipData.alignH || currentTooltipAttributes.alignH,
      suppress:
        tooltipData.suppress !== undefined
          ? tooltipData.suppress
          : currentTooltipAttributes.suppress,
      overflowDisplay:
        tooltipData.overflowDisplay || currentTooltipAttributes.overflowDisplay,
      persistOnClick:
        tooltipData.persistOnClick || currentTooltipAttributes.persistOnClick,
    });
  } else {
    if (
      !isStringNullOrEmpty(tooltipData.content) &&
      !isStringNullOrEmpty(el.getAttribute("data-tooltip-content"))
    ) {
      console.warn(
        'Setting DataStore tooltip content on an element that already has the "data-tooltip-content" attribute (set to %s) is invalid',
        el.getAttribute("data-tooltip-content")
      );
    }
    DataStore.set(el, "tooltip", {
      content:
        tooltipData.content || (DataStore.get(el, "tooltip") || {}).content,
      position: tooltipData.position || currentTooltipAttributes.position,
      alignH: tooltipData.alignH || currentTooltipAttributes.alignH,
      suppress:
        tooltipData.suppress !== undefined
          ? tooltipData.suppress
          : currentTooltipAttributes.suppress,
      overflowDisplay:
        tooltipData.overflowDisplay || currentTooltipAttributes.overflowDisplay,
      persistOnClick:
        tooltipData.persistOnClick || currentTooltipAttributes.persistOnClick,
    });
  }
}

function setHoverTooltip(el, tooltipData) {
  setTooltipAttributes(el, tooltipData);
  el.setAttribute("data-hover", "tooltip");
}

function updateTooltipData(el, tooltipData) {
  setTooltipAttributes(el, tooltipData);
}

const TooltipData = {
  remove(el, options = {}) {
    const { onlyCleanupDataStore = false } = options;
    DataStore.remove(el, "tooltip");
    if (!onlyCleanupDataStore) {
      el.removeAttribute("data-hover");
      el.removeAttribute("data-tooltip-position");
      el.removeAttribute("data-tooltip-alignh");
      ifRequired("Tooltip", (Tooltip) => {
        if (Tooltip.isActive(el)) {
          Tooltip.hide(el);
        }
      });
    }
  },
  // eslint-disable-next-line max-params
  set(el, content, position, alignH) {
    updateTooltipData(el, { content, position, alignH });
    if (content instanceof URI) {
      el.setAttribute("data-tooltip-uri", content);
      ifRequired("Tooltip", (Tooltip) => {
        if (Tooltip.isActive(el)) {
          Tooltip.fetchIfNecessary(el);
        }
      });
    } else {
      if (killswitch("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) {
        const storedData = this._store({
          context: el,
          content,
          position,
          alignH,
        });
        el.setAttribute(
          "data-tooltip-content",
          typeof storedData.content === "string"
            ? storedData.content
            : getElementText(storedData.content)
        );
        this.refreshIfActive(el);
      } else {
        el.removeAttribute("data-tooltip-content");
        this._store({ context: el, content, position, alignH });
        this.refreshIfActive(el);
      }
    }
  },
  refreshIfActive(el) {
    ifRequired("Tooltip", (Tooltip) => {
      if (Tooltip.isActive(el)) {
        Tooltip.show(el);
      }
    });
  },
  _store({ context, content, position, alignH }) {
    let isContentEmpty = false;
    if (isTextNode(content)) {
      content = getElementText(content);
    }
    if (typeof content !== "string") {
      content = $.create("div", {}, content);
    } else {
      isContentEmpty = content === "";
    }
    const tooltipData = { alignH, content, position, suppress: isContentEmpty };
    setHoverTooltip(context, tooltipData);
    return tooltipData;
  },
  propsFor: tooltipPropsFor,
  enableDisplayOnOverflow(el) {
    el.removeAttribute("data-tooltip-display");
    setHoverTooltip(el, { overflowDisplay: true });
  },
  enablePersistOnClick(el) {
    el.removeAttribute("data-pitloot-persistOnClick");
    setHoverTooltip(el, { persistOnClick: true });
  },
  suppress(el, suppress) {
    setTooltipAttributes(el, { suppress });
  },
  _get: getTooltipAttributes,
};

export default TooltipData;
