/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ClickIDURLBlocklistSVConfig } from "./ClickIDURLBlocklistSVConfig";
import URI from "./URI";

const protocols = ["http", "https"];

function isClickIDBlocklistSVUrlPath(uri) {
  if (!protocols.includes(uri.getProtocol())) {
    return false;
  }

  const domain = uri.getDomain();
  const path = uri.getPath();
  const fullPath = domain !== null ? domain + path : null;

  return ClickIDURLBlocklistSVConfig.block_list_url.some((blocklistUrl) => {
    let blocklistUri;
    if (blocklistUrl !== null && blocklistUrl.startsWith("http")) {
      blocklistUri = new URI(blocklistUrl);
    } else {
      blocklistUri = new URI("http://" + blocklistUrl);
    }

    const blocklistFullPath = blocklistUri.getDomain() + blocklistUri.getPath();
    if (fullPath !== null && fullPath === blocklistFullPath) {
      const blocklistQueryData = blocklistUri.getQueryData();
      const queryData = uri.getQueryData();
      const entries = Object.entries(blocklistQueryData);

      for (const [key, value] of entries) {
        if (queryData[key] === null || queryData[key] !== value) {
          return false;
        }
      }
      return true;
    }
    return false;
  });
}

export default isClickIDBlocklistSVUrlPath;
