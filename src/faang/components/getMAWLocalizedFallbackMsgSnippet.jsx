/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FBLogger from "path-to-FBLogger";
import fbt from "path-to-fbt";

// eslint-disable-next-line complexity
function getMAWLocalizedFallbackMsgSnippet(type) {
  const gkx_2161 = true;
  switch (type) {
    case "userSendEncryptedMessage":
      return gkx_2161
        ? fbt._("__JHASH__fyDhKh6gGJz__JHASH__")
        : fbt._("__JHASH__4OgzNQUOXys__JHASH__");
    case "currentUserSendUnrenderableMessage":
      return fbt._("__JHASH__jc4jswoQ0uZ__JHASH__");
    case "participantSendUnrenderableMessage":
      return fbt._("__JHASH__rJAaVw-bGTJ__JHASH__");
    case "currentUserSendLocation":
      return fbt._("__JHASH__uqLzpXLWV1L__JHASH__");
    case "participantSendLocation":
      return fbt._("__JHASH__arQtWP-wajD__JHASH__");
    case "currentUserSendPollCreation":
      return fbt._("__JHASH__yYAB5ipDjSn__JHASH__");
    case "participantSendPollCreation":
      return fbt._("__JHASH__9_u_h4197t1__JHASH__");
    case "currentUserSendContactShare":
      return fbt._("__JHASH__Lucxb4lp5Bj__JHASH__");
    case "participantSendContactShare":
      return fbt._("__JHASH__l8E1YgNTl-P__JHASH__");
    case "currentUserSendStoryMention":
      return fbt._("__JHASH__eI2fGAdx8aY__JHASH__");
    case "participantSendStoryMention":
      return fbt._("__JHASH__cgqiUXxl6Ro__JHASH__");
    case "metaAISendMessage":
      return fbt._("__JHASH__rKW2TUo65Qw__JHASH__");
    case "currentUserSendBumpMessage":
      return fbt._("__JHASH__wGbdzlw9c2x__JHASH__");
    case "participantSendBumpMessage":
      return fbt._("__JHASH__ERQ_-V0YrzM__JHASH__");
    case "participantSendStickerReceiverFetchMessage":
      return fbt._("__JHASH__QW1C8s0lKTa__JHASH__");
    case "currentUserSendStickerReceiverFetchMessage":
      return fbt._("__JHASH__G-xm1MPFQ2m__JHASH__");
    case "userSendUnavailableMessage":
      return gkx_2161
        ? fbt._("__JHASH__kUWcn8afzj2__JHASH__")
        : fbt._("__JHASH__Q-6u14LxgkX__JHASH__");
    case "participantSendBumpMessageOriginalUnavailable":
      return fbt._("__JHASH__4OgzNQUOXys__JHASH__");
    default:
      FBLogger("messenger_e2ee_web").mustfix(
        "unexpected content fallback type %s",
        type
      );
      return "";
  }
}

export default getMAWLocalizedFallbackMsgSnippet;
