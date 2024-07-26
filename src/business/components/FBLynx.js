/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import Base64 from "../helpers/Base64";
import Event from "../helpers/Event";
import { LinkshimHandlerConfig } from "../helpers/LinkshimHandlerConfig";
import { byAttribute } from "../helpers/Parent";
import URI from "../helpers/URI";

import FBLynxBase from "./FBLynxBase";

let goURIOnWindow = URI.goURIOnWindow;

const FBLynx = {
  alreadySetup: false,
  setupDelegation: function (retry = false) {
    if (!document.documentElement) return;
    if (document.body === null) {
      if (retry) return;
      window.setTimeout(() => {
        this.setupDelegation(true);
      }, 100);
      return;
    }
    if (this.alreadySetup) return;
    this.alreadySetup = true;

    const clickHandler = (event) => {
      console.log("🚀 ~ clickHandler ~ event:", event);
      let [mode, element] = this.getMaybeLynxLink(event.target) || [];
      if (!element) return;

      let uri = new URI(element.href);
      let attributes;

      if (
        LinkshimHandlerConfig.ghl_param_link_shim &&
        mode !== "hover" &&
        element.dataset?.attributes
      ) {
        attributes = Base64.decodeObject(element.dataset.attributes);
        if (attributes?.open_link) {
          for (let key in attributes) {
            if (key !== "open_link") uri.addQueryData(key, attributes[key]);
          }
          let clonedElement = element.cloneNode(true);
          clonedElement.href = uri.toString();
          element = clonedElement;
        }
      }

      switch (mode) {
        case "async":
        case "asynclazy":
          FBLynxBase.logAsyncClick(element);
          break;
        case "origin":
          FBLynxBase.originReferrerPolicyClick(element);
          break;
        case "hover":
          this.hoverClick(element);
          break;
      }

      if (
        LinkshimHandlerConfig.ghl_param_link_shim &&
        mode !== "hover" &&
        attributes?.open_link
      ) {
        event.preventDefault();
        goURIOnWindow(uri, window.open("", element.target), true);
      }
    };

    Event.listen(document.body, "click", clickHandler);

    // if (LinkshimHandlerConfig.middle_click_requires_event) {
    //   Event.listen(document.body, "mouseup", (event) => {
    //     if (event.button === 1) clickHandler(event);
    //   });
    // }

    // Event.listen(document.body, "mouseover", (event) => {
    //   let [mode, element] = this.getMaybeLynxLink(event.target) || [];
    //   if (!element) return;

    //   if (["async", "asynclazy", "origin", "hover"].includes(mode)) {
    //     this.mouseover(element);
    //   }
    // });

    // Event.listen(document.body, "contextmenu", (event) => {
    //   let [mode, element] = this.getMaybeLynxLink(event.target) || [];
    //   if (!element) return;

    //   if (["async", "hover", "origin"].includes(mode)) {
    //     this.contextmenu(element);
    //   }
    // });
  },
  getMaybeLynxLink: function (target) {
    let element = byAttribute(target, "data-lynx-mode");
    if (element instanceof HTMLAnchorElement) {
      let mode = element.getAttribute("data-lynx-mode");
      if (["async", "asynclazy", "hover", "origin"].includes(mode)) {
        return [mode, element];
      }
    }
    return null;
  },
  hoverClick: function (element) {
    FBLynxBase.revertSwapIfLynxURIPresent(element);
  },
  mouseover: function (element) {
    FBLynxBase.swapLinkWithUnshimmedLink(element);
  },
  contextmenu: function (element) {
    FBLynxBase.revertSwapIfLynxURIPresent(element);
  },
};

export default FBLynx;
