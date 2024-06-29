/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const URI_REGEX =
  /^([^:\/?#]+:)?(\/\/([^\\\/?#@]*@)?(\[[A-Fa-f0-9:.]+\]|[^\/?#:]*)(:[0-9]*)?)?([^?#]*)(\?[^#]*)?(#.*)?/;

const parseURI = (uri) => {
  if (uri.trim() === "") return null;

  const match = uri.match(URI_REGEX);
  if (match === null) return null;

  const authority = match[2] ? match[2].substr(2) : null;
  const scheme = match[1] ? match[1].substr(0, match[1].length - 1) : null;

  return {
    uri: match[0] ? match[0] : null,
    scheme,
    authority,
    userinfo: match[3] ? match[3].substr(0, match[3].length - 1) : null,
    host: match[2] ? match[4] : null,
    port: match[5]
      ? match[5].substr(1)
        ? parseInt(match[5].substr(1), 10)
        : null
      : null,
    path: match[6] ? match[6] : null,
    query: match[7] ? match[7].substr(1) : null,
    fragment: match[8] ? match[8].substr(1) : null,
    isGenericURI: authority === null && !!scheme,
  };
};

export { parseURI };
